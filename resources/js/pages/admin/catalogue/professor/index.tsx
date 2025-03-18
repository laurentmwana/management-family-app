import { ActionDeleteWithPassword } from '@/components/action-with-password';
import { Badge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button-link';
import { Pagination } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { truncate } from '@/lib/utils';
import { Moment } from '@/shared/moment';
import { SearchInput } from '@/shared/search-input';
import { FormatterObject, PaginationData, Professor, SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Eye } from 'lucide-react';
import { ModalFormProfessor } from './modal-form';

type PostIndexProps = { professors: PaginationData<Professor>; genders: FormatterObject[] } & SharedData;

const PostIndex = () => {
    const { professors, genders } = usePage<PostIndexProps>().props;

    return (
        <AppLayout>
            <Head title="Articles" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container-card">
                    <h2 className="text-base font-semibold">Liste des professeurs</h2>
                    <div className="my-5 flex items-center justify-between">
                        <SearchInput lenghtData={professors.total} urlBack={route('#professor.index')} />
                        <ModalFormProfessor userId={0} speciality="" genders={genders} id={null} full_name="" email="" phone="" gender="" />
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nom</TableHead>
                                <TableHead>Genre</TableHead>
                                <TableHead>Cours</TableHead>
                                <TableHead>Créer</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {professors.data.map((professor) => {
                                return (
                                    <TableRow key={professor.id}>
                                        <TableCell>{truncate(professor.full_name, 20, '...')}</TableCell>
                                        <TableCell>{professor.gender}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{professor.courses.length}</Badge>
                                        </TableCell>

                                        <TableCell>
                                            <Moment date={professor.created_at} />
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex items-center gap-4">
                                                <ModalFormProfessor
                                                    speciality={professor.speciality}
                                                    genders={genders}
                                                    id={professor.id}
                                                    full_name={professor.full_name}
                                                    email={professor.user.email}
                                                    phone={professor.phone}
                                                    gender={professor.gender}
                                                    userId={professor.user_id}
                                                />

                                                <ActionDeleteWithPassword routeDestroy={route('#professor.destroy', { id: professor.id })} />

                                                <ButtonLink dimension="sm" variant="secondary" href={route('#professor.show', { id: professor.id })}>
                                                    <Eye size={15} />
                                                </ButtonLink>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    <Pagination paginate={professors} />
                </div>
            </div>
        </AppLayout>
    );
};

export default PostIndex;
