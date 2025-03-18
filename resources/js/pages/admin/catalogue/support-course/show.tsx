import AppLayout from '@/layouts/app-layout';
import { FormatterObject, SharedData, SupportCourse, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { ModalFormSupportCourse } from './modal-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Support de cours',
        href: route('#support-course.index'),
    },
    {
        title: 'En savoir plus sur un support de cours',
        href: '',
    },
];

type SupportCourseShowProps = { supportCourse: SupportCourse; years: FormatterObject[]; courses: FormatterObject[] } & SharedData;

const SupportCourseShow = () => {
    const { supportCourse, courses, years } = usePage<SupportCourseShowProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container-card">
                    <div className="flex items-center justify-between gap-5">
                        <h2 className="text-base font-semibold">{supportCourse.title}</h2>

                        <ModalFormSupportCourse
                            year_academic_id={supportCourse.year_academic_id}
                            course_id={supportCourse.course_id}
                            title={supportCourse.title}
                            description={supportCourse.description}
                            id={supportCourse.id}
                            years={years}
                            courses={courses}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default SupportCourseShow;
