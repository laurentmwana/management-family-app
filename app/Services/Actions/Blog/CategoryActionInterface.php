<?php

namespace App\Services\Actions\Blog;

use App\Models\Category;

interface CategoryActionInterface
{
    public function createCategory(array $data): Category;

    public function updateCategory(array $data, Category $category): Category;

    public function deleteCategory(Category $category): bool;
}
