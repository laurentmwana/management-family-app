<?php

namespace App\Services\Actions\Other;

use App\Models\YearAcademic;

interface YearAcademicActionInterface
{
    public function pushNewYear(YearAcademic $year): YearAcademic;
}
