@extends('layouts.app')

@section('title', 'Profile')

@section('content')
<div class="max-w-4xl mx-auto">
    <!-- Success Message -->
    @if(session('success'))
    <div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
        <p>{{ session('success') }}</p>
    </div>
    @endif

    <div class="bg-surface rounded-lg shadow-md overflow-hidden">
        <div class="bg-primary px-6 py-4">
            <h1 class="text-white text-xl font-semibold">My Profile</h1>
        </div>
        
        <div class="p-6">
            <div class="flex flex-col md:flex-row gap-8">
                <!-- Profile Photo and Stats -->
                <div class="w-full md:w-1/3">
                    <div class="flex flex-col items-center">
                        <div class="h-32 w-32 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                            <span class="text-primary text-5xl font-medium">{{ substr(Auth::user()->name, 0, 1) }}</span>
                        </div>
                        <h2 class="text-lg font-medium text-text">{{ Auth::user()->name }}</h2>
                        <p class="text-text-muted">Member since {{ Auth::user()->created_at->format('F Y') }}</p>
                    </div>

                    <div class="mt-8">
                        <h3 class="text-text font-medium mb-2">Collections</h3>
                        <div class="bg-background rounded-lg p-4 mb-4">
                            <div class="flex justify-between mb-2">
                                <span class="text-text-muted">Pokémon Cards:</span>
                                <span class="text-text font-medium">{{ Auth::user()->pokemonCollection->count() }}</span>
                            </div>
                            <div class="flex justify-between mb-2">
                                <span class="text-text-muted">Decks:</span>
                                <span class="text-text font-medium">{{ Auth::user()->decks->count() }}</span>
                            </div>
                            <div class="flex justify-between mb-2">
                                <span class="text-text-muted">Beyblade Parts:</span>
                                <span class="text-text font-medium">{{ Auth::user()->beybladeCollection->count() }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-text-muted">Combos:</span>
                                <span class="text-text font-medium">{{ Auth::user()->combos->count() }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Profile Form -->
                <div class="w-full md:w-2/3">
                    <h3 class="text-text font-medium mb-4">Edit Profile Information</h3>
                    
                    <form id="profile-form" action="{{ route('profile.update') }}" method="POST">
                        @csrf
                        
                        <div class="mb-4">
                            <label for="name" class="block text-text-muted mb-1">Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                value="{{ Auth::user()->name }}" 
                                class="w-full px-3 py-2 bg-background text-text border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                                required
                            >
                            @error('name')
                                <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                            @enderror
                        </div>
                        
                        <div class="mb-4">
                            <label for="email" class="block text-text-muted mb-1">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                value="{{ Auth::user()->email }}" 
                                class="w-full px-3 py-2 bg-background text-text border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                                required
                            >
                            @error('email')
                                <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                            @enderror
                        </div>
                        
                        <h3 class="text-text font-medium mt-6 mb-4">Change Password</h3>
                        <p class="text-text-muted mb-4">Leave blank if you don't want to change your password.</p>
                        
                        <div class="mb-4">
                            <label for="current_password" class="block text-text-muted mb-1">Current Password</label>
                            <input 
                                type="password" 
                                id="current_password" 
                                name="current_password" 
                                class="w-full px-3 py-2 bg-background text-text border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                            >
                            @error('current_password')
                                <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                            @enderror
                        </div>
                        
                        <div class="mb-4">
                            <label for="password" class="block text-text-muted mb-1">New Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                class="w-full px-3 py-2 bg-background text-text border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                                minlength="8"
                            >
                            @error('password')
                                <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                            @enderror
                        </div>
                        
                        <div class="mb-6">
                            <label for="password_confirmation" class="block text-text-muted mb-1">Confirm New Password</label>
                            <input 
                                type="password" 
                                id="password_confirmation" 
                                name="password_confirmation" 
                                class="w-full px-3 py-2 bg-background text-text border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                                minlength="8"
                            >
                        </div>
                        
                        <div class="flex justify-end">
                            <button 
                                type="submit" 
                                class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 cursor-pointer focus:ring-primary/50"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    // Client-side form validation
    document.getElementById('profile-form').addEventListener('submit', function(e) {
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('password_confirmation').value;
        const currentPassword = document.getElementById('current_password').value;
        
        // If new password is provided, current password must be provided too
        if (password && !currentPassword) {
            e.preventDefault();
            alert('Please enter your current password to change your password.');
            return;
        }
        
        // Password and confirmation must match
        if (password && password !== passwordConfirm) {
            e.preventDefault();
            alert('New password and confirmation do not match.');
            return;
        }
    });
</script>
@endsection 