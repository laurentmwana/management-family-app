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

type ModalFormSupportCourseProps = {
    id: number | null;
    course_id: number;
    year_academic_id: number;
    title: string;
    description: string;
    courses: FormatterObject[];
    years: FormatterObject[];
};

type ModalFormProps = {
    course_id: number;
    year_academic_id: number;
    title: string;
    description: string;
    document: File | null;
    id: number | null;
    _method: 'POST' | 'PUT';
};

export const ModalFormSupportCourse = ({ id, description, title, course_id, year_academic_id, courses, years }: ModalFormSupportCourseProps) => {
    const [openModal, setOpenModal] = useState<boolean>(false);

    const { post, data, setData, errors, processing, clearErrors, reset } = useForm<ModalFormProps>({
        document: null,
        description,
        title,
        course_id,
        year_academic_id,
        _method: id !== null ? 'PUT' : 'POST',
        id,
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        id === null
            ? post(route('#support-course.store'), {
                  preserveState: true,
                  onSuccess: () => {
                      setOpenModal(false);
                  },

                  forceFormData: true,
              })
            : post(route('#support-course.update', { id }), {
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
            setData('document', file);
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
                        <DialogTitle>{id === null ? "Création d'un support de cours" : `Modification de le support de cours #${id}`}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={onSubmit} className="grid gap-4 py-4" encType="multipart/form-data">
                        <div className="grid gap-1">
                            <Label htmlFor="document">Document</Label>
                            <Input id="document" type="file" onChange={handleFilesSelected} />
                            <InputError message={errors.document} />
                        </div>

                        <div className="grid gap-1">
                            <Label htmlFor="title">Titre</Label>
                            <Input id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} />
                            <InputError message={errors.title} />
                        </div>

                        <div className="grid gap-1">
                            <Label htmlFor="course_id">Cours</Label>
                            <SelectSingle
                                value={data.course_id.toString()}
                                placeholder="Selectionner le cours"
                                onChange={(c) => setData('course_id', parseInt(c))}
                                options={courses.map((c) => {
                                    return {
                                        label: c.name,
                                        value: c.id,
                                    };
                                })}
                            />
                            <InputError message={errors.course_id} />
                        </div>

                        <div className="grid gap-1">
                            <Label htmlFor="year_academic_id">Année académique</Label>
                            <SelectSingle
                                value={data.year_academic_id.toString()}
                                placeholder="Selectionner l'année académique"
                                onChange={(c) => setData('year_academic_id', parseInt(c))}
                                options={years.map((c) => {
                                    return {
                                        label: c.name,
                                        value: c.id,
                                    };
                                })}
                            />
                            <InputError message={errors.year_academic_id} />
                        </div>

                        <div className="grid gap-1">
                            <Label htmlFor="description">Description </Label>
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
