@extends('layouts.app')

@section('title', 'Dashboard')

@section('content')
<div class="mb-8">
    <h1 class="text-3xl font-bold text-text">Hello, {{ Auth::user()->name ?? 'User' }}!</h1>
    <p class="text-text-muted mt-2">Welcome to your Dexo Dashboard</p>
</div>

<!-- Stats Overview -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <!-- Pokémon Cards -->
    <div class="bg-surface p-6 rounded-xl">
        <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-text">Pokémon Cards</h3>
            <div class="h-10 w-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
            </div>
        </div>
        <p class="text-3xl font-bold text-text">0</p>
        <p class="text-text-muted text-sm">Cards in your collection</p>
    </div>
    
    <!-- Decks -->
    <div class="bg-surface p-6 rounded-xl">
        <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-text">Decks</h3>
            <div class="h-10 w-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
            </div>
        </div>
        <p class="text-3xl font-bold text-text">0</p>
        <p class="text-text-muted text-sm">Pokémon decks created</p>
    </div>
    
    <!-- Beyblade Parts -->
    <div class="bg-surface p-6 rounded-xl">
        <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-text">Beyblade Parts</h3>
            <div class="h-10 w-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </div>
        </div>
        <p class="text-3xl font-bold text-text">0</p>
        <p class="text-text-muted text-sm">Parts in your collection</p>
    </div>
    
    <!-- Combos -->
    <div class="bg-surface p-6 rounded-xl">
        <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-text">Combos</h3>
            <div class="h-10 w-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            </div>
        </div>
        <p class="text-3xl font-bold text-text">0</p>
        <p class="text-text-muted text-sm">Beyblade combos created</p>
    </div>
</div>

<!-- Quick Actions -->
<div class="mb-8">
    <h2 class="text-xl font-bold text-text mb-4">Quick Actions</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <a href="#" class="bg-surface p-4 rounded-lg flex items-center hover:bg-primary/10 transition-colors">
            <div class="h-10 w-10 bg-primary/20 rounded-lg flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            </div>
            <span class="text-text">Add Pokémon Card</span>
        </a>
        <a href="#" class="bg-surface p-4 rounded-lg flex items-center hover:bg-primary/10 transition-colors">
            <div class="h-10 w-10 bg-primary/20 rounded-lg flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            </div>
            <span class="text-text">Create New Deck</span>
        </a>
        <a href="#" class="bg-surface p-4 rounded-lg flex items-center hover:bg-primary/10 transition-colors">
            <div class="h-10 w-10 bg-secondary/20 rounded-lg flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            </div>
            <span class="text-text">Add Beyblade Part</span>
        </a>
        <a href="#" class="bg-surface p-4 rounded-lg flex items-center hover:bg-primary/10 transition-colors">
            <div class="h-10 w-10 bg-secondary/20 rounded-lg flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            </div>
            <span class="text-text">Create New Combo</span>
        </a>
    </div>
</div>

<!-- Recent Activity -->
<div>
    <h2 class="text-xl font-bold text-text mb-4">Recent Activity</h2>
    <div class="bg-surface rounded-xl overflow-hidden">
        <div class="p-6 text-center text-text-muted">
            No recent activity to display.
            <br>
            Start building your collection to see activity here!
        </div>
    </div>
</div>
@endsection 