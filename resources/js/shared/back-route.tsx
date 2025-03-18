import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

type BackRouteProps = { url?: string; className?: string };

export const BackRoute = ({ url, className = '' }: BackRouteProps) => {
    const classNameButtonAction = 'border-primary rounded-md border py-2 px-3 text-xs shadow cursor-pointer transition-all hover:border-gray-400';
    return (
        <div className={cn('mb-6', className)}>
            {url ? (
                <Link className={classNameButtonAction} href={url}>
                    Retour
                </Link>
            ) : (
                <button className={classNameButtonAction} onClick={() => window.history.back()}>
                    Retour
                </button>
            )}
        </div>
    );
};
