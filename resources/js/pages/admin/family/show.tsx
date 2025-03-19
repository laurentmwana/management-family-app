import AppLayout from '@/layouts/app-layout';
import { Family, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { ModalFormFamily } from './modal-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Familles',
        href: route('#family.index'),
    },
    {
        title: 'En savoir plus sur une categorie',
        href: '',
    },
];

type FamilyShowProps = { family: Family };

const FamilyShow = () => {
    const { family } = usePage<FamilyShowProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container-card">
                    <div className="mb-4 flex items-center justify-between gap-5">
                        <h2 className="text-base font-semibold">{family.name}</h2>
                        <ModalFormFamily name={family.name} description={family.description} id={family.id} />
                    </div>
                    <p className="text-sm mb-4">Cette famille a {family.peoples.length} membre(s)</p>
                    <p className="text-sm">{family.description}</p>
                </div>
            </div>
        </AppLayout>
    );
};

export default FamilyShow;
