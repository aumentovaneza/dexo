<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Tighten\Ziggy\Ziggy;
use Pokemon\Pokemon;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        // Share Ziggy routes with Inertia
        Inertia::share([
            'app' => [
                'name' => config('app.name'),
            ],
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => url()->current(),
            ],
        ]);

        Pokemon::ApiKey(config('services.pokemon_tcg_api.key'));
        Pokemon::Options(['verify' => true]);
    }
}
