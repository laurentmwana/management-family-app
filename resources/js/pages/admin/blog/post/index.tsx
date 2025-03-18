import { ActionDeleteWithPassword } from '@/components/action-with-password';
import { Badge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button-link';
import { Pagination } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { truncate } from '@/lib/utils';
import { Moment } from '@/shared/moment';
import { SearchInput } from '@/shared/search-input';
import { FormatterObject, PaginationData, Post, SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Eye } from 'lucide-react';
import { ModalFormPost } from './modal-form';

type PostIndexProps = { posts: PaginationData<Post>; categories: FormatterObject[] } & SharedData;

const PostIndex = () => {
    const { posts, categories, auth } = usePage<PostIndexProps>().props;

    return (
        <AppLayout>
            <Head title="Articles" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container-card">
                    <h2 className="text-base font-semibold">Liste des articles</h2>
                    <div className="my-5 flex items-center justify-between">
                        <SearchInput lenghtData={posts.total} urlBack={route('#post.index')} />
                        <ModalFormPost categoriesItems={categories} title="" content="" categoriesId={[]} id={null} />
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Titre</TableHead>
                                <TableHead>Auteur</TableHead>
                                <TableHead>Categories</TableHead>
                                <TableHead>Commentaires</TableHead>
                                <TableHead>Créer</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {posts.data.map((post) => {
                                return (
                                    <TableRow key={post.id}>
                                        <TableCell>{truncate(post.title, 40, '...')}</TableCell>
                                        <TableCell>{truncate(`${post.user.name}`, 20, '...')}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{post.categories.length}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{post.comments.length}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Moment date={post.created_at} />
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex items-center gap-4">
                                                <ModalFormPost
                                                    categoriesItems={categories}
                                                    title={post.title}
                                                    content={post.content}
                                                    categoriesId={post.categories.map((c) => c.id)}
                                                    id={post.id}
                                                />

                                                <ActionDeleteWithPassword routeDestroy={route('#post.destroy', { id: post.id })} />

                                                <ButtonLink dimension="sm" variant="secondary" href={route('#post.show', { id: post.id })}>
                                                    <Eye size={15} />
                                                </ButtonLink>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    <Pagination paginate={posts} />
                </div>
            </div>
        </AppLayout>
    );
};

export default PostIndex;
