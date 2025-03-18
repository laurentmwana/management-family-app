import { ActionDeleteWithPassword } from '@/components/action-with-password';
import { ButtonLink } from '@/components/ui/button-link';
import { Pagination } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { truncate } from '@/lib/utils';
import { Moment } from '@/shared/moment';
import { SearchInput } from '@/shared/search-input';
import { FormatterObject, PaginationData, SharedData, SupportCourse } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Eye } from 'lucide-react';
import { ModalFormSupportCourse } from './modal-form';

type SupportCourseIndexProps = { supportCourses: PaginationData<SupportCourse>; years: FormatterObject[]; courses: FormatterObject[] } & SharedData;

const SupportCourseIndex = () => {
    const { supportCourses, years, courses } = usePage<SupportCourseIndexProps>().props;

    return (
        <AppLayout>
            <Head title="Articles" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container-card">
                    <h2 className="text-base font-semibold">Liste des supports de cours</h2>
                    <div className="my-5 flex items-center justify-between">
                        <SearchInput lenghtData={supportCourses.total} urlBack={route('#support-course.index')} />
                        <ModalFormSupportCourse
                            year_academic_id={0}
                            course_id={0}
                            title=""
                            description=""
                            id={null}
                            years={years}
                            courses={courses}
                        />
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Titre</TableHead>
                                <TableHead>Année académique</TableHead>
                                <TableHead>Cours</TableHead>
                                <TableHead>Créer</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {supportCourses.data.map((supportCourse) => {
                                return (
                                    <TableRow key={supportCourse.id}>
                                        <TableCell>{truncate(supportCourse.title, 30, '...')}</TableCell>
                                        <TableCell>
                                            <Link href={route('#course.show', { id: supportCourse.course.id })}>
                                                {truncate(supportCourse.course.name, 30, '...')}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <Link href={`${route('#year-academic.index')}#${supportCourse.year_academic.name}`}>
                                                {truncate(supportCourse.year_academic.name, 10, '...')}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <Moment date={supportCourse.created_at} />
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex items-center gap-4">
                                                <ModalFormSupportCourse
                                                    year_academic_id={supportCourse.year_academic_id}
                                                    course_id={supportCourse.course_id}
                                                    title={supportCourse.title}
                                                    description={supportCourse.description}
                                                    id={supportCourse.id}
                                                    years={years}
                                                    courses={courses}
                                                />
                                                <ActionDeleteWithPassword routeDestroy={route('#support-course.destroy', { id: supportCourse.id })} />

                                                <ButtonLink
                                                    dimension="sm"
                                                    variant="secondary"
                                                    href={route('#support-course.show', { id: supportCourse.id })}
                                                >
                                                    <Eye size={15} />
                                                </ButtonLink>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    <Pagination paginate={supportCourses} />
                </div>
            </div>
        </AppLayout>
    );
};

export default SupportCourseIndex;
