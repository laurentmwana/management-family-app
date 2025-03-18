<?php

namespace App\Services\Actions;

use App\Models\People;

interface PeopleActionInterface
{
    public function createPeople(array $data): People;

    public function updatePeople(array $data, People $people): People;

    public function deletePeople(People $people): bool;
}
