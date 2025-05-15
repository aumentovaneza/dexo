<?php

namespace App\Http\Controllers;

use App\Models\PokemonCard;
use App\Models\UserPokemonCollection;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserPokemonCollectionController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display the user's Pokemon card collection.
     */
    public function index()
    {
        $user = Auth::user();
        $collection = UserPokemonCollection::with('pokemonCard')
            ->where('user_id', $user->id)
            ->paginate(24);

        return Inertia::render('Pokemon/Collection', [
            'collection' => $collection,
        ]);
    }

    /**
     * Add a card to the user's collection.
     */
    public function addCard(Request $request)
    {
        $request->validate([
            'pokemon_card_id' => 'required|exists:pokemon_cards,id',
            'quantity' => 'required|integer|min:1',
            'tags' => 'nullable|array',
        ]);

        $user = Auth::user();

        // Check if the card already exists in the user's collection
        $existingCard = UserPokemonCollection::where('user_id', $user->id)
            ->where('pokemon_card_id', $request->pokemon_card_id)
            ->first();

        if ($existingCard) {
            // Update quantity
            $existingCard->quantity += $request->quantity;
            $existingCard->tags = $request->tags ?? $existingCard->tags;
            $existingCard->save();
        } else {
            // Add new card to collection
            UserPokemonCollection::create([
                'user_id' => $user->id,
                'pokemon_card_id' => $request->pokemon_card_id,
                'quantity' => $request->quantity,
                'tags' => $request->tags,
            ]);
        }

        return redirect()->route('pokemon.collection')->with('success', 'Card added to collection!');
    }

    /**
     * Update a card in the user's collection.
     */
    public function updateCard(Request $request, UserPokemonCollection $collectionCard)
    {
        $this->authorize('update', $collectionCard);

        $request->validate([
            'quantity' => 'required|integer|min:0',
            'tags' => 'nullable|array',
        ]);

        if ($request->quantity === 0) {
            $collectionCard->delete();
            return redirect()->route('pokemon.collection')->with('success', 'Card removed from collection!');
        }

        $collectionCard->quantity = $request->quantity;
        $collectionCard->tags = $request->tags ?? $collectionCard->tags;
        $collectionCard->save();

        return redirect()->route('pokemon.collection')->with('success', 'Collection updated!');
    }

    /**
     * Remove a card from the user's collection.
     */
    public function removeCard(UserPokemonCollection $collectionCard)
    {
        $this->authorize('delete', $collectionCard);

        $collectionCard->delete();

        return redirect()->route('pokemon.collection')->with('success', 'Card removed from collection!');
    }
}
