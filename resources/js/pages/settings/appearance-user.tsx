import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import { BaseLayout } from '@/layouts/base-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { Head } from '@inertiajs/react';

export default function Appearance() {
    return (
        <BaseLayout>
            <Head title="Paramètres d'apparence" />

            <div className="container py-12">
                <div className="container-center">
                    <SettingsLayout>
                        <div className="space-y-6">
                            <HeadingSmall title="Paramètres d'apparence" description="Mettre à jour les paramètres d'apparence de votre compte" />
                            <AppearanceTabs />
                        </div>
                    </SettingsLayout>
                </div>
            </div>
        </BaseLayout>
    );
}
