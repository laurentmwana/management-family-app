import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader } from '@/components/ui/loader';
import { SelectSingle } from '@/components/ui/select-single';
import { Textarea } from '@/components/ui/textarea';
import { FormatterObject } from '@/types';
import { useForm } from '@inertiajs/react';
import { Pen, Plus, Save } from 'lucide-react';
import { FormEvent, useState } from 'react';

type ModalFormEventProps = {
    title: string;
    description: string;
    type: string;
    start_at: string;
    id: number | null;
    types: FormatterObject[];
};
type ModalFormProps = {
    title: string;
    description: string;
    type: string;
    start_at: string;
    id: number | null;
    image: File | null;
    _method: 'POST' | 'PUT';
};

export const ModalFormEvent = ({ types, type, title, description, start_at, id }: ModalFormEventProps) => {
    const [openModal, setOpenModal] = useState<boolean>(false);

    const { post, put, data, setData, errors, processing, clearErrors, reset } = useForm<ModalFormProps>({
        type,
        title,
        description,
        start_at,
        id,
        image: null,
        _method: id !== null ? 'PUT' : 'POST',
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        id === null
            ? post(route('#event.store'), {
                  preserveState: true,
                  onSuccess: () => {
                      setOpenModal(false);
                  },
              })
            : put(route('#event.update', { id }), {
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
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>{id === null ? "Création d'un évènement" : `Modification de l'évènement #${id}`}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={onSubmit} className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="image">Image</Label>
                            <Input id="image" type="file" onChange={handleFilesSelected} />
                            <InputError message={errors.image} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="title">Titre</Label>
                            <Input id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} />
                            <InputError message={errors.title} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="start_at">Début</Label>
                            <Input type="datetime-local" id="start_at" value={data.start_at} onChange={(e) => setData('start_at', e.target.value)} />
                            <InputError message={errors.start_at} />
                        </div>

                        <div className="grid gap-1">
                            <Label htmlFor="type">Type</Label>
                            <SelectSingle
                                value={data.type.toString()}
                                placeholder="Selectionner un type"
                                onChange={(optionId) => setData('type', optionId)}
                                options={types.map((c) => {
                                    return {
                                        label: c.name,
                                        value: c.id,
                                    };
                                })}
                            />
                            <InputError message={errors.type} />
                        </div>

                        <div className="grid gap-1">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" value={data.description} onChange={(e) => setData('description', e.target.value)} />
                            <InputError message={errors.description} />
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
