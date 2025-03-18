import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader } from '@/components/ui/loader';
import { SelectSingle } from '@/components/ui/select-single';
import { FormatterObject } from '@/types';
import { useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';
import { FormEvent } from 'react';

type BuyerFormProps = { levels: FormatterObject[]; years: FormatterObject[]; mobiles: FormatterObject[]; genders: FormatterObject[] };

export const BuyerForm = ({ levels, years, mobiles, genders }: BuyerFormProps) => {
    const { post, data, setData, errors, processing } = useForm({
        full_name: '',
        gender: '',
        email: '',
        phone: '',
        level_id: 0,
        year_academic_id: 0,
        network: '',
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('checkout.create'));
    };

    return (
        <form onSubmit={onSubmit} className="grid gap-4 py-4">
            <h2 className="text-base font-semibold">Mobile Money</h2>
            <div className="grid gap-1">
                <Label htmlFor="network">Réseau</Label>
                <SelectSingle
                    value={data.network}
                    placeholder="Selectionner un réseau"
                    onChange={(optionId) => setData('network', optionId)}
                    options={mobiles.map((c) => {
                        return {
                            label: c.name,
                            value: c.id,
                        };
                    })}
                />
                <InputError message={errors.network} />
            </div>

            <h2 className="text-base font-semibold">Informations de l'étudiant</h2>
            <div className="grid gap-2">
                <Label htmlFor="full_name">Nom Complet</Label>
                <Input
                    placeholder="Ps: Mutombo Mukendi David"
                    id="full_name"
                    value={data.full_name}
                    onChange={(e) => setData('full_name', e.target.value)}
                />
                <InputError message={errors.full_name} />
            </div>

            <div className="grid gap-1">
                <Label htmlFor="gender">Genre</Label>
                <SelectSingle
                    value={data.gender}
                    placeholder="Selectionner un genre"
                    onChange={(optionId) => setData('gender', optionId)}
                    options={genders.map((c) => {
                        return {
                            label: c.name,
                            value: c.id,
                        };
                    })}
                />
                <InputError message={errors.gender} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="email">Adresse e-mail</Label>
                <Input placeholder="Ps: davina@gmail.com" id="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                <InputError message={errors.email} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input placeholder="Ps: 0820145975" id="phone" value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
                <InputError message={errors.phone} />
            </div>

            <div className="grid gap-1">
                <Label htmlFor="level_id">Promotion</Label>
                <SelectSingle
                    value={data.level_id.toString()}
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
                    value={data.year_academic_id.toString()}
                    placeholder="Selectionner votre année académique"
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

            <div>
                <Button variant="outline" size="sm" type="submit">
                    {processing ? (
                        <div className="flex gap-2">
                            <Loader size={16} />
                        </div>
                    ) : (
                        <Save size={15} />
                    )}
                </Button>
            </div>
        </form>
    );
};
