import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tableau de bord',
        href: route('dashboard'),
    },
];

const DashboardIndex = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tableau de bord" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container-card">
                    <h2 className="text-base font-semibold">Tableau de bord</h2>
                    <div className="my-5 flex items-center justify-between"></div>
                </div>
            </div>
        </AppLayout>
    );
};

export default DashboardIndex;
