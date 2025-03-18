import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader } from '@/components/ui/loader';
import { SelectSingle } from '@/components/ui/select-single';
import { PAYMENT_STATE } from '@/lib/enum';
import { FormatterObject } from '@/types';
import { useForm } from '@inertiajs/react';
import { Pen } from 'lucide-react';
import { FormEvent } from 'react';

type UseFormProps = {
    level_id: number | null;
    year_academic_id: number | null;
    payment_id: number;
    mobile_money_name: string;
};

type LevelFormProps = { levels: FormatterObject[]; years: FormatterObject[]; mobiles: FormatterObject[]; status: string } & UseFormProps;

export const LevelForm = ({ payment_id, levels, years, level_id, year_academic_id, mobile_money_name, mobiles, status }: LevelFormProps) => {
    const { data, put, processing, setData, errors, reset } = useForm<UseFormProps>({
        payment_id: 0,
        level_id,
        year_academic_id,
        mobile_money_name,
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        put(route('paid.complete', { id: payment_id }), {
            onSuccess: () => reset(),
        });
    };

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid gap-1">
                <Label htmlFor="mobile_money_name">Mobile Money</Label>
                <SelectSingle
                    value={data.mobile_money_name}
                    placeholder="Selectionner une promotion"
                    onChange={(optionId) => setData('mobile_money_name', optionId)}
                    options={mobiles.map((c) => {
                        return {
                            label: c.name,
                            value: c.id,
                        };
                    })}
                />
                <InputError message={errors.mobile_money_name} />
            </div>

            <div className="grid gap-1">
                <Label htmlFor="level_id">Promotion</Label>
                <SelectSingle
                    value={data.level_id?.toString()}
                    placeholder="Selectionner une promotion"
                    onChange={(optionId) => setData('level_id', parseInt(optionId))}
                    options={levels.map((c) => {
                        return {
                            label: c.name,
                            value: c.id,
                        };
                    })}
                />
                <InputError message={errors.level_id} />
            </div>
            <div className="grid gap-1">
                <Label htmlFor="year_academic_id">Année académique</Label>
                <SelectSingle
                    value={data.year_academic_id?.toString()}
                    placeholder="Selectionner une année académique"
                    onChange={(optionId) => setData('year_academic_id', parseInt(optionId))}
                    options={years.map((c) => {
                        return {
                            label: c.name,
                            value: c.id,
                        };
                    })}
                />
                <InputError message={errors.year_academic_id} />
            </div>

            {status === PAYMENT_STATE.success ? null : (
                <div>
                    <Button variant="secondary" size="sm" type="submit">
                        {processing ? <Loader /> : <Pen size={15} />}
                    </Button>
                </div>
            )}
        </form>
    );
};
