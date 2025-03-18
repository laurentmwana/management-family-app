import AppLayout from '@/layouts/app-layout';
import { User, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { ModalFormUser } from './modal-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Utilisateurs',
        href: route('#user.index'),
    },
    {
        title: 'En savoir plus sur un utilisateur',
        href: '',
    },
];

type CourseShowProps = { user: User };

const CourseShow = () => {
    const { user } = usePage<CourseShowProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Utilisateurs" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container-card">
                    <div className="flex items-center justify-between gap-5">
                        <h2 className="text-base font-semibold">{user.name}</h2>
                        <ModalFormUser id={user.id} name={user.name} email={user.email} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default CourseShow;
