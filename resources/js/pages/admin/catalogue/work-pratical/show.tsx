import AppLayout from '@/layouts/app-layout';
import { FormatterObject, SharedData, WorkPratical, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { ModalFormWorkPratical } from './modal-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Travaux pratiques',
        href: route('#work-pratical.index'),
    },
    {
        title: 'En savoir plus sur un travail pratique',
        href: '',
    },
];

type WorkPraticalShowProps = { workPratical: WorkPratical; years: FormatterObject[]; courses: FormatterObject[] } & SharedData;

const WorkPraticalShow = () => {
    const { workPratical, courses, years } = usePage<WorkPraticalShowProps>().props;

    console.log(workPratical)
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container-card">
                    <div className="flex items-center justify-between gap-5">
                        <h2 className="text-base font-semibold">{workPratical.title}</h2>

                        <ModalFormWorkPratical
                            price={workPratical.price}
                            year_academic_id={workPratical.year_academic_id
                            }
                            course_id={workPratical.course_id}
                            title={workPratical.title}
                            description={workPratical.description}
                            id={workPratical.id}
                            years={years}
                            courses={courses}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default WorkPraticalShow;
