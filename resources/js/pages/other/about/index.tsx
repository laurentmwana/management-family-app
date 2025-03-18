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

                    <div className="">
                        <p className="mb-6 text-sm">
                            Ce projet a été réalisé dans le cadre du <strong>cours de Programmation Web 2</strong>, sous la supervision du{' '}
                            <strong>Professeur Kuyunsa Mayu</strong>. Il met en œuvre des technologies modernes pour la création d’une{' '}
                            <strong>application de gestion des familles</strong>.
                        </p>

                        <h2 className="mb-3 text-xl font-semibold">Objectif du projet</h2>
                        <p className="mb-4 text-sm">
                            L’objectif est de concevoir une plateforme permettant de gérer les relations familiales de manière intuitive et organisée.
                            Parmi les principales fonctionnalités, on retrouve :
                        </p>
                        <ul className="mb-6 list-disc pl-6 text-sm">
                            <li>Enregistrement et gestion des membres d’une famille.</li>
                            <li>Organisation des liens familiaux (parenté, fratrie, etc.).</li>
                            <li>Gestion des événements familiaux (mariages, naissances, décès).</li>
                            <li>Tableau de bord interactif pour visualiser l’arbre généalogique.</li>
                        </ul>

                        <h2 className="mb-3 text-xl font-semibold">Technologies utilisées</h2>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="container-card">
                                <h3 className="text-lg font-medium text-blue-600">Back-end</h3>
                                <p className="text-sm">Laravel (PHP) - Gestion des requêtes et accès aux données.</p>
                            </div>
                            <div className="container-card">
                                <h3 className="text-lg font-medium text-blue-600">Front-end</h3>
                                <p className="text-sm">React.js (JavaScript) - Interface utilisateur dynamique.</p>
                            </div>
                            <div className="container-card">
                                <h3 className="text-lg font-medium text-blue-600">Base de données</h3>
                                <p className="text-sm">MySQL - Stockage structuré des informations.</p>
                            </div>
                            <div className="container-card">
                                <h3 className="text-lg font-medium text-blue-600">Autres outils</h3>
                                <p className="text-sm">Eloquent ORM, Tailwind CSS, API REST, JWT (authentification).</p>
                            </div>
                        </div>

                        <h2 className="mt-6 mb-3 text-xl font-semibold">Conclusion</h2>
                        <p className="mb-6 text-sm">
                            Ce projet nous a permis de renforcer nos compétences en <strong>développement full-stack</strong>. Nous avons exploré des
                            notions avancées comme la gestion des API REST, l’authentification sécurisée et l’optimisation des bases de données.
                        </p>

                        <div className="bg-accent rounded border-l-4 border-blue-600 p-3">
                            <p className="text-sm">
                                <strong>Remerciements :</strong> Nous remercions le <strong>Professeur Kuyunsa Mayu</strong> pour son encadrement et
                                ses conseils tout au long de ce travail pratique.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};
export default AboutIndex;
