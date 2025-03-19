<?php

namespace App\Queries;

use App\Models\Family;
use App\Models\People;
use Illuminate\Http\Request;
use App\Searchable\SearchData;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

abstract class QueryPeople
{
    public static function findAll(): Collection
    {
        $user = Auth::user();

        return People::with(['family'])
            ->whereHas('family', function (Builder $query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->orderByDesc('updated_at')
            ->get();
    }

    public static function findAllLimit(int $limit): Collection
    {
        $user = Auth::user();

        return People::with(['family'])
            ->whereHas('family', function (Builder $query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->orderByDesc('updated_at')
            ->limit($limit)
            ->get();
    }

    public static function findAllWithFilters(Request $request): LengthAwarePaginator
    {
        $user = Auth::user();

        $builder = People::with(['family'])
            ->orderByDesc('updated_at');

        $familyId = $request->query('family');
        $columnSearch = ['full_name', 'bio', 'gender', 'relation_family'];
        $searchValue = $request->query('q');

        if (!empty($searchValue)) {
            $builder = SearchData::handle($builder, $searchValue, $columnSearch);
        }

        if ($familyId !== null) {
            if (!Family::where('id', $familyId)->exists()) {
                throw new ModelNotFoundException(
                    "La famille avec l'ID {$familyId} n'existe pas."
                );
            }

            $builder->whereHas('family', function (Builder $query) use ($familyId, $user) {
                $query->where('id', $familyId)
                    ->where('user_id', $user->id);  // Filtrer sur l'user_id dans la relation family
            });
        } else {
            // Si aucun familyId n'est fourni, on filtre sur la relation family pour cet utilisateur
            $builder->whereHas('family', function (Builder $query) use ($user) {
                $query->where('user_id', $user->id);
            });
        }

        return $builder->paginate();
    }

    public static function findOneWithRelation(int $id): People
    {
        $user = Auth::user();

        return People::with(['family'])
            ->whereHas('family', function (Builder $query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->findOrFail($id);
    }

    public static function findOne(int $id): People
    {
        $user = Auth::user();

        return People::whereHas('family', function (Builder $query) use ($user) {
            $query->where('user_id', $user->id);
        })
            ->findOrFail($id);
    }
}
