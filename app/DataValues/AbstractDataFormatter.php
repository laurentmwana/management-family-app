<?php

namespace App\DataValues;

use App\Enums\GenderEnum;
use App\Enums\RelationFamilyEnum;
use App\Models\Family;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;

abstract class AbstractDataFormatter
{

    public static function getGenders(): Collection
    {
        $collection = new Collection();

        foreach (GenderEnum::cases() as $gender) {
            $collection->add(
                (new DataValueObject())
                    ->setId($gender->value)
                    ->setName($gender->value)
            );
        }

        return $collection;
    }

    public static function getRelationFamilies(): Collection
    {
        $collection = new Collection();

        foreach (RelationFamilyEnum::cases() as $relation) {
            $collection->add(
                (new DataValueObject())
                    ->setId($relation->value)
                    ->setName($relation->value)
            );
        }

        return $collection;
    }

    public static function getFamiliesForUser(): Collection
    {
        $user = Auth::user();

        $families = Family::where('user_id', '=', $user->id)
            ->get();

        $collection = new Collection();

        foreach ($families as $family) {
            $collection->add(
                (new DataValueObject())
                    ->setId($family->id)
                    ->setName($family->name)
            );
        }

        return $collection;
    }
}
