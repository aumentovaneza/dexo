<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Ziggy Configuration
    |--------------------------------------------------------------------------
    |
    | This file is used to configure Ziggy, the Laravel route helper for
    | JavaScript. Customize this file to define which routes are exposed
    | to your JavaScript frontend and specify any additional options.
    |
    */

    'only' => [], // Empty array means include all named routes
    'except' => [], // Routes to exclude from the frontend

    'url' => env('APP_URL', 'http://localhost'), // Ensure this matches your app URL

    // You can specify groups of routes to include
    'groups' => [
        // 'admin' => [
        //     'admin.*',
        // ],
    ],
];
