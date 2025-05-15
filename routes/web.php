<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\UserController;

// Public routes
Route::get('/', function () {
    return view('welcome');
});

// Test route for Tailwind colors
Route::get('/test-colors', function () {
    return view('test-colors');
});

// Auth routes
Route::post('/register', [UserController::class, 'register'])->name('register');
Route::post('/login', [UserController::class, 'login'])->name('login');

// Protected routes
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');

    Route::get('/profile', function () {
        return view('profile');
    })->name('profile');

    Route::post('/profile/update', [UserController::class, 'updateProfile'])->name('profile.update');

    Route::post('/logout', [UserController::class, 'logout'])->name('logout');
});
