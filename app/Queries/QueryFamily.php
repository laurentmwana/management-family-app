<?php

namespace App\Queries;

use App\Models\Family;
use Illuminate\Http\Request;
use App\Searchable\SearchData;
use Illuminate\Support\Collection;
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

        $builder = Family::with(['peoples'])
            ->where('user_id', '=', $user->id)
            ->orderByDesc('updated_at');

        $columnSearch = ['name', 'description'];

        $serachValue = $request->query('q');

        if ($serachValue !== null && !empty($serachValue)) {
            $builder = SearchData::handle($builder, $serachValue, $columnSearch);
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
