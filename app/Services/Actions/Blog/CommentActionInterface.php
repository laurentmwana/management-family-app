<?php

namespace App\Services\Actions\Blog;

use App\Models\Comment;
use App\Models\ReplyComment;

interface CommentActionInterface
{
    public function changeStatusComment(Comment $comment): bool;

    public function changeStatusReplyComment(ReplyComment $replyComment): bool;

    public function createComment(array $data): bool;

    public function createReplyComment(array $data): bool;
}
