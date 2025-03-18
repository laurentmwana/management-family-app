import { BaseLayout } from '@/layouts/base-layout';
import { SectionHeaderPage } from '@/shared/section-page';
import { Head } from '@inertiajs/react';
import { ContactForm } from './contact-form';
import { ContactInfo } from './contact-info';

const title = 'Nous contacter';

const ContactIndex = () => {
    return (
        <BaseLayout>
            <Head title={title} />

            <div className="container py-12">
                <div className="container-center">
                    <SectionHeaderPage title={title}>
                        Vous avez un problème technique ? Vous souhaitez envoyer des commentaires sur une fonctionnalité bêta ?  Faites le nous savoir.
                    </SectionHeaderPage>

                    <div className="max-w-3xl">
                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                            <div>
                                <ContactInfo />
                            </div>
                            <div className="col-span-2">
                                <div className="container-card">
                                    <ContactForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};
export default ContactIndex;
