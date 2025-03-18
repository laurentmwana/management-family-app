<?php

namespace App\Http\Controllers\Settings;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Helpers\Auth\HasRoleUser;
use App\Http\Controllers\Controller;

class AppearanceController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $user = $request->user();

        $pathComponent = HasRoleUser::isAdmin($user->role)
            ? 'settings/appearance-admin'
            : 'settings/appearance-user';

        return Inertia::render($pathComponent);
    }
}
