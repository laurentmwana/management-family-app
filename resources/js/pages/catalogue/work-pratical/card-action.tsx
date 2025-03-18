import { useForm } from '@inertiajs/react';
import { Download } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/loader';
import type { WorkPratical } from '@/types';

type CardActionProps = {
    workPratical: WorkPratical;
};

export const CardAction = ({ workPratical }: CardActionProps) => {
    const { post, processing } = useForm();

    const onSubmit = () => {
        post(route('paid.create', { id: workPratical.id }), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <Button size="sm" variant="secondary" onClick={onSubmit} disabled={processing} className="gap-2">
            {processing ? (
                <Loader variant="dual-ring" className="h-4 w-4" />
            ) : (
                <>
                    <Download size={15} />
                    <span className="hidden sm:inline">Técharger</span>
                </>
            )}
        </Button>
    );
};
