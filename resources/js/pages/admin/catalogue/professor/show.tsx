import AppLayout from '@/layouts/app-layout';
import { FormatterObject, Professor, SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { ModalFormProfessor } from './modal-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Professeurs',
        href: route('#professor.index'),
    },
    {
        title: 'En savoir plus sur un professeur',
        href: '',
    },
];

type PostShowProps = { professor: Professor; genders: FormatterObject[] } & SharedData;

const PostShow = () => {
    const { professor, auth, genders } = usePage<PostShowProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container-card">
                    <div className="flex items-center justify-between gap-5">
                        <h2 className="text-base font-semibold">{professor.full_name}</h2>

                        <ModalFormProfessor
                            speciality={professor.speciality}
                            genders={genders}
                            id={professor.id}
                            full_name={professor.full_name}
                            email={professor.email}
                            phone={professor.phone}
                            gender={professor.gender}
                            userId={professor.user_id}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default PostShow;
