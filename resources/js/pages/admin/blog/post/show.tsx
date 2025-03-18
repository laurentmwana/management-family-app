import AppLayout from '@/layouts/app-layout';
import { FormatterObject, Post, SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { ModalFormPost } from './modal-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Articles',
        href: route('#post.index'),
    },
    {
        title: 'En savoir plus sur un article',
        href: '',
    },
];

type PostShowProps = { post: Post; categories: FormatterObject[] } & SharedData;

const PostShow = () => {
    const { post, auth, categories } = usePage<PostShowProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container-card">
                    <div className="flex items-center justify-between gap-5">
                        <h2 className="text-base font-semibold">{post.title}</h2>
                        <ModalFormPost
                            categoriesItems={categories}
                            title={post.title}
                            content={post.content}
                            categoriesId={post.categories.map((c) => c.id)}
                            id={post.id}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default PostShow;
