import { BaseLayout } from '@/layouts/base-layout';
import { SectionHeaderPage } from '@/shared/section-page';
import { Head } from '@inertiajs/react';

const title = 'A propos de nous';

const AboutIndex = () => {
    return (
        <BaseLayout>
            <Head title={title} />

            <div className="container py-12">
                <div className="container-center">
                    <SectionHeaderPage title={title} />
                    <div className="space-y-4">
                        <p className="text-sm text-gray-700 dark:text-gray-200">
                            Notre mission est de fournir des ressources pédagogiques de qualité pour accompagner chaque étudiant dans son parcours
                            académique. Nous mettons à votre disposition des syllabus, des travaux pratiques, ainsi que des articles récents afin de
                            faciliter votre apprentissage et enrichir vos connaissances.
                        </p>

                        <p className="text-sm text-gray-700 dark:text-gray-200">
                            Cette plateforme a été conçue pour offrir un accès facile et gratuit à des supports éducatifs essentiels, tout en
                            favorisant un esprit collaboratif. Nous encourageons chaque étudiant à partager ses ressources pour créer une communauté
                            d’apprentissage dynamique et solidaire.
                        </p>

                        <p className="text-sm text-gray-700 dark:text-gray-200">
                            Rejoignez-nous et profitez d’un environnement digital conçu pour soutenir votre réussite académique à l’ISP Gombé !
                        </p>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};
export default AboutIndex;
