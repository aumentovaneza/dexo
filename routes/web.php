<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\UserController;
use App\Http\Controllers\UserPokemonCollectionController;
use App\Http\Controllers\DeckController;
use App\Http\Controllers\Admin\PokemonCardController;
use App\Http\Middleware\AdminMiddleware;
use Inertia\Inertia;

// Public routes
Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('welcome');

// Auth routes
Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');

Route::get('/register', function () {
    return Inertia::render('Auth/Register');
})->name('register');

Route::post('/register', [UserController::class, 'register'])->name('register.post');
Route::post('/login', [UserController::class, 'login'])->name('login.post');

// Protected routes
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/profile', function () {
        return Inertia::render('Profile');
    })->name('profile');

    Route::post('/profile/update', [UserController::class, 'updateProfile'])->name('profile.update');

    Route::post('/logout', [UserController::class, 'logout'])->name('logout');

    // Pokemon Collection Routes
    Route::prefix('pokemon')->name('pokemon.')->group(function () {
        Route::get('/collection', [UserPokemonCollectionController::class, 'index'])->name('collection');
        Route::post('/collection/add', [UserPokemonCollectionController::class, 'addCard'])->name('collection.add');
        Route::put('/collection/{collectionCard}', [UserPokemonCollectionController::class, 'updateCard'])->name('collection.update');
        Route::delete('/collection/{collectionCard}', [UserPokemonCollectionController::class, 'removeCard'])->name('collection.remove');

        // Deck Routes
        Route::get('/decks', [DeckController::class, 'index'])->name('decks.index');
        Route::get('/decks/create', [DeckController::class, 'create'])->name('decks.create');
        Route::post('/decks', [DeckController::class, 'store'])->name('decks.store');
        Route::get('/decks/{deck}', [DeckController::class, 'show'])->name('decks.show');
        Route::get('/decks/{deck}/edit', [DeckController::class, 'edit'])->name('decks.edit');
        Route::put('/decks/{deck}', [DeckController::class, 'update'])->name('decks.update');
        Route::delete('/decks/{deck}', [DeckController::class, 'destroy'])->name('decks.destroy');
        Route::post('/decks/{deck}/share', [DeckController::class, 'share'])->name('decks.share');
    });
});

// Admin Routes - Protected by AdminMiddleware
Route::middleware(['auth', AdminMiddleware::class])->prefix('admin')->name('admin.')->group(function () {
    // Admin Dashboard
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');

    // Users Management
    Route::get('/users', function () {
        $users = \App\Models\User::all();
        return Inertia::render('Admin/Users', ['users' => $users]);
    })->name('users');

    // Pokemon Card Management
    Route::prefix('pokemon')->name('pokemon.')->group(function () {
        Route::get('/cards', [PokemonCardController::class, 'index'])->name('cards');
        Route::get('/cards/create', [PokemonCardController::class, 'create'])->name('cards.create');
        Route::post('/cards', [PokemonCardController::class, 'store'])->name('cards.store');
        Route::get('/cards/{pokemonCard}/edit', [PokemonCardController::class, 'edit'])->name('cards.edit');
        Route::put('/cards/{pokemonCard}', [PokemonCardController::class, 'update'])->name('cards.update');
        Route::delete('/cards/{pokemonCard}', [PokemonCardController::class, 'destroy'])->name('cards.destroy');
    });

    // Analytics
    Route::get('/analytics', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('analytics');

    // Content Management
    Route::get('/content', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('content');

    // Collections Management
    Route::get('/collections', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('collections');

    // Settings
    Route::get('/settings', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('settings');
});

// Shared Deck Route (Public)
Route::get('/shared-deck/{token}', [DeckController::class, 'viewShared'])->name('pokemon.decks.shared');
