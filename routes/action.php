<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\AdminFamilyController;
use App\Http\Controllers\Admin\AdminPeopleController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');
});

Route::prefix('admin')
    ->name('#')
    ->middleware(['auth', 'verified'])
    ->group(function () {

        Route::resource('family', AdminFamilyController::class)->parameter('family', 'id')
            ->except(['create', 'edit']);

        Route::resource('people', AdminPeopleController::class)->parameter('people', 'id')
            ->except(['create', 'edit']);
    });
