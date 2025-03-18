import { ActionDeleteWithPassword } from '@/components/action-with-password';
import { Badge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button-link';
import { Pagination } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { truncate } from '@/lib/utils';
import { Moment } from '@/shared/moment';
import { SearchInput } from '@/shared/search-input';
import { Option, PaginationData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Eye } from 'lucide-react';
import { ModalFormOption } from './modal-form';

type OptionIndexProps = { options: PaginationData<Option> };

const OptionIndex = () => {
    const { options } = usePage<OptionIndexProps>().props;

    return (
        <AppLayout>
            <Head title="options" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container-card">
                    <h2 className="text-base font-semibold">Liste des options</h2>
                    <div className="my-5 flex items-center justify-between">
                        <SearchInput lenghtData={options.total} urlBack={route('#option.index')} />
                        <ModalFormOption alias="" name="" id={null} />
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nom</TableHead>
                                <TableHead>Alias</TableHead>
                                <TableHead>Promotions</TableHead>
                                <TableHead>Créer</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {options.data.map((option) => {
                                return (
                                    <TableRow key={option.id}>
                                        <TableCell>{truncate(option.name, 100, '...')}</TableCell>
                                        <TableCell>{truncate(option.alias, 20, '...')}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{option.levels.length}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Moment date={option.created_at} />
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex items-center gap-4">
                                                <ModalFormOption name={option.name} alias={option.alias} id={option.id} />
                                                <ActionDeleteWithPassword routeDestroy={route('#option.destroy', { id: option.id })} />

                                                <ButtonLink dimension="sm" variant="secondary" href={route('#option.show', { id: option.id })}>
                                                    <Eye size={15} />
                                                </ButtonLink>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    <Pagination paginate={options} />
                </div>
            </div>
        </AppLayout>
    );
};

export default OptionIndex;
