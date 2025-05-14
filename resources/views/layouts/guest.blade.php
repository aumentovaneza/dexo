<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Dexo') }}</title>
    
    <!-- Vite Assets -->
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    
    <!-- Alpine.js (for dropdowns) -->
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
</head>
<body class="bg-background min-h-screen">
    <div class="container mx-auto px-4">
        <!-- Navigation -->
        <nav class="py-6 flex justify-between items-center">
            <div>
                <a href="/" class="text-primary text-3xl font-bold">Dexo</a>
            </div>
            <div class="space-x-4">
                <a href="{{ route('login') }}" class="text-text hover:text-primary transition-colors">Login</a>
                <a href="{{ route('register') }}" class="bg-primary hover:bg-primary/90 text-background py-2 px-4 rounded-lg transition-colors">Register</a>
            </div>
        </nav>

        <!-- Main Content -->
        <main>
            @yield('content')
        </main>

        <!-- Footer -->
        <footer class="py-8 border-t border-surface mt-8">
            <div class="flex flex-col md:flex-row justify-between items-center">
                <div class="mb-4 md:mb-0">
                    <a href="/" class="text-primary text-xl font-bold">Dexo</a>
                    <p class="text-text-muted text-sm">© {{ date('Y') }} Dexo. All rights reserved.</p>
                </div>
                <div class="flex space-x-6">
                    <a href="#" class="text-text-muted hover:text-primary transition-colors">Terms</a>
                    <a href="#" class="text-text-muted hover:text-primary transition-colors">Privacy</a>
                    <a href="#" class="text-text-muted hover:text-primary transition-colors">Contact</a>
                </div>
            </div>
        </footer>
    </div>
</body>
</html> 