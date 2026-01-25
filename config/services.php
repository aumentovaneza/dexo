<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'resend' => [
        'key' => env('RESEND_KEY'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    'pokemon_tcg' => [
        'api_key' => env('POKEMON_TCG_API_KEY'),
        'base_url' => env('POKEMON_TCG_API_URL', 'https://api.pokemontcg.io/v2'),
        
        // Rate limiting configuration
        'rate_limit_delay' => env('POKEMON_TCG_RATE_LIMIT_DELAY', 2), // seconds between requests
        'rate_limit_jitter' => env('POKEMON_TCG_RATE_LIMIT_JITTER', 0.5), // random jitter in seconds
        'max_consecutive_failures' => env('POKEMON_TCG_MAX_CONSECUTIVE_FAILURES', 3), // max failures before extended delay
        'page_size' => env('POKEMON_TCG_PAGE_SIZE', 50), // cards per page
        'max_retries' => env('POKEMON_TCG_MAX_RETRIES', 3), // retry attempts
        'timeout' => env('POKEMON_TCG_TIMEOUT', 300), // request timeout in seconds
    ],

];
