import AppLayout from '@/layouts/app-layout';
import { Category, Option, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { ModalFormOption } from './modal-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Options',
        href: route('#option.index'),
    },
    {
        title: 'En savoir plus sur une categorie',
        href: '',
    },
];

type OptionShowProps = { option: Option };

const OptionShow = () => {
    const { option } = usePage<OptionShowProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container-card">
                    <div className="flex items-center justify-between gap-5">
                        <h2 className="text-base font-semibold">{option.name}</h2>
                        <ModalFormOption name={option.name} alias={option.alias} id={option.id} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default OptionShow;
