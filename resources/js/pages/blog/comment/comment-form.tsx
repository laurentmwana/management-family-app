import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader } from '@/components/ui/loader';
import { Textarea } from '@/components/ui/textarea';
import { SharedData } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { FormEvent } from 'react';

type FormComment = { postId: number };
export const FormComment = ({ postId }: FormComment) => {
    const { auth } = usePage<SharedData>().props;

    const { processing, data, setData, post, errors, reset } = useForm({
        username: auth.user ? auth.user.name : '',
        message: '',
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('comment.create', { postId }), {
            preserveScroll: true,
            onSuccess: () => {
                reset('username', 'message');
            },
        });
    };

    return (
        <form onSubmit={onSubmit} className="space-y-5">
            <div>
                <Label>Nom d'utilisateur</Label>
                <Input disabled={auth.user !== null} value={data.username} onChange={(e) => setData('username', e.target.value)} />
                <InputError message={errors.username} className="mt-2" />
            </div>
            <div>
                <Label>Message</Label>

                <Textarea value={data.message} onChange={(e) => setData('message', e.target.value)} autoHeight={true} />
                <InputError message={errors.message} className="mt-2" />
            </div>
            <Button type="submit" size="sm" variant="outline">
                {processing ? <Loader /> : 'Répondre'}
            </Button>
        </form>
    );
};

type FormReplyComment = { commentId: number; onClose: (v: boolean) => void };

export const FormReplyComment = ({ commentId, onClose }: FormReplyComment) => {
    const { auth } = usePage<SharedData>().props;

    const { processing, data, setData, post, errors, reset } = useForm({
        username: auth.user ? auth.user.name : '',
        message: '',
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('reply-comment.create', { commentId }), {
            preserveScroll: true,
            onSuccess: () => {
                reset('username', 'message');
            },
        });
    };

    return (
        <form onSubmit={onSubmit} className="space-y-5">
            <div>
                <Label>Nom d'utilisateur</Label>
                <Input disabled={auth.user !== null} value={data.username} onChange={(e) => setData('username', e.target.value)} />
                <InputError message={errors.username} className="mt-2" />
            </div>
            <div>
                <Label>Message</Label>

                <Textarea value={data.message} onChange={(e) => setData('message', e.target.value)} autoHeight={true} />
                <InputError message={errors.message} className="mt-2" />
            </div>
            <div className="flex items-center gap-3">
                <Button type="submit" size="sm" variant="outline">
                    {processing ? <Loader /> : 'Répondre'}
                </Button>

                <Button size="sm" onClick={() => onClose(false)} variant="secondary">
                    Annuler
                </Button>
            </div>
        </form>
    );
};
