import { BaseLayout } from '@/layouts/base-layout';
import { SectionHeaderPage } from '@/shared/section-page';
import { Head } from '@inertiajs/react';

const title = 'Ma famille';

const AboutIndex = () => {
    return (
        <BaseLayout>
            <Head title={title} />

            <div className="container py-12">
                <div className="container-center">
                    <SectionHeaderPage title={title} />
                </div>
            </div>
        </BaseLayout>
    );
};
export default AboutIndex;
