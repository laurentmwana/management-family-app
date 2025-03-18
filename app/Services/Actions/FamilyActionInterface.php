<?php

namespace App\Services\Actions;

use App\Models\Family;

interface FamilyActionInterface
{
    public function createFamily(array $data): Family;

    public function updateFamily(array $data, Family $family): Family;

    public function deleteFamily(Family $family): bool;
}
