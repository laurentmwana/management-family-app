import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader } from '@/components/ui/loader';
import { SelectMultiple } from '@/components/ui/select-multiple';
import { Textarea } from '@/components/ui/textarea';
import { FormatterObject } from '@/types';
import { useForm } from '@inertiajs/react';
import { Pen, Plus, Save } from 'lucide-react';
import { FormEvent, useState } from 'react';

type ModalFormPostProps = {
    content: string;
    title: string;
    id: number | null;
    categoriesId: Array<number>;
    categoriesItems: FormatterObject[];
};

type ModalFormProps = {
    content: string;
    image: File | null;
    title: string;
    id: number | null;
    categories: Array<number>;
    _method: 'POST' | 'PUT';
};

export const ModalFormPost = ({ title, content, categoriesId, id, categoriesItems }: ModalFormPostProps) => {
    const [openModal, setOpenModal] = useState<boolean>(false);

    const { post, data, setData, errors, processing, clearErrors, reset } = useForm<ModalFormProps>({
        title,
        content,
        image: null,
        categories: categoriesId,
        id,
        _method: id !== null ? 'PUT' : 'POST',
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        id === null
            ? post(route('#post.store'), {
                  preserveState: true,
                  onSuccess: () => {
                      setOpenModal(false);
                  },

                  forceFormData: true,
              })
            : post(route('#post.update', { id }), {
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
                        <DialogTitle>{id === null ? "Création d'un article" : `Modification de l'article #${id}`}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={onSubmit} className="grid gap-4 py-4" encType="multipart/form-data">
                        <div className="grid gap-1">
                            <Label htmlFor="image">Image</Label>
                            <Input id="image" type="file" onChange={handleFilesSelected} />
                            <InputError message={errors.image} />
                        </div>

                        <div className="grid gap-1">
                            <Label htmlFor="title">Titre</Label>
                            <Input id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} />
                            <InputError message={errors.title} />
                        </div>

                        <div className="grid gap-1">
                            <Label htmlFor="categories">Categories</Label>
                            <SelectMultiple
                                values={categoriesId.map((cId) => cId.toString())}
                                placeholder="Selectionner au mimimun 2 categories"
                                onChange={(ids) =>
                                    setData(
                                        'categories',
                                        ids.map((i) => parseInt(i)),
                                    )
                                }
                                options={categoriesItems.map((c) => {
                                    return {
                                        label: c.name,
                                        value: c.id,
                                    };
                                })}
                            />
                            <InputError message={errors.categories} />
                        </div>

                        <div className="grid gap-1">
                            <Label htmlFor="content">Contenu (Markdown)</Label>
                            <Textarea id="content" value={data.content} onChange={(e) => setData('content', e.target.value)} />
                            <InputError message={errors.content} />
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
