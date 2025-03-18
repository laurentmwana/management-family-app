<?php

namespace App\Http\Controllers\Other;

use Inertia\Inertia;
use Inertia\Response;
use App\Http\Controllers\Controller;

class AboutController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('other/about/index');
    }
}
