import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Category } from '@/types';
import { router } from '@inertiajs/react';
import { Filter } from 'lucide-react';

type PostFiltersProps = { categories: Category[] };

export const PostFilters = ({ categories }: PostFiltersProps) => {
    const url = new URL(window.location.href);
    const categoryId = url.searchParams.get('category') ?? null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                    <Filter size={15} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="max-h-[400px] overflow-y-auto">
                <DropdownMenuLabel>Liste des categories</DropdownMenuLabel>
                {categories.map((category) => {
                    const hasActive = categoryId && categoryId == category.id.toString();

                    return (
                        <DropdownMenuItem
                            className={`cursor-pointer ${hasActive ? 'bg-accent' : ''}`}
                            key={category.id}
                            onClick={() => router.get(route('post.index', { category: category.id }))}
                        >
                            <span className="flex items-center gap-2">
                                {category.name} ({category.posts.length})
                            </span>
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
