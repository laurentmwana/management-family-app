import { ActionDeleteWithPassword } from '@/components/action-with-password';
import { ButtonLink } from '@/components/ui/button-link';
import { Pagination } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { truncate } from '@/lib/utils';
import { Moment } from '@/shared/moment';
import { SearchInput } from '@/shared/search-input';
import { FormatterObject, PaginationData, SharedData, WorkPratical } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Eye } from 'lucide-react';
import { ModalFormWorkPratical } from './modal-form';

type WorkpraticalIndexProps = { workPraticals: PaginationData<WorkPratical>; years: FormatterObject[]; courses: FormatterObject[] } & SharedData;

const WorkpraticalIndex = () => {
    const { workPraticals, years, courses } = usePage<WorkpraticalIndexProps>().props;

    return (
        <AppLayout>
            <Head title="Articles" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container-card">
                    <h2 className="text-base font-semibold">Liste des travaux pratiques</h2>
                    <div className="my-5 flex items-center justify-between">
                        <SearchInput lenghtData={workPraticals.total} urlBack={route('#work-pratical.index')} />
                        <ModalFormWorkPratical
                            price={0}
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
                                <TableHead>Prix</TableHead>
                                <TableHead>Créer</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {workPraticals.data.map((workPratical) => {
                                return (
                                    <TableRow key={workPratical.id}>
                                        <TableCell>{truncate(workPratical.title, 30, '...')}</TableCell>
                                        <TableCell>
                                            <Link href={route('#course.show', { id: workPratical.course.id })}>
                                                {truncate(workPratical.course.name, 30, '...')}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <Link href={`${route('#year-academic.index')}#${workPratical.year_academic.name}`}>
                                                {truncate(workPratical.year_academic.name, 10, '...')}
                                            </Link>
                                        </TableCell>

                                        <TableCell>
                                            {workPratical.price}$
                                        </TableCell>

                                        <TableCell>
                                            <Moment date={workPratical.created_at} />
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex items-center gap-4">
                                                <ModalFormWorkPratical
                                                price={workPratical.price}
                                                    year_academic_id={workPratical.year_academic_id}
                                                    course_id={workPratical.course_id}
                                                    title={workPratical.title}
                                                    description={workPratical.description}
                                                    id={workPratical.id}
                                                    years={years}
                                                    courses={courses}
                                                />
                                                <ActionDeleteWithPassword routeDestroy={route('#work-pratical.destroy', { id: workPratical.id })} />

                                                <ButtonLink
                                                    dimension="sm"
                                                    variant="secondary"
                                                    href={route('#work-pratical.show', { id: workPratical.id })}
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
                    <Pagination paginate={workPraticals} />
                </div>
            </div>
        </AppLayout>
    );
};

export default WorkpraticalIndex;
