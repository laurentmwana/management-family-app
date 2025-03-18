import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Moment } from '@/shared/moment';
import { SearchInput } from '@/shared/search-input';
import { PaginationData, SharedData, YearAcademic } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { ModalFormPush } from './modal-push';

type YearIndexProps = { years: PaginationData<YearAcademic> } & SharedData;

const YearIndex = () => {
    const { years } = usePage<YearIndexProps>().props;

    return (
        <AppLayout>
            <Head title="Articles" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container-card">
                    <h2 className="text-base font-semibold">Année académique</h2>
                    <div className="my-5 flex items-center justify-between">
                        <SearchInput lenghtData={years.total} urlBack={route('#professor.index')} />
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nom</TableHead>
                                <TableHead>Active</TableHead>
                                <TableHead>Créer</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {years.data.map((year) => {
                                return (
                                    <TableRow key={year.id}>
                                        <TableCell>{year.name}</TableCell>
                                        <TableCell>
                                            <Badge variant={year.is_active ? 'secondary' : 'destructive'}>{year.is_active ? 'Oui' : 'Non'}</Badge>
                                        </TableCell>

                                        <TableCell>
                                            <Moment date={year.created_at} />
                                        </TableCell>

                                        <TableCell>{year.is_active ? <ModalFormPush year={year} /> : null}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    <Pagination paginate={years} />
                </div>
            </div>
        </AppLayout>
    );
};

export default YearIndex;
