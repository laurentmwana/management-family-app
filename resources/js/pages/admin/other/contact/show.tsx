import { ActionDeleteWithPassword } from '@/components/action-with-password';
import AppLayout from '@/layouts/app-layout';
import { Contact, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Message de contact',
        href: route('#contact.index'),
    },
    {
        title: 'En savoir plus sur un messsage de contact',
        href: '',
    },
];

type ContactShowProps = { contact: Contact };

const ContactShow = () => {
    const { contact } = usePage<ContactShowProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container-card">
                    <div className="flex items-center justify-between gap-5">
                        <h2 className="text-base font-semibold">
                            {contact.name}
                        </h2>
                        <ActionDeleteWithPassword routeDestroy={route('#contact.destroy', { id: contact.id })} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default ContactShow;
