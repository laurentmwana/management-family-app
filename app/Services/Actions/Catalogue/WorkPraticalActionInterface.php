<?php

namespace App\Services\Actions\Catalogue;

use App\Models\WorkPratical;

interface WorkPraticalActionInterface
{
    public function createWorkPratical(array $data): WorkPratical;

    public function updateWorkPratical(array $data, WorkPratical $workPratical): WorkPratical;

    public function deleteWorkPratical(WorkPratical $workPratical): bool;
}
