import { BaseLayout } from '@/layouts/base-layout';
import { storageSourceUrl } from '@/lib/utils';
import { BackRoute } from '@/shared/back-route';
import { Moment } from '@/shared/moment';
import type { Post, SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Calendar, Clock, User } from 'lucide-react';
import { Comments } from '../comment/comments';
import { PostCategories } from './post-categories';
import { PostMessage } from './post-message';

type PostShowProps = { post: Post };

const PostShow = () => {
    const { auth, post } = usePage<SharedData & PostShowProps>().props;

    return (
        <BaseLayout>
            <Head title={`Article - ${post.slug}`} />

            <div className="md:py-12">
                <div className="container max-w-4xl px-4 sm:px-6">
                    <BackRoute className="mb-8" />

                    {/* Article header */}
                    <header className="mb-8 space-y-6">
                        <h1 className="text-3xl leading-tight font-bold tracking-tight md:text-4xl">{post.title}</h1>

                        <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
                            <div className="flex items-center gap-1.5">
                                <Calendar size={16} className="text-primary" />
                                <Moment date={post.created_at} placeholder="Publié le" />
                            </div>

                            <div className="flex items-center gap-1.5">
                                <User size={16} className="text-primary" />
                                <span>
                                    Par <span className="text-foreground hover:text-primary font-medium transition-colors">{post.user.name}</span>
                                </span>
                            </div>

                            <div className="flex items-center gap-1.5">
                                <Clock size={16} className="text-primary" />
                                <span>Temps de lecture: {Math.ceil(post.content.length / 1000)} min</span>
                            </div>
                        </div>

                        <PostCategories categories={post.categories} />
                    </header>

                    {/* Featured image */}
                    <figure className="mb-10 overflow-hidden rounded-xl shadow-md">
                        <img
                            className="h-auto w-full object-cover transition-transform duration-500 hover:scale-105"
                            src={storageSourceUrl(post.image) || '/placeholder.svg'}
                            alt={`Image illustrant l'article: ${post.title}`}
                        />
                    </figure>

                    {/* Article content */}
                    <article className="prose prose-lg dark:prose-invert max-w-none">
                        <PostMessage message={post.content} />
                    </article>

                    {/* Author info */}
                    <div className="bg-card my-12 rounded-lg border p-6 shadow-sm">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <div className="border-primary/20 h-16 w-16 overflow-hidden rounded-full border-2">
                                <img
                                    src={post.user.avatar || `/placeholder.svg?height=64&width=64`}
                                    alt={post.user.name}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            <div className="flex-1">
                                <h3 className="text-xl font-semibold">{post.user.name}</h3>
                                <p className="text-muted-foreground"></p>
                            </div>
                        </div>
                    </div>

                    {/* Comments section */}
                    <div className="mt-12 border-t pt-8">
                        <Comments post={post} />
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};

export default PostShow;
