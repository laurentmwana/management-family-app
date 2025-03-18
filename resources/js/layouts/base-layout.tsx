import { NavbarBase } from '@/components/nav-base';
import { NetworkSocial } from '@/shared/network-social';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export const BaseLayout = ({ children }: PropsWithChildren) => {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <NavbarBase />

            <main>{children}</main>

            <div className="container pt-[100px]">
                <footer className="py-8" id="footer">
                    <div className="container-center">
                        <div className="container-center grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-100">ISP Resource</h2>
                                <p className="text-description mb-4">
                                    Cette plateforme a été conçue pour offrir un accès facile et gratuit à des supports éducatifs essentiels, tout en
                                    favorisant un esprit collaboratif. Nous encourageons chaque étudiant à partager ses ressources pour créer une
                                    communauté d’apprentissage dynamique et solidaire.
                                </p>

                                <NetworkSocial />
                            </div>
                            <div className="flex md:justify-end">
                                <div>
                                    <h2 className="mb-4 text-xl font-semibold">Nous contacter</h2>
                                    <ul className="space-y-2">
                                        <li>
                                            <Link href={route('contact.index')} className="flex gap-x-2 hover:underline">
                                                <i className="bi bi-envelope text-blue-500 hover:text-blue-600"></i>
                                                <span className="text-muted-foreground">Par e-mail</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <a
                                                href="https://api.whatsapp.com/send/?phone=243829760292&text&type=phone_number&app_absent=0"
                                                className="flex gap-x-2 hover:underline"
                                            >
                                                <i className="bi bi-whatsapp text-green-500 hover:text-green-600"></i>
                                                <span className="text-muted-foreground">Par Whatsapp</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="mt-8 text-center text-sm text-gray-600">&copy; ISP Resource {new Date().getFullYear()}</p>
                </footer>
            </div>
        </>
    );
};
