import AppLayout from '@/layouts/app-layout';
import { Course, FormatterObject, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { ModalFormCourse } from './modal-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cours',
        href: route('#level.index'),
    },
    {
        title: 'En savoir plus sur un cours',
        href: '',
    },
];

type CourseShowProps = { course: Course; professors: FormatterObject[]; levels: FormatterObject[] };

const CourseShow = () => {
    const { course, professors, levels } = usePage<CourseShowProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container-card">
                    <div className="flex items-center justify-between gap-5">
                        <h2 className="text-base font-semibold">{course.name}</h2>
                        <ModalFormCourse
                            id={course.id}
                            name={course.name}
                            alias={course.alias}
                            professor_id={course.professor_id}
                            levels={levels}
                            professors={professors}
                            levelIds={course.levels.map((l) => l.id)}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default CourseShow;
