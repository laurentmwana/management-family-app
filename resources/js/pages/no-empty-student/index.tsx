import { BaseLayout } from '@/layouts/base-layout';
import { SectionHeaderPage } from '@/shared/section-page';
import { FormatterObject } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { StudentForm } from './student-form';

const title = 'Complètez vos informations';

type NoEmptyStudentIndexProps = { genders: FormatterObject[] };

const NoEmptyStudentIndex = () => {
    const { genders } = usePage<NoEmptyStudentIndexProps>().props;

    return (
        <BaseLayout>
            <Head title={title} />

            <div className="container py-12">
                <div className="container-center">
                    <SectionHeaderPage title={title}>
                        Vous avez un problème technique ? Vous souhaitez envoyer des commentaires sur une fonctionnalité bêta ? Besoin de détails sur
                        notre plan Business ? Faites le nous savoir.
                    </SectionHeaderPage>

                    <div className="container-card max-w-3xl">
                        <StudentForm genders={genders} />
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};
export default NoEmptyStudentIndex;
