import { Pagination } from '@/components/ui/pagination';
import { BaseLayout } from '@/layouts/base-layout';
import { SearchInput } from '@/shared/search-input';
import { SectionHeaderPage } from '@/shared/section-page';
import { PaginationData, SupportCourse, WorkPratical } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { SupportCourseItem } from './item';

const title = 'Support des cours';

type SupportCourseIndexProps = { supportCourses: PaginationData<SupportCourse> };

const SupportCourseIndex = () => {
    const { supportCourses } = usePage<SupportCourseIndexProps>().props;

    return (
        <BaseLayout>
            <Head title={title} />

            <div className="container py-12">
                <div className="container-center">
                    <SectionHeaderPage title={title}>
                    Accédez à une bibliothèque de syllabus de qualité pour enrichir vos connaissances et structurer votre parcours académique.
                    Profitez d’un accès libre, que vous soyez étudiant, enseignant ou passionné de savoir.
                    </SectionHeaderPage>

                    <div className="mb-6 flex items-center justify-between gap-3">
                        <SearchInput lenghtData={supportCourses.total} urlBack={route('work-pratical.index')} />
                    </div>

                    <div className="mb-4 grid grid-cols-1 gap-8 md:grid-cols-2">
                        {supportCourses.data.map((support) => (
                            <SupportCourseItem key={support.id} support={support} />
                        ))}
                    </div>

                    <Pagination paginate={supportCourses} />
                </div>
            </div>
        </BaseLayout>
    );
};
export default SupportCourseIndex;
