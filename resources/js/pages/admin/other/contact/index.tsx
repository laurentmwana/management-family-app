import { ActionDeleteWithPassword } from '@/components/action-with-password';
import { ButtonLink } from '@/components/ui/button-link';
import { Pagination } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { truncate } from '@/lib/utils';
import { Moment } from '@/shared/moment';
import { SearchInput } from '@/shared/search-input';
import { Contact, PaginationData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Eye } from 'lucide-react';

type QuizProps = { contacts: PaginationData<Contact> };

const ContactIndex = () => {
    const { contacts } = usePage<QuizProps>().props;

    return (
        <AppLayout>
            <Head title="Categories" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container-card">
                    <h2 className="text-base font-semibold">Liste des messages de contact</h2>
                    <div className="my-5 flex items-center justify-between">
                        <SearchInput lenghtData={contacts.total} urlBack={route('#contact.index')} />
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nom</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Envoyer</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {contacts.data.map((contact) => {
                                return (
                                    <TableRow key={contact.id}>
                                        <TableCell>{truncate(contact.name, 60, '...')}</TableCell>
                                        <TableCell>{truncate(contact.email, 60, '...')}</TableCell>

                                        <TableCell>
                                            <Moment date={contact.created_at} />
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex items-center gap-4">
                                                <ActionDeleteWithPassword routeDestroy={route('#contact.destroy', { id: contact.id })} />

                                                <ButtonLink dimension="sm" variant="secondary" href={route('#contact.show', { id: contact.id })}>
                                                    <Eye size={15} />
                                                </ButtonLink>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    <Pagination paginate={contacts} />
                </div>
            </div>
        </AppLayout>
    );
};

export default ContactIndex;
