import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ButtonLink } from '@/components/ui/button-link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { storageSourceUrl, truncate } from '@/lib/utils';
import { Moment } from '@/shared/moment';
import type { Post } from '@/types';
import { Link } from '@inertiajs/react';
import { ArrowRight, Calendar, MessageCircle, Tag } from 'lucide-react';

type PostItemProps = { post: Post };

export const PostItem = ({ post }: PostItemProps) => {
    const excerpt = post.content.length > 100 ? post.content.substring(0, 100) + '...' : post.content;

    // Get user initials for avatar fallback
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((part) => part[0])
            .join('')
            .toUpperCase();
    };

    return (
        <Card className="border-border/40 hover:border-border/80 group w-full max-w-2xl overflow-hidden border transition-all duration-300">
            {/* Image Section */}
            <div className="relative h-56 w-full overflow-hidden">
                <img
                    src={storageSourceUrl(post.image) || '/placeholder.svg'}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Categories Overlay */}
                <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="flex flex-wrap gap-1.5">
                        {post.categories.map((category) => (
                            <Badge
                                key={category.id}
                                variant="secondary"
                                className="bg-primary/90 text-primary-foreground hover:bg-primary text-xs font-medium"
                            >
                                {category.name}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>

            <CardHeader className="space-y-3 pt-5 pb-2">
                {/* Post Metadata */}
                <div className="text-muted-foreground flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        <Moment date={post.created_at} />
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1.5">
                        <MessageCircle className="h-3.5 w-3.5" />
                        <span>{post.comments.length} comments</span>
                    </div>
                </div>

                {/* Post Title */}
                <h2 className="text-2xl leading-tight font-bold tracking-tight">
                    <Link href={route('post.show', { slug: post.slug, id: post.id })} className="hover:text-primary inline-block transition-colors">
                        {truncate(post.title, 80, '...')}
                    </Link>
                </h2>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Post Excerpt */}
                <p className="text-muted-foreground leading-relaxed">{excerpt}</p>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-2">
                    <Avatar className="border-background h-10 w-10 border-2 shadow-sm">
                        <AvatarImage src={post.user.avatar} alt={post.user.name} />
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">{getInitials(post.user.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-medium">{post.user.name}</div>
                        <div className="text-muted-foreground text-xs">
                            <Moment placeholder="Modifié" date={post.updated_at} />
                        </div>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between border-t py-4">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-1.5 px-2">
                    <Tag className="h-3.5 w-3.5" />
                    <span className="text-xs">{post.categories.length} categories</span>
                </Button>

                <ButtonLink
                    href={route('post.show', { slug: post.slug, id: post.id })}
                    variant="outline"
                    dimension="sm"
                    className="hover:bg-primary/5 hover:text-primary gap-1.5 transition-colors"
                >
                    <span>Voir la suite</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                </ButtonLink>
            </CardFooter>
        </Card>
    );
};
