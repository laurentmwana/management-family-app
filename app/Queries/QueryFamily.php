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
use Illuminate\Support\Facades\Auth;

abstract class QueryFamily
{
    public static function findAll(): Collection
    {
        $user = Auth::user();

        return Family::with(['peoples'])
            ->where('user_id', '=', $user->id)
            ->orderByDesc('updated_at')
            ->get();
    }

    public static function findAllLimit(int $limit): Collection
    {
        $user = Auth::user();

        return Family::with(['peoples'])
            ->orderByDesc('updated_at')
            ->where('user_id', '=', $user->id)
            ->limit($limit)
            ->get();
    }

    public static function findAllWithFilters(Request $request): LengthAwarePaginator
    {
        $user = Auth::user();

        $builder =  Family::with(['peoples'])
            ->where('user_id', '=', $user->id)
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

    public static function findOneWithRelation(int $id): Family
    {
        $user = Auth::user();

        return Family::with(['peoples'])
            ->where('user_id', '=', $user->id)
            ->findOrFail($id);
    }

    public static function findOne(int $id): Family
    {
        $user = Auth::user();

        return Family::where('user_id', '=', $user->id)
            ->findOrFail($id);
    }
}
