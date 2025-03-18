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

type ModalFormStudentProps = {
    full_name: string;
    email: string;
    phone: string;
    id: number | null;
    userId: number;
    gender: string;
    genders: FormatterObject[];
};

type ModalFormProps = {
    full_name: string;
    email: string;
    password: string;
    phone: string;
    gender: string;
    userId: number;
    id: number | null;
};

export const ModalFormStudent = ({ id, genders, full_name, email, phone, gender, userId }: ModalFormStudentProps) => {
    const [openModal, setOpenModal] = useState<boolean>(false);

    const { post, put, data, setData, errors, processing, clearErrors, reset } = useForm<ModalFormProps>({
        full_name,
        email,
        phone,
        password: '',
        gender,
        id,
        userId,
    });

    console.log(userId);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        id === null
            ? post(route('#student.store'), {
                  preserveState: true,
                  onSuccess: () => {
                      reset('password');
                      setOpenModal(false);
                  },
              })
            : put(route('#student.update', { id }), {
                  preserveState: true,
                  onSuccess: () => {
                      reset('password');
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
                        <DialogTitle>{id === null ? "Création d'un étudiant" : `Modification de l'étudiant #${id}`}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={onSubmit} className="grid gap-4 py-4" encType="multipart/form-data">
                        <div className="grid gap-1">
                            <Label htmlFor="full_name">Nom complet</Label>
                            <Input id="full_name" value={data.full_name} onChange={(e) => setData('full_name', e.target.value)} />
                            <InputError message={errors.full_name} />
                        </div>

                        <div className="grid gap-1">
                            <Label htmlFor="phone">Téléphone</Label>
                            <Input id="phone" value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
                            <InputError message={errors.phone} />
                        </div>

                        <div className="grid gap-1">
                            <Label htmlFor="gender">Genre</Label>
                            <SelectSingle
                                value={data.gender}
                                placeholder="Selectionner le genre"
                                onChange={(genderId) => setData('gender', genderId)}
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
                            <Label htmlFor="email">Adresse e-mail</Label>
                            <Input id="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                            <InputError message={errors.email} />
                        </div>

                        <div className="grid gap-1">
                            <Label htmlFor="password">Mot de passe</Label>
                            <Input type="password" id="password" onChange={(e) => setData('password', e.target.value)} />
                            <InputError message={errors.password} />
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
