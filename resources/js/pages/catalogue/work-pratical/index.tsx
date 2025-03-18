import { Pagination } from '@/components/ui/pagination';
import { BaseLayout } from '@/layouts/base-layout';
import { SearchInput } from '@/shared/search-input';
import { SectionHeaderPage } from '@/shared/section-page';
import { PaginationData, WorkPratical } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { WorkPraticalItem } from './item';

const title = 'Travaux pratique';

type WorkPraticalIndexProps = { workPraticals: PaginationData<WorkPratical> };

const WorkPraticalIndex = () => {
    const { workPraticals } = usePage<WorkPraticalIndexProps>().props;

    return (
        <BaseLayout>
            <Head title={title} />

            <div className="container py-12">
                <div className="container-center">
                    <SectionHeaderPage title={title}>
                        Explorez des exercices pratiques pour mettre en application vos connaissances et développer vos compétences. Ces ressources
                        sont conçues pour renforcer votre apprentissage de manière concrète et interactive.
                    </SectionHeaderPage>

                    <div className="mb-6 flex items-center justify-between gap-3">
                        <SearchInput lenghtData={workPraticals.total} urlBack={route('work-pratical.index')} />
                    </div>

                    <div className="mb-4 grid grid-cols-1 gap-8 md:grid-cols-2">
                        {workPraticals.data.map((workPratical) => (
                            <WorkPraticalItem key={workPratical.id} workPratical={workPratical} />
                        ))}
                    </div>

                    <Pagination paginate={workPraticals} />
                </div>
            </div>
        </BaseLayout>
    );
};
export default WorkPraticalIndex;
