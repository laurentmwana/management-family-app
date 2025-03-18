import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BaseLayout } from '@/layouts/base-layout';
import { SectionHeaderPage } from '@/shared/section-page';
import { FormatterObject, Payment } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { LevelForm } from './level-form';
import { PaidAction } from './paid-action';

const title = 'Paiement';

type PaidIndexProps = { mobiles: FormatterObject[]; levels: FormatterObject[]; years: FormatterObject[]; payment: Payment };

const PaidIndex = () => {
    const { mobiles, levels, years, payment } = usePage<PaidIndexProps>().props;

    return (
        <BaseLayout>
            <Head title={title} />

            <div className="container py-12">
                <div className="container-center">
                    <SectionHeaderPage title={title}>
                        Vous avez un problème technique ? Vous souhaitez envoyer des commentaires sur une fonctionnalité bêta ? Besoin de détails sur
                        notre plan Business ? Faites le nous savoir.
                    </SectionHeaderPage>

                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <div className="container-card mb-4">
                                <div className="mb-2">
                                    <Badge variant="outline">étudiant</Badge>
                                </div>
                                <h2 className="mb-3 text-xl font-semibold">{payment.student.full_name}</h2>
                                <Separator className="my-4" />
                                <div>
                                    <p className="mb-2 text-sm">Année académique : {payment.year_academic?.name}</p>

                                    <p className="mb-2 text-sm">Promotion : {payment.level?.name}</p>
                                </div>
                                <Separator className="my-4" />
                                <div>
                                    <p className="mb-3 text-sm">
                                        Travail pratique :{' '}
                                        <Link
                                            href={route('work-pratical.show', { id: payment.work_pratical_id, slug: payment.work_pratical.slug })}
                                            className="hover:underline"
                                        >
                                            {payment.work_pratical.title}
                                        </Link>
                                    </p>
                                    <p className="mb-3 text-sm">Status : {payment.status}</p>
                                    <p className="mb-3 text-sm">Montant : {payment.amount} $</p>
                                </div>
                            </div>

                            <PaidAction payment={payment} />
                        </div>
                        <div className="lg:col-span-1">
                            <div className="container-card">
                                <h2 className="mb-3 text-xl font-semibold">Informations supplémentaire</h2>

                                <LevelForm
                                    level_id={payment.level_id}
                                    year_academic_id={payment.year_academic_id}
                                    mobile_money_name={payment.mobile_money_name}
                                    years={years}
                                    levels={levels}
                                    mobiles={mobiles}
                                    payment_id={payment.id}
                                    status={payment.status}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};
export default PaidIndex;
