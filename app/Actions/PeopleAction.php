<?php

namespace App\Actions;

use App\Models\People;
use Illuminate\Support\Facades\DB;
use App\Services\Actions\PeopleActionInterface;

class PeopleAction implements PeopleActionInterface
{
    public function createPeople(array $data): People
    {
        return DB::transaction(function () use ($data) {
            return  People::create($data);
        });
    }


    public function updatePeople(array $data, People $people): People
    {
        DB::transaction(fn() => $people->update($data));

        return $people;
    }


    public function deletePeople(People $people): bool
    {
        return DB::transaction(fn() => $people->delete());
    }
}
