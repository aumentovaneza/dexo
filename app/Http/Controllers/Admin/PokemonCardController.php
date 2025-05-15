<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PokemonCard;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PokemonCardController extends Controller
{
    /**
     * Display a listing of Pokemon cards.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $cards = PokemonCard::orderBy('name')->paginate(15);
        return Inertia::render('Admin/Pokemon/Cards', [
            'cards' => $cards
        ]);
    }

    /**
     * Show the form for creating a new Pokemon card.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Admin/Pokemon/CreateCard');
    }

    /**
     * Store a newly created Pokemon card in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'supertype' => 'required|string|max:255',
            'subtype' => 'nullable|string|max:255',
            'type' => 'nullable|string|max:255',
            'set' => 'required|string|max:255',
            'rarity' => 'nullable|string|max:255',
            'image_url' => 'required|url',
            'is_legal' => 'boolean',
        ]);

        PokemonCard::create($validated);

        return redirect()->route('admin.pokemon.cards')->with('success', 'Pokemon card created successfully.');
    }

    /**
     * Show the form for editing the specified Pokemon card.
     *
     * @param  \App\Models\PokemonCard  $pokemonCard
     * @return \Inertia\Response
     */
    public function edit(PokemonCard $pokemonCard)
    {
        return Inertia::render('Admin/Pokemon/EditCard', [
            'card' => $pokemonCard
        ]);
    }

    /**
     * Update the specified Pokemon card in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\PokemonCard  $pokemonCard
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, PokemonCard $pokemonCard)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'supertype' => 'required|string|max:255',
            'subtype' => 'nullable|string|max:255',
            'type' => 'nullable|string|max:255',
            'set' => 'required|string|max:255',
            'rarity' => 'nullable|string|max:255',
            'image_url' => 'required|url',
            'is_legal' => 'boolean',
        ]);

        $pokemonCard->update($validated);

        return redirect()->route('admin.pokemon.cards')->with('success', 'Pokemon card updated successfully.');
    }

    /**
     * Remove the specified Pokemon card from storage.
     *
     * @param  \App\Models\PokemonCard  $pokemonCard
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(PokemonCard $pokemonCard)
    {
        $pokemonCard->delete();

        return redirect()->route('admin.pokemon.cards')->with('success', 'Pokemon card deleted successfully.');
    }
}
