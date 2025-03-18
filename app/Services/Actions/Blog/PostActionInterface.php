<?php

namespace App\Services\Actions\Blog;

use App\Models\Post;

interface PostActionInterface
{
    public function createPost(array $data): Post;

    public function updatePost(array $data, Post $post): Post;

    public function deletePost(Post $post): bool;
}
