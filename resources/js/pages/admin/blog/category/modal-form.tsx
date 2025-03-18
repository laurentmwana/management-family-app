import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader } from '@/components/ui/loader';
import { useForm } from '@inertiajs/react';
import { Pen, Plus, Save } from 'lucide-react';
import { FormEvent, useState } from 'react';

type ModalFormCategoryProps = { name: string; id: number | null };

type ModalFormProps = { name: string; id: number | null };

export const ModalFormCategory = ({ name, id }: ModalFormCategoryProps) => {
    const [openModal, setOpenModal] = useState<boolean>(false);

    const { post, put, data, setData, errors, processing, hasErrors, setError, reset } = useForm<ModalFormProps>({ name, id });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        id === null
            ? post(route('#category.store'), {
                  preserveState: true,
                  onSuccess: () => {
                      setOpenModal(false);
                  },
              })
            : put(route('#category.update', { id }), {
                  preserveState: true,
                  onSuccess: () => {
                      setOpenModal(false);
                  },
              });
    };

    const onOpenChangeModal = (stateModal: boolean) => {
        setOpenModal(stateModal);

        setError('name', '');
        setError('id', '');
        reset('name');
    };

    return (
        <>
            <Button onClick={() => setOpenModal(true)} size="sm" variant="outline">
                {id === null ? <Plus size={15} /> : <Pen size={15} />}
            </Button>
            <Dialog open={openModal} onOpenChange={onOpenChangeModal} defaultOpen={openModal}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>{id === null ? "Création d'une categorie" : `Modification de la categorie #${id}`}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={onSubmit} className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nom de la categorie</Label>
                            <Input
                                placeholder="Ps: Réseaux Informatique"
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            <InputError message={errors.name} />
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
