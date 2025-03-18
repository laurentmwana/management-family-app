import { ActionDeleteWithPassword } from '@/components/action-with-password';
import { Badge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button-link';
import { Pagination } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { truncate } from '@/lib/utils';
import { Moment } from '@/shared/moment';
import { SearchInput } from '@/shared/search-input';
import { Course, FormatterObject, PaginationData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Eye } from 'lucide-react';
import { ModalFormCourse } from './modal-form';

type CourseIndexProps = { courses: PaginationData<Course>; professors: FormatterObject[]; levels: FormatterObject[] };

const CourseIndex = () => {
    const { levels, professors, courses } = usePage<CourseIndexProps>().props;

    return (
        <AppLayout>
            <Head title="Levels" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container-card">
                    <h2 className="text-base font-semibold">Liste des cours</h2>
                    <div className="my-5 flex items-center justify-between">
                        <SearchInput lenghtData={courses.total} urlBack={route('#course.index')} />
                        <ModalFormCourse id={null} name={''} alias={''} professor_id={0} levels={levels} professors={professors} levelIds={[]} />
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nom</TableHead>
                                <TableHead>Alias</TableHead>
                                <TableHead>Professeur</TableHead>
                                <TableHead>Promotion</TableHead>
                                <TableHead>Créer</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {courses.data.map((course) => {
                                return (
                                    <TableRow key={course.id}>
                                        <TableCell>{truncate(course.name, 100, '...')}</TableCell>
                                        <TableCell>{truncate(course.alias, 30, '...')}</TableCell>

                                        <TableCell>
                                            <Link className="hover:underline" href={route('#professor.show', { id: course.professor.id })}>
                                                {truncate(course.professor.full_name, 100, '...')}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">{course.levels.length}</Badge>
                                        </TableCell>

                                        <TableCell>
                                            <Moment date={course.created_at} />
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-4">
                                                <ModalFormCourse
                                                    id={course.id}
                                                    name={course.name}
                                                    alias={course.alias}
                                                    professor_id={course.professor_id}
                                                    levels={levels}
                                                    professors={professors}
                                                    levelIds={course.levels.map((l) => l.id)}
                                                />
                                                <ActionDeleteWithPassword routeDestroy={route('#course.destroy', { id: course.id })} />

                                                <ButtonLink dimension="sm" variant="secondary" href={route('#course.show', { id: course.id })}>
                                                    <Eye size={15} />
                                                </ButtonLink>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    <Pagination paginate={courses} />
                </div>
            </div>
        </AppLayout>
    );
};

export default CourseIndex;
