import AppLayout from '@/layouts/app-layout';
import { Event, FormatterObject, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { ModalFormEvent } from './modal-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Eventments',
        href: route('#event.index'),
    },
    {
        title: 'En savoir plus sur un évènement',
        href: '',
    },
];

type CourseShowProps = { event: Event; types: FormatterObject[] };

const CourseShow = () => {
    const { event, types } = usePage<CourseShowProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Evènements" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container-card">
                    <div className="flex items-center justify-between gap-5">
                        <h2 className="text-base font-semibold">{event.title}</h2>
                        <ModalFormEvent
                            id={event.id}
                            title={event.title}
                            description={event.description}
                            type={event.type}
                            types={types}
                            start_at={event.start_at}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default CourseShow;
