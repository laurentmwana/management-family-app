import AppLayout from '@/layouts/app-layout';
import { FormatterObject, Professor, SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { ModalFormStudent } from './modal-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Etudiants',
        href: route('#student.index'),
    },
    {
        title: 'En savoir plus sur un professeur',
        href: '',
    },
];

type PostShowProps = { student: Professor; genders: FormatterObject[] } & SharedData;

const PostShow = () => {
    const { student, auth, genders } = usePage<PostShowProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container-card">
                    <div className="flex items-center justify-between gap-5">
                        <h2 className="text-base font-semibold">{student.full_name}</h2>
                        <ModalFormStudent
                            genders={genders}
                            id={student.id}
                            full_name={student.full_name}
                            email={student.user.email}
                            phone={student.phone}
                            gender={student.gender}
                            userId={student.user_id}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default PostShow;
