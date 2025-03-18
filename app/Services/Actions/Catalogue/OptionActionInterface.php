<?php

namespace App\Services\Actions\Catalogue;

use App\Models\Option;

interface OptionActionInterface
{
    public function createOption(array $data): Option;

    public function updateOption(array $data, Option $option): Option;

    public function deleteOption(Option $option): bool;
}
