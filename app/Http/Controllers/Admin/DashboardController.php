<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Family;
use App\Models\People;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use PhpParser\Builder\Use_;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $user = $request->user();

        return Inertia::render('admin/dashboard/index', $this->getCount($user));
    }

    private function getCount(User $user): array
    {
        return [
            'countFamilies' => Family::where('user_id', $user->id)->count('id'),
            'countPeoples' => People::whereHas('family', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })->count('id'),
        ];
    }
}
