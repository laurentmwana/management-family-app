<?php

namespace App\Services\Actions\Catalogue;

use App\Models\Professor;

interface ProfessorActionInterface
{
    public function createProfessor(array $data): Professor;

    public function updateProfessor(array $data, Professor $professor): Professor;

    public function deleteProfessor(Professor $professor): bool;
}
