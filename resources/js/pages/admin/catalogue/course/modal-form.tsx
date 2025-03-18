import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader } from '@/components/ui/loader';
import { SelectMultiple } from '@/components/ui/select-multiple';
import { SelectSingle } from '@/components/ui/select-single';
import { FormatterObject } from '@/types';
import { useForm } from '@inertiajs/react';
import { Pen, Plus, Save } from 'lucide-react';
import { FormEvent, useState } from 'react';

type ModalFormCourseProps = {
    name: string;
    alias: string;
    id: number | null;
    professor_id: number;
    levels: FormatterObject[];
    professors: FormatterObject[];
    levelIds: Array<number>;
};
type ModalFormProps = { name: string; alias: string; id: number | null; professor_id: number; levels: Array<number> };

export const ModalFormCourse = ({ name, alias, professor_id, id, levelIds, levels, professors }: ModalFormCourseProps) => {
    const [openModal, setOpenModal] = useState<boolean>(false);

    const { post, put, data, setData, errors, processing, clearErrors, reset } = useForm<ModalFormProps>({
        name,
        alias,
        id,
        professor_id,
        levels: levelIds,
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        id === null
            ? post(route('#course.store'), {
                  preserveState: true,
                  onSuccess: () => {
                      setOpenModal(false);
                  },
              })
            : put(route('#course.update', { id }), {
                  preserveState: true,
                  onSuccess: () => {
                      setOpenModal(false);
                  },
              });
    };

    const onOpenChangeModal = (stateModal: boolean) => {
        setOpenModal(stateModal);
        clearErrors();
        reset();
    };

    return (
        <>
            <Button onClick={() => setOpenModal(true)} size="sm" variant="outline">
                {id === null ? <Plus size={15} /> : <Pen size={15} />}
            </Button>
            <Dialog open={openModal} onOpenChange={onOpenChangeModal} defaultOpen={openModal}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>{id === null ? "Création d'un cours" : `Modification de l cours #${id}`}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={onSubmit} className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nom</Label>
                            <Input placeholder="Ps: Licence 1" id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                            <InputError message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="alias">Alias</Label>
                            <Input placeholder="Ps: L2" id="alias" value={data.alias} onChange={(e) => setData('alias', e.target.value)} />
                            <InputError message={errors.alias} />
                        </div>

                        <div className="grid gap-1">
                            <Label htmlFor="professor_id">Professeur</Label>
                            <SelectSingle
                                value={data.professor_id.toString()}
                                placeholder="Selectionner un professeur"
                                onChange={(optionId) => setData('professor_id', parseInt(optionId))}
                                options={professors.map((c) => {
                                    return {
                                        label: c.name,
                                        value: c.id,
                                    };
                                })}
                            />
                            <InputError message={errors.professor_id} />
                        </div>

                        <div className="grid gap-1">
                            <Label htmlFor="levels">Promotion</Label>
                            <SelectMultiple
                                values={data.levels.map((lId) => lId.toString())}
                                placeholder="Selectionner les promotions"
                                onChange={(levelValueIds) =>
                                    setData(
                                        'levels',
                                        levelValueIds.map((c) => parseInt(c)),
                                    )
                                }
                                options={levels.map((c) => {
                                    return {
                                        label: c.name,
                                        value: c.id,
                                    };
                                })}
                            />
                            <InputError message={errors.levels} />
                        </div>

                        <div>
                            <Button variant="outline" size="sm" type="submit">
                                {processing ? (
                                    <div className="flex gap-2">
                                        <Loader size={16} />
                                    </div>
                                ) : (
                                    <Save size={15} />
                                )}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};
