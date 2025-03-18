import { BaseLayout } from '@/layouts/base-layout';
import { SectionHeaderPage } from '@/shared/section-page';
import { Card, FormatterObject } from '@/types';
import { Head } from '@inertiajs/react';
import { BuyerForm } from './buyer-form';
import { CardProductItem } from './card-product';
import { TotalPay } from './total-pay';

type BuyerNewProps = { cards: Card[]; levels: FormatterObject[]; years: FormatterObject[], mobiles: FormatterObject[], genders: FormatterObject[] };

const BuyerNew = ({ cards, years, levels,mobiles, genders }: BuyerNewProps) => {
    return (
        <BaseLayout>
            <Head title="Paiement" />

            <div className="container-doshed">
                <div className="container py-12">
                    <div className="container-center">
                        <SectionHeaderPage title="Payer">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus facilis totam sequi nostrum, optio, at ullam, laborum.
                        </SectionHeaderPage>

                        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-3">
                            <div className="lg:col-span-1">
                                <h2 className="mb-3 text-base font-semibold">Travaux pratiques dans le panier</h2>
                                <div className="grid gap-3">
                                    {cards.map((c) => (
                                        <CardProductItem key={c.id} card={c} />
                                    ))}

                                    <TotalPay cards={cards} />
                                </div>
                            </div>
                            <div className="lg:col-span-2">
                                <div className="container-card">

                                    <BuyerForm genders={genders} mobiles={mobiles} levels={levels} years={years} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};

export default BuyerNew;
