<?php

namespace App\Http\Controllers\Other;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class WelcomeController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('other/welcome/index');
    }
}
