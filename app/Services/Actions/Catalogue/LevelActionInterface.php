<?php

namespace App\Services\Actions\Catalogue;

use App\Models\Level;

interface LevelActionInterface
{
    public function createLevel(array $data): Level;

    public function updateLevel(array $data, Level $level): Level;

    public function deleteLevel(Level $level): bool;
}
