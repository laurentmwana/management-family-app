import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader } from '@/components/ui/loader';
import { SelectSingle } from '@/components/ui/select-single';
import { FormatterObject } from '@/types';
import { useForm } from '@inertiajs/react';
import { Pen, Plus, Save } from 'lucide-react';
import { FormEvent, useState } from 'react';

type ModalFormLevelProps = { name: string; alias: string; id: number | null; option_id: number; options: FormatterObject[] };
type ModalFormProps = { name: string; alias: string; id: number | null; option_id: number };

export const ModalFormLevel = ({ name, alias, option_id, id, options }: ModalFormLevelProps) => {
    const [openModal, setOpenModal] = useState<boolean>(false);

    const { post, put, data, setData, errors, processing, clearErrors, reset } = useForm<ModalFormProps>({ name, alias, id, option_id });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        id === null
            ? post(route('#level.store'), {
                  preserveState: true,
                  onSuccess: () => {
                      setOpenModal(false);
                  },
              })
            : put(route('#level.update', { id }), {
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
                        <DialogTitle>{id === null ? "Création d'une option" : `Modification de la option #${id}`}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={onSubmit} className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nom de l'option</Label>
                            <Input placeholder="Ps: Licence 1" id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                            <InputError message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="alias">Alias</Label>
                            <Input placeholder="Ps: L2" id="alias" value={data.alias} onChange={(e) => setData('alias', e.target.value)} />
                            <InputError message={errors.alias} />
                        </div>

                        <div className="grid gap-1">
                            <Label htmlFor="option_id">Option</Label>
                            <SelectSingle
                                value={data.option_id.toString()}
                                placeholder="Selectionner une option"
                                onChange={(optionId) => setData('option_id', parseInt(optionId))}
                                options={options.map((c) => {
                                    return {
                                        label: c.name,
                                        value: c.id,
                                    };
                                })}
                            />
                            <InputError message={errors.option_id} />
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
