import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Moment } from '@/shared/moment';
import { Comment, Post } from '@/types';
import { User2 } from 'lucide-react';
import { useState } from 'react';
import { FormComment, FormReplyComment } from './comment-form';
import { CommentMessage } from './comment-message';
import { CommentOptionAdmin } from './comment-option';
import { ReplyComments } from './reply-comment';

type RepliesCommentsProps = { post: Post };

export const Comments = ({ post }: RepliesCommentsProps) => {
    const comments = post.comments;

    return (
        <div className="mt-12">
            <div className="mb-8">
                <h2 className="mb-3 text-xl font-semibold md:text-2xl">{`${comments.length} commentaire${comments.length > 1 ? 's' : ''}`}</h2>
                <Separator />
            </div>

            <FormComment postId={post.id} />

            <Separator className="my-5" />

            <div className="grid gap-6">
                {comments.map((comment) => (
                    <CommentItem key={comment.id} comment={comment} />
                ))}
            </div>
        </div>
    );
};

('use client');

import { Clock, MessageSquare } from 'lucide-react';

type CommentItemProps = {
    comment: Comment;
};

export const CommentItem = ({ comment }: CommentItemProps) => {
    const [showFormSecondComment, setShowFormSecondComment] = useState(false);

    return (
        <div className="group relative mb-6 last:mb-0">
            {/* Main comment container */}
            <div className="bg-card rounded-lg border p-4 shadow-sm transition-all duration-200 hover:shadow-md">
                <div className="flex items-start gap-4">
                    {/* Avatar section */}
                    <Avatar className="border-background ring-primary/10 h-10 w-10 border-2 ring-2">
                        <AvatarFallback className="bg-primary/10 text-primary">
                            <User2 size={18} />
                        </AvatarFallback>
                    </Avatar>

                    {/* Comment content */}
                    <div className="flex-1 space-y-2.5">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                            {/* User info and timestamp */}
                            <div>
                                <h3 className="text-card-foreground font-medium">{comment.username}</h3>
                                <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
                                    <Clock size={12} />
                                    <Moment date={comment.created_at} />
                                </div>
                            </div>

                            {/* Admin options */}
                            <CommentOptionAdmin comment={comment} />
                        </div>

                        {/* Comment message */}
                        <div className="bg-muted/30 rounded-md p-3">
                            <CommentMessage message={comment.message} state={comment.lock} />
                        </div>

                        {/* Reply button */}
                        <div className="flex justify-end">
                            <Button
                                onClick={() => setShowFormSecondComment(!showFormSecondComment)}
                                size="sm"
                                variant="ghost"
                                className="hover:bg-primary/10 hover:text-primary gap-1.5 text-xs"
                            >
                                <MessageSquare size={14} />
                                <span>{showFormSecondComment ? 'Annuler' : 'Répondre'}</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-3 ml-12">
                {/* Reply form */}
                {showFormSecondComment && (
                    <div className="border-primary/30 bg-muted/20 rounded-md border-l-2 p-4 transition-all">
                        <FormReplyComment commentId={comment.id} onClose={setShowFormSecondComment} />
                    </div>
                )}

                {/* Replies */}
                {comment.reply_comments.length > 0 && (
                    <div className="mt-3">
                        <ReplyComments replies={comment.reply_comments} />
                    </div>
                )}
            </div>
        </div>
    );
};
