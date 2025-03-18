import { NetworkSocial } from '@/shared/network-social';
import { Phone } from 'lucide-react';

export const ContactInfo = () => {
    return (
        <div className="space-y-4">
            {/* <div className="container-card">
                <h2 className="mb-1 text-base font-semibold text-gray-700 dark:text-gray-100">Notre adresse</h2>
                <p className="text-description mb-2">Nous sommes sur l'avenue Mbanza boma 38 bandalungwa Centre Likemo</p>
                <p className="text-description">[foyer social de bandalungwa ref: Ecole AngoAngo, Pima bar , Banque de sang].</p>
            </div> */}
            <div className="container-card">
                <h2 className="mb-1 text-base font-semibold text-gray-700 dark:text-gray-100">Nos coordonnées</h2>
                <p className="text-description mb-2 flex items-center gap-2">
                    <Phone size={15} />
                    <span>+243829760292</span>
                </p>
                <p className="text-description mb-2 flex items-center gap-2">
                    <Phone size={15} />
                    <span>+243810061785</span>
                </p>
            </div>
            <div className="container-card">
                <h2 className="mb-2 text-base font-semibold text-gray-700 dark:text-gray-100">Réseaux sociaux</h2>

                <NetworkSocial />
            </div>
        </div>
    );
};
