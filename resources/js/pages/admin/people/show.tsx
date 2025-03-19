import AppLayout from '@/layouts/app-layout';
import { FormatterObject, People, SharedData, type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ModalFormPeople } from './modal-form';
import { Moment } from '@/shared/moment';
import { storageSourceUrl } from '@/lib/utils';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Membre',
        href: route('#people.index'),
    },
    {
        title: 'En savoir plus sur un membre de la famille',
        href: '',
    },
];

type PostShowProps = { families: FormatterObject[]; relationFamilies: FormatterObject[]; genders: FormatterObject[]; people: People } & SharedData;

const PostShow = () => {
    const { people, genders, relationFamilies, families } = usePage<PostShowProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container-card">
                    <div className="flex items-center justify-between gap-5 mb-4">
                        <h2 className="text-base font-semibold">{people.full_name}</h2>
                        <ModalFormPeople
                            full_name={people.full_name}
                            gender={people.gender}
                            relation_family={people.relation_family}
                            family_id={people.family_id}
                            genders={genders}
                            relations={relationFamilies}
                            birth={people.birth}
                            families={families}
                            id={people.id}
                        />
                    </div>

                    <div>
                        <div className="mb-5">
                            <img className='object-fill w-[200px] h-200px] rounded-sm' src={storageSourceUrl(people.image)} alt="image" />
                        </div>
                        <p className='text-sm hover:underline mb-4'>
                            Famille : <Link href={route('#family.show', {id: people.family.id})}>{people.family.name}</Link>
                        </p>
                        <p className='text-sm hover:underline mb-4'>
                            Nom complet : {people.full_name}
                        </p>

                        <p className='text-sm hover:underline mb-4'>
                            Genre : {people.gender}
                        </p>

                        <p className='text-sm hover:underline mb-4'>
                            Relation : {people.relation_family}
                        </p>

                        <p className='text-sm hover:underline mb-4'>
                            Date de naissance : {people.birth}
                        </p>

                        <Moment date={people.created_at} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default PostShow;
