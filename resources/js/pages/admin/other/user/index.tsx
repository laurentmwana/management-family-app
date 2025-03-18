import { ActionDeleteWithPassword } from '@/components/action-with-password';
import { Badge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button-link';
import { Pagination } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { truncate } from '@/lib/utils';
import { Moment } from '@/shared/moment';
import { SearchInput } from '@/shared/search-input';
import { PaginationData, User } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Eye } from 'lucide-react';
import { ModalFormUser } from './modal-form';

type CourseIndexProps = { users: PaginationData<User> };

const CourseIndex = () => {
    const { users } = usePage<CourseIndexProps>().props;

    return (
        <AppLayout>
            <Head title="Levels" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container-card">
                    <h2 className="text-base font-semibold">Liste des cours</h2>
                    <div className="my-5 flex items-center justify-between">
                        <SearchInput lenghtData={users.total} urlBack={route('#course.index')} />
                        <ModalFormUser id={null} name="" email="" />
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nom</TableHead>
                                <TableHead>Adresse e-mail</TableHead>
                                <TableHead>Adresse e-mail vérifié</TableHead>
                                <TableHead>Créer</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.data.map((user) => {
                                return (
                                    <TableRow key={user.id}>
                                        <TableCell>{truncate(user.name, 100, '...')}</TableCell>
                                        <TableCell>{truncate(user.email, 30, '...')}</TableCell>
                                        <TableCell>
                                            <Badge variant={user.email_verified_at !== null ? 'secondary' : 'destructive'}>
                                                {user.email_verified_at !== null ? 'Oui' : 'Non'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Moment date={user.created_at} />
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-4">
                                                <ModalFormUser id={user.id} name={user.name} email={user.email} />

                                                <ActionDeleteWithPassword routeDestroy={route('#user.destroy', { id: user.id })} />

                                                <ButtonLink dimension="sm" variant="secondary" href={route('#user.show', { id: user.id })}>
                                                    <Eye size={15} />
                                                </ButtonLink>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    <Pagination paginate={users} />
                </div>
            </div>
        </AppLayout>
    );
};

export default CourseIndex;
