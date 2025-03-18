import { Category } from '@/types';
import { Link } from '@inertiajs/react';

type PostCategoriesProps = { categories: Category[] };

export const PostCategories = ({ categories }: PostCategoriesProps) => {
    const url = new URL(window.location.href);
    const categoryId = url.searchParams.get('category') ?? null;

    return (
        <div className="mb-4">
            <div className="flex flex-wrap gap-3">
                {categories.map((category) => {
                    const hasActive = categoryId && categoryId == category.id.toString();
                    return (
                        <Link
                            key={category.id}
                            className={`hover:border-primary block rounded-sm border p-1 text-xs shadow-sm ${hasActive ? 'border-primary' : ''}`}
                            href={route('post.index', { category: category.id })}
                        >
                            {category.name}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};
