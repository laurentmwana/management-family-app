import { BaseLayout } from '@/layouts/base-layout';
import { Head } from '@inertiajs/react';
import { SectionHero } from './section-hero';

const WelcomeIndex = () => {
    return (
        <BaseLayout>
            <Head title="Accueil" />
            <div className="container-doshed">
                <SectionHero />
            </div>
        </BaseLayout>
    );
};

export default WelcomeIndex;
