import { Comment, ReplyComment, SharedData } from '@/types';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { isAdmin } from '@/lib/auth';
import { router, usePage } from '@inertiajs/react';
import { Lock, MoreHorizontal, Unlock } from 'lucide-react';

type CommentOptionPros = { type: 'reply' | 'comment'; routeAction: string; state: boolean };

const CommentOption = ({ type, routeAction, state }: CommentOptionPros) => {
    const { auth } = usePage<SharedData>().props;

    return auth.user && isAdmin(auth.user.role) ? (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="px-2">
                    <MoreHorizontal size={15} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="max-h-[400px] overflow-y-auto">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                    onClick={() =>
                        router.put(routeAction, undefined, {
                            preserveScroll: true,
                        })
                    }
                    title="bloqué ce commentaire"
                    disabled={state}
                    className={`cursor-pointer ${state === false ? 'bg-accent' : ''}`}
                >
                    <span className="flex items-center gap-2">
                        <Lock className="text-destructive" size={15} />
                        <span>Bloquer</span>
                    </span>
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={() =>
                        router.put(routeAction, undefined, {
                            preserveScroll: true,
                        })
                    }
                    title="est débloqué"
                    disabled={!state}
                    className={`cursor-pointer ${state === true ? 'bg-accent' : ''}`}
                >
                    <span className="flex items-center gap-2">
                        <Unlock className="text-green-500" size={15} />
                        <span>Débloquer</span>
                    </span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    ) : (
        <></>
    );
};

export const ReplyCommentOptionAdmin = ({ reply }: { reply: ReplyComment }) => {
    return <CommentOption type="reply" state={reply.lock} routeAction={route('reply-comment.change-status', { replyCommentId: reply.id })} />;
};
export const CommentOptionAdmin = ({ comment }: { comment: Comment }) => {
    return <CommentOption state={comment.lock} type="comment" routeAction={route('comment.change-status', { commentId: comment.id })} />;
};
