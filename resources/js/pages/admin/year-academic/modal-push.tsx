import { PlusCircle } from 'lucide-react';

import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Loader } from '@/components/ui/loader';
import { YearAcademic } from '@/types';

type ModalFormPushProps = { year: YearAcademic };

export const ModalFormPush = ({ year }: ModalFormPushProps) => {
    const passwordInput = useRef<HTMLInputElement>(null);
    const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm({ password: '' });

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('#year-academic.push', { id: year.id }), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        clearErrors();
        reset();
    };

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button size="sm" variant="secondary">
                        <PlusCircle size={15} />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>Désactivation de l'année académique {year.name}</DialogTitle>
                    <DialogDescription>
                        Êtes-vous sûr de vouloir effectuer cette action ? Cette action est irréversible. Si oui, veuillez entrer le mot de passe de
                        votre compte pour confirmer.
                    </DialogDescription>
                    <form className="space-y-6" onSubmit={deleteUser}>
                        <div className="grid gap-2">
                            <Label htmlFor="password" className="sr-only">
                                Mot de passe
                            </Label>

                            <Input
                                id="password"
                                type="password"
                                name="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Password"
                                autoComplete="current-password"
                            />

                            <InputError message={errors.password} />
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="secondary" onClick={closeModal}>
                                    Non
                                </Button>
                            </DialogClose>

                            <Button variant="outline" asChild>
                                <button type="submit">{processing ? <Loader variant="gradient" /> : 'Oui'}</button>
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};
