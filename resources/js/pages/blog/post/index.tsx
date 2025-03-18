import { Pagination } from '@/components/ui/pagination';
import { BaseLayout } from '@/layouts/base-layout';
import { SearchInput } from '@/shared/search-input';
import { SectionHeaderPage } from '@/shared/section-page';
import { Category, PaginationData, Post } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { PostFilters } from './post-filter';
import { PostItem } from './post-item';

type PostIndexProps = { posts: PaginationData<Post>; categories: Category[] };

const PostIndex = () => {
    const { posts, categories } = usePage<PostIndexProps>().props;

    return (
        <BaseLayout>
            <Head title="Artciles" />

            <div className="container-doshed">
                <div className="container py-12">
                    <div className="container-center">
                        <SectionHeaderPage title="Artciles">
                            Découvrez les articles récents, offrant des analyses, des réflexions et des informations à jour pour enrichir vos
                            connaissances. Restez informé des dernières tendances et approfondissez vos sujets d'intérêt.
                        </SectionHeaderPage>

                        <div className="mb-6 flex items-center justify-between gap-3">
                            <SearchInput lenghtData={posts.total} urlBack={route('post.index')} />
                            <PostFilters categories={categories} />
                        </div>

                        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {posts.data.map((post) => (
                                <PostItem key={post.id} post={post} />
                            ))}
                        </div>

                        <Pagination paginate={posts} />
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};

export default PostIndex;
