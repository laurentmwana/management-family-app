<?php

namespace App\Http\Controllers\Admin;

use App\Actions\FamilyAction;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use App\Queries\QueryFamily;
use App\DataValues\AbstractDataFormatter;
use App\Http\Requests\FamilyRequest;

class AdminFamilyController extends Controller
{
    public function __construct(private FamilyAction $familyAction) {}

    public function index(Request $request): Response
    {
        $families = QueryFamily::findAllWithFilters($request);

        return Inertia::render('admin/family/index', [
            'families' => $families,
        ]);
    }

    public function show(int $id): Response
    {
        $family = QueryFamily::findOneWithRelation($id);

        return Inertia::render('admin/family/show', [
            'family' => $family,
        ]);
    }

    public function store(FamilyRequest $request): RedirectResponse
    {
        $this->familyAction->createFamily([
            ...$request->validated(),
            'user_id' => $request->user()->id
        ]);

        return redirect()->route('#family.index')->with('toast', 'une famille créé');
    }

    public function update(FamilyRequest $request, int $id): RedirectResponse
    {
        $family = QueryFamily::findOne($id);

        $this->familyAction->updateFamily([
            ...$request->validated(),
            'user_id' => $request->user()->id
        ], $family);

        return redirect()->route('#family.index')->with('toast', 'une famille modifié');
    }

    public function destroy(Request $request, int $id): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $family = QueryFamily::findOne($id);

        $this->familyAction->deleteFamily($family);

        return redirect()->route('#family.index')->with('toast', 'une famille supprimé');
    }
}
