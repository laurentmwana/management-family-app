<?php

namespace App\Helpers\DataValues;

use App\Enums\EventTypeEnum;
use App\Enums\GenderEnum;
use App\Enums\MobileMoneyEnum;
use App\Models\Category;
use App\Models\Course;
use App\Models\Level;
use App\Models\Option;
use App\Models\Professor;
use App\Models\YearAcademic;
use Illuminate\Support\Collection;

abstract class AbstractDataFormatter
{

    public static function getMobileMoney(): Collection
    {
        $collection = new Collection();

        foreach (MobileMoneyEnum::cases() as $type) {
            $collection->add(
                (new DataValueObject())
                    ->setId($type->value)
                    ->setName($type->value)
            );
        }

        return $collection;
    }




    public static function getTypeEvents(): Collection
    {
        $collection = new Collection();

        foreach (EventTypeEnum::cases() as $type) {
            $collection->add(
                (new DataValueObject())
                    ->setId($type->value)
                    ->setName($type->value)
            );
        }

        return $collection;
    }

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

    public static function getCategories(): Collection
    {
        return Category::orderByDesc('updated_at')
            ->get(['name', 'id']);
    }


    public static function getCourses(): Collection
    {
        return Course::orderByDesc('updated_at')
            ->get(['name', 'id']);
    }


    public static function getYears(): Collection
    {
        return YearAcademic::orderByDesc('updated_at')
            ->get(['name', 'id']);
    }



    public static function getOptions(): Collection
    {
        return Option::orderByDesc('updated_at')
            ->get(['name', 'id']);
    }

    public static function getProfessors(): Collection
    {
        $professors =  Professor::orderByDesc('updated_at')
            ->get(['id', 'full_name']);

        $collection = new Collection();

        foreach ($professors as $professor) {
            $collection->add(
                (new DataValueObject())
                    ->setId($professor->id)
                    ->setName($professor->full_name)
            );
        }

        return $collection;
    }


    public static function getLevels(): Collection
    {
        $levels =  Level::orderByDesc('updated_at')
            ->get(['name', 'id', 'alias']);

        $collection = new Collection();

        foreach ($levels as $level) {
            $collection->add(
                (new DataValueObject())
                    ->setId($level->id)
                    ->setName(sprintf("%s - [%s]", $level->name, $level->alias))
            );
        }

        return $collection;
    }
}
