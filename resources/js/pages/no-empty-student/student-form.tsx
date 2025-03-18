import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader } from '@/components/ui/loader';
import { SelectSingle } from '@/components/ui/select-single';
import { FormatterObject } from '@/types';
import { useForm } from '@inertiajs/react';
import { Pen } from 'lucide-react';
import { FormEvent } from 'react';

type StudentFormProps = { genders: FormatterObject[] };

export const StudentForm = ({ genders }: StudentFormProps) => {
    const { data, post, processing, setData, errors, reset } = useForm({
        full_name: '',
        phone: '',
        gender: '',
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('no-empty-student.complete'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <div>
                <Label htmlFor="full_name">Nom complet</Label>
                <Input id="full_name" value={data.full_name} onChange={(e) => setData('full_name', e.target.value)} />
                <InputError message={errors.full_name} />
            </div>

            <div>
                <Label htmlFor="phone">Numéro de téléphone</Label>
                <Input id="phone" value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
                <InputError message={errors.phone} />
            </div>

            <div className="grid gap-1">
                <Label htmlFor="gender">Genre</Label>
                <SelectSingle
                    value={data.gender}
                    placeholder="Selectionner le genre"
                    onChange={(genderId) => setData('gender', genderId)}
                    options={genders.map((c) => {
                        return {
                            label: c.name,
                            value: c.id,
                        };
                    })}
                />
                <InputError message={errors.gender} />
            </div>

            <div>
                <Button variant="secondary" size="sm" type="submit">
                    {processing ? <Loader /> : <Pen size={15} />}
                </Button>
            </div>
        </form>
    );
    return <></>;
};
