import { ActionDeleteWithPassword } from '@/components/action-with-password';
import { ButtonLink } from '@/components/ui/button-link';
import { Pagination } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { truncate } from '@/lib/utils';
import { Moment } from '@/shared/moment';
import { SearchInput } from '@/shared/search-input';
import { FormatterObject, PaginationData, SharedData, Student } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Eye } from 'lucide-react';
import { ModalFormStudent } from './modal-form';

type StudentIndexProps = { students: PaginationData<Student>; genders: FormatterObject[] } & SharedData;

const StudentIndex = () => {
    const { students, genders } = usePage<StudentIndexProps>().props;

    return (
        <AppLayout>
            <Head title="Articles" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container-card">
                    <h2 className="text-base font-semibold">Liste des étudiants</h2>
                    <div className="my-5 flex items-center justify-between">
                        <SearchInput lenghtData={students.total} urlBack={route('#student.index')} />
                        <ModalFormStudent userId={0} genders={genders} id={null} full_name="" email="" phone="" gender="" />
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nom complet</TableHead>
                                <TableHead>Matricule</TableHead>
                                <TableHead>Genre</TableHead>
                                <TableHead>Créer</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {students.data.map((student) => {
                                return (
                                    <TableRow key={student.id}>
                                        <TableCell>{truncate(student.full_name, 20, '...')}</TableCell>
                                        <TableCell>{truncate(student.registration_number, 10, '...')}</TableCell>
                                        <TableCell>{student.gender}</TableCell>

                                        <TableCell>
                                            <Moment date={student.created_at} />
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex items-center gap-4">
                                                <ModalFormStudent
                                                    genders={genders}
                                                    id={student.id}
                                                    full_name={student.full_name}
                                                    email={student.user.email}
                                                    phone={student.phone}
                                                    gender={student.gender}
                                                    userId={student.user_id}
                                                />

                                                <ActionDeleteWithPassword routeDestroy={route('#student.destroy', { id: student.id })} />

                                                <ButtonLink dimension="sm" variant="secondary" href={route('#student.show', { id: student.id })}>
                                                    <Eye size={15} />
                                                </ButtonLink>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    <Pagination paginate={students} />
                </div>
            </div>
        </AppLayout>
    );
};

export default StudentIndex;
