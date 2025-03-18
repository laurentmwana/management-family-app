<?php

namespace App\Services\Actions\Catalogue;

use App\Models\SupportCourse;

interface SupportCourseActionInterface
{
    public function createSupportCourse(array $data): SupportCourse;

    public function updateSupportCourse(array $data, SupportCourse $supportCourse): SupportCourse;

    public function deleteSupportCourse(SupportCourse $supportCourse): bool;
}
