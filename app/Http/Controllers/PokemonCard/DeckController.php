<?php

namespace App\Http\Controllers\PokemonCard;

use App\Http\Controllers\Controller;
use App\Models\Deck;
use App\Models\DeckCard;
use App\Models\PokemonCard;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DeckController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the user's decks.
     */
    public function index()
    {

    }

    /**
     * Show the form for creating a new deck.
     */
    public function create()
    {

    }

    /**
     * Store a newly created deck in storage.
     */
    public function store(Request $request)
    {
    }

    /**
     * Display the specified deck.
     */
    public function show(Deck $deck)
    {

    }

    /**
     * Show the form for editing the specified deck.
     */
    public function edit(Deck $deck)
    {

    }

    /**
     * Update the specified deck in storage.
     */
    public function update(Request $request, Deck $deck)
    {

    }

    /**
     * Remove the specified deck from storage.
     */
    public function destroy(Deck $deck)
    {

    }

    /**
     * Display the cards in a deck.
     */
    public function cards(Deck $deck)
    {

    }

    /**
     * Add a card to the deck.
     */
    public function addCard(Request $request, Deck $deck)
    {

    }

    /**
     * Update card quantity in the deck.
     */
    public function updateCard(Request $request, Deck $deck, DeckCard $card)
    {

    }

    /**
     * Remove a card from the deck.
     */
    public function removeCard(Deck $deck, DeckCard $card)
    {

    }
}
