import { ButtonLink } from "@/components/ui/button-link";
import { Head } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import { SectionHeaderPage } from '@/shared/section-page';


type ServerStatus = {
    status: number;
    title: string;
    description: string;
};

const serverStatuses: Record<number, ServerStatus> = {
    500: {
        status: 500,
        title: "Erreur interne du serveur",
        description:
            "Une erreur inattendue est survenue. Veuillez réessayer plus tard.",
    },
    503: {
        status: 503,
        title: "Service indisponible",
        description:
            "Le service est temporairement indisponible. Veuillez réessayer plus tard.",
    },
    404: {
        status: 404,
        title: "Page non trouvée",
        description:
            "La page que vous recherchez n'existe pas ou a été déplacée.",
    },
    403: {
        status: 403,
        title: "Accès interdit",
        description:
            "Vous n'avez pas l'autorisation d'accéder à cette ressource.",
    },
};

type ErrorProps = { status: number; message: string };

const Error = ({ status, message }: ErrorProps) => {
    const { description, title } = serverStatuses[status];

    return (
        <div className="container py-16">
            <Head title={title} />
            <div className="container-center">

                <SectionHeaderPage title={title}>
                  {description}
                </SectionHeaderPage>

                <div className="container-card mb-4">
                    <p className="text-description mb-2">{message}</p>
                </div>

                <ButtonLink
                    variant="default"
                    dimension="sm"
                    href={route("welcome")}
                >
                    <ArrowLeft size={15} />
                    <span>Page d'accueil</span>
                </ButtonLink>
            </div>
        </div>
    );
};
export default Error;