import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader } from '@/components/ui/loader';
import { Link, useForm } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { FormEvent, useState } from 'react';

type SearchInputProps = { lenghtData: number; urlBack: string; urlAction?: string };

export const SearchInput = ({ lenghtData, urlBack, urlAction = '' }: SearchInputProps) => {
    const currentUrl = new URL(window.location.href);

    const queryData = currentUrl.searchParams.get('q');

    const defaultSeachState = queryData !== null && queryData.length > 0;

    const [hasSearch, setHasSearch] = useState<boolean>(defaultSeachState);

    const { get, processing, setData, data } = useForm({
        q: queryData || '',
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        get(urlAction, {
            onFinish: () => {
                setHasSearch(true);
            },
        });
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
                <form method="get" action="" className="flex items-center gap-2" onSubmit={onSubmit}>
                    <Input placeholder='Recherche...' value={data.q} onChange={(e) => setData('q', e.target.value)} />
                    <Button variant="secondary" size="sm">
                        {processing ? <Loader /> : <Search size={15} />}
                    </Button>
                </form>
            </div>

            {hasSearch && (
                <div>
                    <p className="text-muted-foreground flex items-center gap-3 text-xs">
                        <span>
                            {lenghtData} {lenghtData > 1 ? 'Résultats trouvés' : 'Résultat trouvé'} pour cette recherche.
                        </span>
                        <Link href={urlBack} className="hover:underline">
                            Réinitiliser la recherche
                        </Link>
                    </p>
                </div>
            )}
        </div>
    );
};
