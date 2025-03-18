<?php

namespace App\Queries;

use App\Models\People;
use App\Models\Family;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Searchable\SearchData;
use Illuminate\Support\Collection;
use App\Exceptions\ModelNotFoundException;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

abstract class QueryPeople
{
    public static function findAll(): Collection
    {
        return People::with(['family'])
            ->orderByDesc('updated_at')
            ->get();
    }

    public static function findAllLimit(int $limit): Collection
    {
        return People::with(['family'])
            ->orderByDesc('updated_at')
            ->limit($limit)
            ->get();
    }

    public static function findAllWithFilters(Request $request): LengthAwarePaginator
    {

        $builder =  People::with(['family'])
            ->orderByDesc('updated_at');

        $familyId = $request->query('family');

        $columnSearch = ['full_name', 'bio', 'gender', 'relation_family'];

        $serachValue = $request->query('q');

        if ($serachValue !== null && !empty($serachValue)) {
            $builder = SearchData::handle($builder, $serachValue, $columnSearch);
        }

        if ($familyId !== null) {

            if (!Family::where('id', $familyId)->exists()) {
                throw new ModelNotFoundException(
                    "La famille avec l'ID {$familyId} n'existe pas."
                );
            }

            $builder->whereHas('family', function ($query) use ($familyId) {
                $query->where('id', $familyId);
            });
        }

        return $builder->paginate();
    }

    public static function findOneWithRelation(int $id): People
    {
        return People::with(['family'])->findOrFail($id);
    }

    public static function findOne(int $id): People
    {
        return People::findOrFail($id);
    }
}
