<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\UserController;
use App\Http\Controllers\UserPokemonCollectionController;
use App\Http\Controllers\DeckController;
use App\Http\Controllers\CollectionStatisticsController;
use App\Http\Controllers\PriceTrackingController;
use App\Http\Controllers\TradingController;
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

        // Pokemon Card Routes
        Route::get('/cards', [PokemonCardController::class, 'index'])->name('cards');
        Route::get('/cards/{pokemonCard}', [PokemonCardController::class, 'show'])->name('cards.show');
        
        // Collection Statistics Routes
        Route::get('/statistics', [CollectionStatisticsController::class, 'index'])->name('statistics');
        Route::get('/api/statistics', [CollectionStatisticsController::class, 'apiStats'])->name('api.statistics');
        Route::get('/api/statistics/trends', [CollectionStatisticsController::class, 'apiTrends'])->name('api.statistics.trends');
        
        // Search API Routes
        Route::get('/api/search', [PokemonCardController::class, 'search'])->name('api.search');
        Route::get('/api/search/suggestions', [PokemonCardController::class, 'suggestions'])->name('api.search.suggestions');
        Route::get('/api/search/filters', [PokemonCardController::class, 'filterOptions'])->name('api.search.filters');
        
        // Price Tracking Routes
        Route::get('/prices', [PriceTrackingController::class, 'index'])->name('prices');
        Route::get('/api/prices/card/{pokemonCard}', [PriceTrackingController::class, 'cardPrice'])->name('api.prices.card');
        Route::get('/api/prices/alerts', [PriceTrackingController::class, 'alerts'])->name('api.prices.alerts');
        Route::get('/api/prices/trends', [PriceTrackingController::class, 'marketTrends'])->name('api.prices.trends');
        Route::get('/api/prices/history/{pokemonCard}', [PriceTrackingController::class, 'priceHistory'])->name('api.prices.history');
        
        // Trading Routes
        Route::get('/trading', [TradingController::class, 'index'])->name('trading.dashboard');
        Route::get('/trading/create', [TradingController::class, 'create'])->name('trading.create');
        Route::post('/trading/create', [TradingController::class, 'store'])->name('trading.store');
        Route::get('/trading/{trade}', [TradingController::class, 'show'])->name('trading.show');
        Route::post('/trading/{trade}/accept', [TradingController::class, 'accept'])->name('trading.accept');
        Route::post('/trading/{trade}/reject', [TradingController::class, 'reject'])->name('trading.reject');
        Route::post('/trading/{trade}/cancel', [TradingController::class, 'cancel'])->name('trading.cancel');
        Route::post('/trading/{trade}/complete', [TradingController::class, 'complete'])->name('trading.complete');
        Route::get('/api/trading/shipping/{trade}', [TradingController::class, 'shippingOptions'])->name('api.trading.shipping');
        Route::get('/api/trading/partners', [TradingController::class, 'tradingPartners'])->name('api.trading.partners');
        Route::get('/api/trading/marketplace', [TradingController::class, 'marketplace'])->name('api.trading.marketplace');
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
        Route::get('/cards/{pokemonCard}', [PokemonCardController::class, 'show'])->name('cards.show');
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
