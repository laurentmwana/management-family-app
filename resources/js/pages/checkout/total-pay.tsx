import { Card } from '@/types';

type TotalPayProps = { cards: Card[] };

export const TotalPay = ({ cards }: TotalPayProps) => {
    let prices = 0;

    cards.forEach((c) => {
        prices += c.work_pratical.price;
    });

    return <div className="rounded-md border p-3 text-base font-semibold shadow-sm">Total : {prices} $</div>;
};
