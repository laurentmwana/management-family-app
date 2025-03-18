import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader } from '@/components/ui/loader';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { Pen } from 'lucide-react';
import { FormEvent } from 'react';

export const ContactForm = () => {
    const { data, post, processing, setData, errors, reset } = useForm({
        id: 0,
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('contact.send'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <div>
                <Label htmlFor="name">Nom</Label>
                <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                <InputError message={errors.name} />
            </div>

            <div>
                <Label htmlFor="email">Adresse e-amil</Label>
                <Input id="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                <InputError message={errors.email} />
            </div>

            <div>
                <Label htmlFor="subject">Sujet</Label>
                <Textarea value={data.subject} id="subject" onChange={(e) => setData('subject', e.target.value)} />
                <InputError message={errors.subject} />
            </div>

            <div>
                <Label htmlFor="message">Message</Label>
                <Textarea value={data.message} id="message" onChange={(e) => setData('message', e.target.value)} />
                <InputError message={errors.message} />
            </div>

            <div>
                <Button variant="secondary" size="sm" type="submit">
                    {processing ? <Loader /> : <Pen size={15} />}
                </Button>
            </div>
        </form>
    );
};
