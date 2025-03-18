import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { truncate } from '@/lib/utils';
import { Card } from '@/types';
import { Link, useForm } from '@inertiajs/react';
import { Minus } from 'lucide-react';

type CardProductItemProps = { card: Card };

export const CardProductItem = ({ card }: CardProductItemProps) => {
    const { processing, delete: destroy } = useForm();

    const onDelete = (id: number) => {
        destroy(route('^card.destroy', { id }), {
            preserveScroll: true,
        });
    };

    return (
        <div className="bg-card hover:bg-muted/50 rounded-md border p-3 shadow-sm transition-colors">
            <h3 className="mb-2 line-clamp-2 text-base font-medium">
                <Link
                    className="hover:underline"
                    href={route('work-pratical.show', {
                        slug: card.work_pratical.slug,
                        id: card.work_pratical.id,
                    })}
                >
                    {truncate(card.work_pratical.title, 60, '...')}
                </Link>
            </h3>
            <div className="flex items-center justify-between gap-2">
                <Badge variant="secondary" className="px-2 py-1">
                    {card.work_pratical.price} €
                </Badge>
                <Button variant="destructive" size="icon" className="h-7 w-7" onClick={() => onDelete(card.id)} disabled={processing}>
                    <Minus size={15} />
                    <span className="sr-only">Supprimer</span>
                </Button>
            </div>
        </div>
    );
};
