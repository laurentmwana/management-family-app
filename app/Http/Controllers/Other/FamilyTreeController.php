<?php

namespace App\Http\Controllers\Other;

use Inertia\Inertia;
use Inertia\Response;
use App\Http\Controllers\Controller;
use App\Queries\QueryFamily;
use Illuminate\Http\Request;

class FamilyTreeController extends Controller
{

    public function __invoke(Request $request): Response
    {
        $families = QueryFamily::findAllWithFilters($request);

        return Inertia::render('other/family-tree/index', [
            'families' => $families
        ]);
    }
}
