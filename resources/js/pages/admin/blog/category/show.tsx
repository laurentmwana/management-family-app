import AppLayout from '@/layouts/app-layout';
import { Category, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { ModalFormCategory } from './modal-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: route('#category.index'),
    },
    {
        title: 'En savoir plus sur une categorie',
        href: '',
    },
];

type CategoryShowProps = { category: Category };

const CategoryShow = () => {
    const { category } = usePage<CategoryShowProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container-card">
                    <div className="flex items-center justify-between gap-5">
                        <h2 className="text-base font-semibold">{category.name}</h2>
                        <ModalFormCategory name={category.name} id={category.id} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default CategoryShow;
