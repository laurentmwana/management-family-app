import { BaseLayout } from '@/layouts/base-layout';
import { Payment } from '@/types';
import { Head } from '@inertiajs/react';

type PaymentSuccessProps = { payment: Payment };

const PaymentSuccess = ({ payment }: PaymentSuccessProps) => {
    return (
        <BaseLayout>
            <Head title="Paiement confirmé" />

            <div className="container-doshed">
                <div className="container py-12">
                    <div className="container-center">
                        <div className="container-card max-w-xl">
                            <h2 className="mb-4 text-xl font-semibold">Paiement confirmé</h2>
                            <p className="text-base">
                                Votre paiement pour acheter les travaux pratiques a été effectué. Nous vous avons envoyé un lien de téléchargement à
                                l'adresse e-mail <strong>{payment.buyer.email}</strong>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};

export default PaymentSuccess;
