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
     * Display the specified Pokemon card.
     *
     * @param  \App\Models\PokemonCard  $pokemonCard
     * @return \Inertia\Response
     */
    public function show(PokemonCard $pokemonCard)
    {
        return Inertia::render('Admin/Pokemon/Card', [
            'card' => $pokemonCard
        ]);
    }
}
