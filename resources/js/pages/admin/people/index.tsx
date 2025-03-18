import { ActionDeleteWithPassword } from '@/components/action-with-password';
import { ButtonLink } from '@/components/ui/button-link';
import { Pagination } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { truncate } from '@/lib/utils';
import { Moment } from '@/shared/moment';
import { SearchInput } from '@/shared/search-input';
import { FormatterObject, PaginationData, People, SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Eye } from 'lucide-react';
import { ModalFormPeople } from './modal-form';

type PeopleIndexProps = {
    peoples: PaginationData<People>;
    families: FormatterObject[];
    relationFamilies: FormatterObject[];
    genders: FormatterObject[];
} & SharedData;

const PeopleIndex = () => {
    const { peoples, genders, relationFamilies, families, auth } = usePage<PeopleIndexProps>().props;

    return (
        <AppLayout>
            <Head title="Membres" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container-card">
                    <h2 className="text-base font-semibold">Membre de la famille</h2>
                    <div className="my-5 flex items-center justify-between">
                        <SearchInput lenghtData={peoples.total} urlBack={route('#family.index')} />
                        <ModalFormPeople
                            full_name=""
                            gender=""
                            relation_family=""
                            family_id={0}
                            genders={genders}
                            relations={relationFamilies}
                            birth=""
                            families={families}
                            id={null}
                        />
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Titre</TableHead>
                                <TableHead>Genre</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Famille</TableHead>
                                <TableHead>Créer</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {peoples.data.map((people) => {
                                return (
                                    <TableRow key={people.id}>
                                        <TableCell>{truncate(people.full_name, 40, '...')}</TableCell>
                                        <TableCell>{people.gender}</TableCell>
                                        <TableCell>{people.relation_family}</TableCell>
                                        <TableCell>{people.relation_family}</TableCell>

                                        <TableCell>
                                            <Moment date={people.created_at} />
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex items-center gap-4">
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

                                                <ActionDeleteWithPassword routeDestroy={route('#people.destroy', { id: people.id })} />

                                                <ButtonLink dimension="sm" variant="secondary" href={route('#people.show', { id: people.id })}>
                                                    <Eye size={15} />
                                                </ButtonLink>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    <Pagination paginate={peoples} />
                </div>
            </div>
        </AppLayout>
    );
};

export default PeopleIndex;
