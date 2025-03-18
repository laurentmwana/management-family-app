import { ActionDeleteWithPassword } from '@/components/action-with-password';
import { Badge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button-link';
import { Pagination } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { truncate } from '@/lib/utils';
import { Moment } from '@/shared/moment';
import { SearchInput } from '@/shared/search-input';
import { Family, PaginationData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Eye } from 'lucide-react';
import { ModalFormFamily } from './modal-form';

type FamilyIndexProps = { families: PaginationData<Family> };

const FamilyIndex = () => {
    const { families } = usePage<FamilyIndexProps>().props;

    return (
        <AppLayout>
            <Head title="Famille(s)" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container-card">
                    <h2 className="text-base font-semibold">Liste des categories</h2>
                    <div className="my-5 flex items-center justify-between">
                        <SearchInput lenghtData={families.total} urlBack={route('#family.index')} />
                        <ModalFormFamily name="" description="" id={null} />
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nom</TableHead>
                                <TableHead>Membres</TableHead>
                                <TableHead>Créer</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {families.data.map((family) => {
                                return (
                                    <TableRow key={family.id}>
                                        <TableCell>{truncate(family.name, 100, '...')}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{family.peoples.length}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Moment date={family.created_at} />
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex items-center gap-4">
                                                <ModalFormFamily description={family.description} name={family.name} id={family.id} />

                                                <ActionDeleteWithPassword routeDestroy={route('#family.destroy', { id: family.id })} />

                                                <ButtonLink dimension="sm" variant="secondary" href={route('#family.show', { id: family.id })}>
                                                    <Eye size={15} />
                                                </ButtonLink>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    <Pagination paginate={families} />
                </div>
            </div>
        </AppLayout>
    );
};

export default FamilyIndex;
