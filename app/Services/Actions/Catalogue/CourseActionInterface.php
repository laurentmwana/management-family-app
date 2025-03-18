<?php

namespace App\Services\Actions\Catalogue;

use App\Models\Course;

interface CourseActionInterface
{
    public function createCourse(array $data): Course;

    public function updateCourse(array $data, Course $course): Course;

    public function deleteCourse(Course $course): bool;
}
