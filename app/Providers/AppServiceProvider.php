<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

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
        // Share routes with all Inertia responses
        Inertia::share([
            'ziggy' => function () {
                return [
                    'url' => config('app.url'),
                    'port' => parse_url(config('app.url'), PHP_URL_PORT),
                    'routes' => collect(Route::getRoutes()->getRoutesByName())
                        ->map(function ($route) {
                            return [
                                'uri' => $route->uri(),
                                'methods' => $route->methods(),
                                'parameters' => $route->parameterNames(),
                            ];
                        }),
                ];
            },
        ]);
    }
}
