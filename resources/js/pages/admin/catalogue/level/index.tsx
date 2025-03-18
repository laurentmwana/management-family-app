import { ActionDeleteWithPassword } from '@/components/action-with-password';
import { ButtonLink } from '@/components/ui/button-link';
import { Pagination } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { truncate } from '@/lib/utils';
import { Moment } from '@/shared/moment';
import { SearchInput } from '@/shared/search-input';
import { FormatterObject, Level, PaginationData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Eye } from 'lucide-react';
import { ModalFormLevel } from './modal-form';

type LevelIndexProps = { levels: PaginationData<Level>; options: FormatterObject[] };

const LevelIndex = () => {
    const { levels, options } = usePage<LevelIndexProps>().props;

    return (
        <AppLayout>
            <Head title="Levels" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container-card">
                    <h2 className="text-base font-semibold">Liste des promotions</h2>
                    <div className="my-5 flex items-center justify-between">
                        <SearchInput lenghtData={levels.total} urlBack={route('#level.index')} />
                        <ModalFormLevel options={options} alias="" name="" option_id={0} id={null} />
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nom</TableHead>
                                <TableHead>Alias</TableHead>
                                <TableHead>Option</TableHead>
                                <TableHead>Créer</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {levels.data.map((level) => {
                                return (
                                    <TableRow key={level.id}>
                                        <TableCell>{truncate(level.name, 100, '...')}</TableCell>
                                        <TableCell>{truncate(level.alias, 30, '...')}</TableCell>

                                        <TableCell>
                                            <Link className="hover:underline" href={route('#option.show', { id: level.option.id })}>
                                                {truncate(level.option.name, 100, '...')}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <Moment date={level.created_at} />
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-4">
                                                <ModalFormLevel
                                                    options={options}
                                                    option_id={level.option_id}
                                                    name={level.name}
                                                    alias={level.alias}
                                                    id={level.id}
                                                />
                                                <ActionDeleteWithPassword routeDestroy={route('#level.destroy', { id: level.id })} />

                                                <ButtonLink dimension="sm" variant="secondary" href={route('#level.show', { id: level.id })}>
                                                    <Eye size={15} />
                                                </ButtonLink>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    <Pagination paginate={levels} />
                </div>
            </div>
        </AppLayout>
    );
};

export default LevelIndex;
