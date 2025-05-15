<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\UserController;
use App\Http\Controllers\UserPokemonCollectionController;
use App\Http\Controllers\DeckController;
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

// Shared Deck Route (Public)
Route::get('/shared-deck/{token}', [DeckController::class, 'viewShared'])->name('pokemon.decks.shared');
