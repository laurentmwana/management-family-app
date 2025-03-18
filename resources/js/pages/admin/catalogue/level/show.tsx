import AppLayout from '@/layouts/app-layout';
import { FormatterObject, Level, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { ModalFormLevel } from './modal-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Promotions',
        href: route('#level.index'),
    },
    {
        title: 'En savoir plus sur une promotion',
        href: '',
    },
];

type LevelShowProps = { level: Level; options: FormatterObject[] };

const LevelShow = () => {
    const { level, options } = usePage<LevelShowProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container-card">
                    <div className="flex items-center justify-between gap-5">
                        <h2 className="text-base font-semibold">{level.name}</h2>
                        <ModalFormLevel options={options} name={level.name} alias={level.alias} option_id={level.option_id} id={level.id} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default LevelShow;
