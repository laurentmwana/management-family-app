<?php

namespace App\Actions;

use App\Models\Family;
use Illuminate\Support\Facades\DB;
use App\Services\Actions\FamilyActionInterface;

class FamilyAction implements FamilyActionInterface
{

    public function createFamily(array $data): Family
    {
        return DB::transaction(function () use ($data) {
            return  Family::create($data);
        });
    }

    public function updateFamily(array $data, Family $family): Family
    {
        DB::transaction(fn() => $family->update($data));

        return $family;
    }

    public function deleteFamily(Family $family): bool
    {
        return DB::transaction(fn() => $family->delete());
    }
}
