import { Payment } from '@/types';

import { ActionWithPassword } from '@/components/action-with-password';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { PAYMENT_STATE } from '@/lib/enum';
import { CheckCheck, LucideShoppingCart } from 'lucide-react';

type PaidActionProps = { payment: Payment };

export const PaidAction = ({ payment }: PaidActionProps) => {
    const isSuccess = payment.status === PAYMENT_STATE.success;

    const isWritable = payment.year_academic_id !== null && payment.level_id !== null;

    return isWritable ? (
        <ActionWithPassword
            preserveScroll={false}
            routeAction={route('paid.success', { id: payment.id })}
            trigger={
                <Button size="sm" disabled={isSuccess} variant="secondary">
                    {isSuccess ? (
                        <>
                            <CheckCheck className="text-green-400" size={15} />
                            <span className="text-green-400">Acheté</span>
                        </>
                    ) : (
                        <>
                            <LucideShoppingCart size={15} />
                            Acheter
                        </>
                    )}
                </Button>
            }
        />
    ) : (
        <Alert variant="destructive">
            <AlertDescription>Vous devez indiquer votre année académique et votre promotion.</AlertDescription>
        </Alert>
    );
};
