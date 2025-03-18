<?php

namespace App\Services\Actions\Catalogue;

use App\Models\Student;
use App\Models\User;

interface StudentActionInterface
{
    public function createStudent(array $data, User $user): Student;

    public function createStudentOnly(array $data): Student;

    public function updateStudent(array $data, Student $student): Student;

    public function deleteStudent(Student $student): bool;
}
