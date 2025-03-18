<?php

use App\Http\Controllers\Other\FamilyTreeController;
use App\Http\Controllers\Other\MemberController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Other\WelcomeController;
use App\Http\Controllers\Other\AboutController;


Route::get('/', WelcomeController::class)->name('welcome');

Route::get('/about', AboutController::class)->name('about');

Route::middleware(['auth', 'verified'])
    ->get('/family-tree', FamilyTreeController::class)->name('family-tree');
