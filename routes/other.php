<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Other\WelcomeController;
use App\Http\Controllers\Other\AboutController;


Route::get('/', WelcomeController::class)->name('welcome');

Route::get('/about', [AboutController::class, 'about'])->name('about');
