@extends('layouts.guest')

@section('content')
<!-- Hero Section -->
<div class="py-20 flex flex-col items-center text-center">
    <h2 class="text-5xl md:text-6xl font-bold text-text mb-6">Collect. Battle. Trade.</h2>
    <p class="text-xl text-text-muted max-w-2xl mb-10">
        Your ultimate platform for managing Pokémon cards and Beyblade collections. Build decks, create combos, and track your collection all in one place.
    </p>
    <div class="flex flex-col sm:flex-row gap-4">
        <a href="{{ route('register') }}" class="bg-primary hover:bg-primary/90 text-background font-semibold py-3 px-8 rounded-lg text-lg transition-colors">
            Get Started
        </a>
        <a href="#features" class="bg-surface hover:bg-surface/90 text-text font-semibold py-3 px-8 rounded-lg text-lg transition-colors">
            Learn More
        </a>
    </div>
</div>

<!-- Features Section -->
<div id="features" class="py-16">
    <h3 class="text-3xl font-bold text-text text-center mb-12">Why Choose Dexo?</h3>
    
    <div class="grid md:grid-cols-3 gap-8">
        <!-- Pokémon Card Management -->
        <div class="bg-surface p-6 rounded-xl">
            <div class="h-14 w-14 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
            </div>
            <h4 class="text-xl font-bold text-text mb-2">Pokémon Card Collection</h4>
            <p class="text-text-muted">Organize, track, and showcase your Pokémon card collection. Build decks and analyze meta trends.</p>
        </div>
        
        <!-- Beyblade Management -->
        <div class="bg-surface p-6 rounded-xl">
            <div class="h-14 w-14 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h4 class="text-xl font-bold text-text mb-2">Beyblade Combos</h4>
            <p class="text-text-muted">Create and manage your Beyblade combinations. Track parts, analyze stats, and optimize your battle strategy.</p>
        </div>
        
        <!-- Analytics -->
        <div class="bg-surface p-6 rounded-xl">
            <div class="h-14 w-14 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            </div>
            <h4 class="text-xl font-bold text-text mb-2">Meta Analysis</h4>
            <p class="text-text-muted">Stay ahead with insights on meta decks, win rates, and popular strategies for both Pokémon and Beyblade.</p>
        </div>
    </div>
</div>

<!-- CTA Section -->
<div class="py-16 flex flex-col items-center text-center">
    <h3 class="text-3xl font-bold text-text mb-6">Ready to Start Your Collection?</h3>
    <p class="text-lg text-text-muted max-w-2xl mb-8">
        Join thousands of collectors and players who trust Dexo for managing their collections.
    </p>
    <a href="{{ route('register') }}" class="bg-primary hover:bg-primary/90 text-background font-semibold py-3 px-8 rounded-lg text-lg transition-colors">
        Create Your Account
    </a>
</div>
@endsection
