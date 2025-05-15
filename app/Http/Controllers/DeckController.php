<?php

namespace App\Http\Controllers;

use App\Models\Deck;
use App\Models\DeckCard;
use App\Models\PokemonCard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class DeckController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the user's decks
     */
    public function index()
    {
        $user = Auth::user();
        $decks = Deck::where('user_id', $user->id)
            ->withCount('deckCards')
            ->paginate(10);

        return Inertia::render('Pokemon/Decks/Index', [
            'decks' => $decks,
        ]);
    }

    /**
     * Show the form for creating a new deck
     */
    public function create()
    {
        $user = Auth::user();
        $collection = $user->pokemonCollection()
            ->with('pokemonCard')
            ->get();

        return Inertia::render('Pokemon/Decks/Create', [
            'collection' => $collection,
        ]);
    }

    /**
     * Store a newly created deck
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'format' => 'nullable|string|max:100',
            'notes' => 'nullable|string|max:1000',
            'cards' => 'required|array|min:1',
            'cards.*.pokemon_card_id' => 'required|exists:pokemon_cards,id',
            'cards.*.quantity' => 'required|integer|min:1|max:4',
        ]);

        // Create the deck
        $deck = Deck::create([
            'user_id' => $user->id,
            'name' => $validated['name'],
            'format' => $validated['format'] ?? null,
            'notes' => $validated['notes'] ?? null,
        ]);

        // Add the cards to the deck
        foreach ($validated['cards'] as $card) {
            DeckCard::create([
                'deck_id' => $deck->id,
                'pokemon_card_id' => $card['pokemon_card_id'],
                'quantity' => $card['quantity'],
            ]);
        }

        return redirect()->route('pokemon.decks.show', $deck->id)
            ->with('success', 'Deck created successfully!');
    }

    /**
     * Display the specified deck
     */
    public function show(Deck $deck)
    {
        $this->authorize('view', $deck);

        $deck->load(['deckCards.pokemonCard']);

        return Inertia::render('Pokemon/Decks/Show', [
            'deck' => $deck,
        ]);
    }

    /**
     * Show the form for editing the specified deck
     */
    public function edit(Deck $deck)
    {
        $this->authorize('update', $deck);

        $deck->load(['deckCards.pokemonCard']);

        $user = Auth::user();
        $collection = $user->pokemonCollection()
            ->with('pokemonCard')
            ->get();

        return Inertia::render('Pokemon/Decks/Edit', [
            'deck' => $deck,
            'collection' => $collection,
        ]);
    }

    /**
     * Update the specified deck
     */
    public function update(Request $request, Deck $deck)
    {
        $this->authorize('update', $deck);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'format' => 'nullable|string|max:100',
            'notes' => 'nullable|string|max:1000',
            'cards' => 'required|array|min:1',
            'cards.*.pokemon_card_id' => 'required|exists:pokemon_cards,id',
            'cards.*.quantity' => 'required|integer|min:1|max:4',
        ]);

        // Update the deck
        $deck->update([
            'name' => $validated['name'],
            'format' => $validated['format'] ?? null,
            'notes' => $validated['notes'] ?? null,
        ]);

        // Delete existing deck cards
        DeckCard::where('deck_id', $deck->id)->delete();

        // Add the updated cards to the deck
        foreach ($validated['cards'] as $card) {
            DeckCard::create([
                'deck_id' => $deck->id,
                'pokemon_card_id' => $card['pokemon_card_id'],
                'quantity' => $card['quantity'],
            ]);
        }

        return redirect()->route('pokemon.decks.show', $deck->id)
            ->with('success', 'Deck updated successfully!');
    }

    /**
     * Remove the specified deck
     */
    public function destroy(Deck $deck)
    {
        $this->authorize('delete', $deck);

        // Delete deck cards first (can also be handled with cascade delete in migration)
        DeckCard::where('deck_id', $deck->id)->delete();

        // Delete the deck
        $deck->delete();

        return redirect()->route('pokemon.decks.index')
            ->with('success', 'Deck deleted successfully!');
    }

    /**
     * Share a deck with a unique URL
     */
    public function share(Deck $deck)
    {
        $this->authorize('view', $deck);

        // Generate a share token if it doesn't exist
        if (!$deck->share_token) {
            $deck->share_token = Str::random(16);
            $deck->save();
        }

        $shareUrl = route('pokemon.decks.shared', $deck->share_token);

        return back()->with([
            'success' => 'Deck share link generated!',
            'shareUrl' => $shareUrl
        ]);
    }

    /**
     * View a shared deck
     */
    public function viewShared($token)
    {
        $deck = Deck::where('share_token', $token)->firstOrFail();
        $deck->load(['deckCards.pokemonCard', 'user:id,name']);

        return Inertia::render('Pokemon/Decks/SharedView', [
            'deck' => $deck,
            'sharedBy' => $deck->user->name
        ]);
    }
}
