<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Actions\PeopleAction;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use App\Queries\QueryPeople;
use App\DataValues\AbstractDataFormatter;
use App\Http\Requests\PeopleRequest;
use App\Services\Upload\PublicFileUpload;

class AdminPeopleController extends Controller
{
    private string $pathImage = "people";

    public function __construct(
        private PeopleAction $peopleAction,
        private PublicFileUpload $upload
    ) {}


    public function index(Request $request): Response
    {
        $peoples = QueryPeople::findAllWithFilters($request);

        return Inertia::render('admin/people/index', [
            'peoples' => $peoples,
            'families' => AbstractDataFormatter::getFamiliesForUser(),
            'genders' => AbstractDataFormatter::getGenders(),
            'relationFamilies' => AbstractDataFormatter::getRelationFamilies(),
        ]);
    }

    public function show(int $id): Response
    {
        $people = QueryPeople::findOneWithRelation($id);

        return Inertia::render('admin/people/show', [
            'people' => $people,
            'families' => AbstractDataFormatter::getFamiliesForUser(),
            'genders' => AbstractDataFormatter::getGenders(),
            'relationFamilies' => AbstractDataFormatter::getRelationFamilies(),
        ]);
    }

    public function store(PeopleRequest $request): RedirectResponse
    {
        $imageUrl = $this->upload->create(
            $request->validated('image'),
            $this->pathImage
        );

        $this->peopleAction->createPeople([
            ...$request->validated(),
            'image' => $imageUrl,
        ]);

        return redirect()->route('#people.index')->with('toast', 'un membre de la famille créé');
    }

    public function update(PeopleRequest $request, int $id): RedirectResponse
    {
        $people = QueryPeople::findOne($id);

        $imageUrl = $this->upload->update(
            $request->validated('image'),
            $this->pathImage,
            $people->image,
        );

        $this->peopleAction->updatePeople([
            ...$request->validated(),
            'image' => $imageUrl,
        ], $people);

        return redirect()->route('#people.index')->with('toast', 'un membre de la famille modifié');
    }

    public function destroy(Request $request, int $id): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $people = QueryPeople::findOne($id);

        $this->peopleAction->deletePeople($people);

        return redirect()->route('#people.index')->with('toast', 'un membre de la famille supprimé');
    }
}
