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

type ModalFormPeopleProps = {
    full_name: string;
    gender: string;
    relation_family: string;
    id: number | null;
    family_id: number;
    birth: string;
    genders: FormatterObject[];
    relations: FormatterObject[];
    families: FormatterObject[];
};

type ModalFormProps = {
    full_name: string;
    gender: string;
    relation_family: string;
    image: File | null;
    birth: string;
    id: number | null;
    family_id: number;
    _method: 'POST' | 'PUT';
};

export const ModalFormPeople = ({ id, genders, relations, full_name, family_id, gender, relation_family, families, birth }: ModalFormPeopleProps) => {
    const [openModal, setOpenModal] = useState<boolean>(false);

    const { post, data, setData, errors, processing, clearErrors, reset } = useForm<ModalFormProps>({
        id,
        full_name,
        family_id,
        gender,
        relation_family,
        birth,
        image: null,
        _method: id !== null ? 'PUT' : 'POST',
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        id === null
            ? post(route('#people.store'), {
                  preserveState: true,
                  onSuccess: () => {
                      setOpenModal(false);
                  },

                  forceFormData: true,
              })
            : post(route('#people.update', { id }), {
                  preserveState: true,
                  onSuccess: () => {
                      setOpenModal(false);
                  },

                  forceFormData: true,
              });
    };

    const onOpenChangeModal = (stateModal: boolean) => {
        setOpenModal(stateModal);
        clearErrors();
        reset();
    };

    const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: File | null = e.target.files?.[0] ?? null;
        if (file) {
            setData('image', file);
        }
    };

    return (
        <>
            <Button onClick={() => setOpenModal(true)} size="sm" variant="outline">
                {id === null ? <Plus size={15} /> : <Pen size={15} />}
            </Button>
            <Dialog open={openModal} onOpenChange={onOpenChangeModal} defaultOpen={openModal}>
                <DialogContent className="h-max sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>
                            {id === null ? "Création d'un membre de la famille" : `Modification de la membre de la famille #${id}`}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={onSubmit} className="grid gap-4 py-4" encType="multipart/form-data">
                        <div className="grid gap-1">
                            <Label htmlFor="image">Image</Label>
                            <Input id="image" type="file" onChange={handleFilesSelected} />
                            <InputError message={errors.image} />
                        </div>

                        <div className="grid gap-1">
                            <Label htmlFor="full_name">Nom complet</Label>
                            <Input id="full_name" value={data.full_name} onChange={(e) => setData('full_name', e.target.value)} />
                            <InputError message={errors.full_name} />
                        </div>

                        <div className="grid gap-1">
                            <Label htmlFor="gender">Genre</Label>
                            <SelectSingle
                                value={data.gender}
                                placeholder="Selectionner le genre"
                                onChange={(gId) => setData('gender', gId)}
                                options={genders.map((c) => {
                                    return {
                                        label: c.name,
                                        value: c.id,
                                    };
                                })}
                            />
                            <InputError message={errors.gender} />
                        </div>

                        <div className="grid gap-1">
                            <Label htmlFor="relation_family">Type</Label>
                            <SelectSingle
                                value={data.relation_family}
                                placeholder="Type"
                                onChange={(gId) => setData('relation_family', gId)}
                                options={relations.map((c) => {
                                    return {
                                        label: c.name,
                                        value: c.id,
                                    };
                                })}
                            />
                            <InputError message={errors.relation_family} />
                        </div>

                        <div className="grid gap-1">
                            <Label htmlFor="family_id">Famille</Label>
                            <SelectSingle
                                value={data.family_id.toString()}
                                placeholder="Type"
                                onChange={(gId) => setData('family_id', parseInt(gId))}
                                options={families.map((c) => {
                                    return {
                                        label: c.name,
                                        value: c.id,
                                    };
                                })}
                            />
                            <InputError message={errors.family_id} />
                        </div>

                        <div className="grid gap-1">
                            <Label htmlFor="birth">Date de naissance</Label>
                            <Input type="date" id="birth" value={data.birth} onChange={(e) => setData('birth', e.target.value)} />
                            <InputError message={errors.birth} />
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
