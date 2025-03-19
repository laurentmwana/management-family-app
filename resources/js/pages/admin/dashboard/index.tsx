import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tableau de bord',
        href: route('dashboard'),
    },
];
type DashboardIndexProps = {countFamilies: number, countPeoples: number}

const DashboardIndex = ({countFamilies, countPeoples}  : DashboardIndexProps) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tableau de bord" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                    <h2 className="text-base font-semibold">Tableau de bord</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="container-card">
                    <h2>Famille(s)</h2>
                    <p>
                        {countFamilies}
                    </p>
                </div>
                <div className="container-card">
                <h2>Membre de la famille(s)</h2>
                    <p>
                        {countPeoples}
                    </p>
                </div>
              </div>
            </div>
        </AppLayout>
    );
};

export default DashboardIndex;
