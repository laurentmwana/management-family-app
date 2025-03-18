'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Moment } from '@/shared/moment';
import type { ReplyComment } from '@/types';
import { User2 } from 'lucide-react';
import { CommentMessage } from './comment-message';
import { ReplyCommentOptionAdmin } from './comment-option';

type ReplyCommentsProps = {
    replies: ReplyComment[];
};

export const ReplyComments = ({ replies }: ReplyCommentsProps) => {
    return (
        <div className="border-primary/20 space-y-3 border-l pt-1 pb-1 pl-4">
            {replies.map((reply) => (
                <div key={reply.id} className="bg-card/80 rounded-md border p-3 shadow-sm transition-all hover:shadow-md">
                    <div className="mb-2 flex items-start gap-3">
                        <Avatar className="border-background h-8 w-8 border">
                            <AvatarFallback className="bg-secondary/10 text-secondary">
                                <User2 size={16} />
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                            <div className="flex flex-wrap items-start justify-between gap-2">
                                <div>
                                    <h3 className="text-card-foreground text-sm font-medium">{reply.username}</h3>
                                    <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
                                        <Moment date={reply.created_at} />
                                    </div>
                                </div>

                                <ReplyCommentOptionAdmin reply={reply} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-muted/30 ml-11 rounded-md p-2.5">
                        <CommentMessage message={reply.message} state={reply.lock} />
                    </div>
                </div>
            ))}
        </div>
    );
};
