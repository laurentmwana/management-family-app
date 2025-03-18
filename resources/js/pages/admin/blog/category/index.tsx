import { ActionDeleteWithPassword } from '@/components/action-with-password';
import { Badge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button-link';
import { Pagination } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { truncate } from '@/lib/utils';
import { Moment } from '@/shared/moment';
import { SearchInput } from '@/shared/search-input';
import { Category, PaginationData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Eye } from 'lucide-react';
import { ModalFormCategory } from './modal-form';

type CategoryIndexProps = { categories: PaginationData<Category> };

const CategoryIndex = () => {
    const { categories } = usePage<CategoryIndexProps>().props;

    return (
        <AppLayout>
            <Head title="Categories" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container-card">
                    <h2 className="text-base font-semibold">Liste des categories</h2>
                    <div className="my-5 flex items-center justify-between">
                        <SearchInput lenghtData={categories.total} urlBack={route('#category.index')} />
                        <ModalFormCategory name="" id={null} />
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nom</TableHead>
                                <TableHead>Articles</TableHead>
                                <TableHead>Créer</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.data.map((category) => {
                                return (
                                    <TableRow key={category.id}>
                                        <TableCell>{truncate(category.name, 100, '...')}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{category.posts.length}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Moment date={category.created_at} />
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex items-center gap-4">
                                                <ModalFormCategory name={category.name} id={category.id} />

                                                <ActionDeleteWithPassword routeDestroy={route('#category.destroy', { id: category.id })} />

                                                <ButtonLink dimension="sm" variant="secondary" href={route('#category.show', { id: category.id })}>
                                                    <Eye size={15} />
                                                </ButtonLink>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    <Pagination paginate={categories} />
                </div>
            </div>
        </AppLayout>
    );
};

export default CategoryIndex;
