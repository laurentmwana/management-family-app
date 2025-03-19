import { BaseLayout } from '@/layouts/base-layout';
import { SectionHeaderPage } from '@/shared/section-page';
import { Family, PaginationData } from '@/types';
import { Head } from '@inertiajs/react';
import { FamilyCard } from './family-card';
import { Pagination } from '@/components/ui/pagination';

const title = 'Ma famille';

type FamilyIndexProps = {families: PaginationData<Family>}

const FamilyIndex = ({families} : FamilyIndexProps) => {
    return (
        <BaseLayout>
            <Head title={title} />

            <div className="container py-12">
                <div className="container-center">
                    <SectionHeaderPage title={title} />

                    <div className="grid grid-cols-1 gap-5 mb-6">
                        {families.data.map(f => {
                            return <FamilyCard family={f} key={f.id} />
                        })}
                    </div>

                    <Pagination paginate={families} />
                </div>
            </div>
        </BaseLayout>
    );
};
export default FamilyIndex;
