<?php

namespace App\Http\Controllers\PokemonCard;

use App\Http\Controllers\Controller;
use App\Models\MetaDeck;
use Illuminate\Http\Request;

class MetaDeckController extends Controller
{
    /**
     * Display a listing of meta decks.
     */
    public function index(Request $request) {}

    /**
     * Store a newly created meta deck in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'format' => 'required|string',
            'source' => 'required|string',
            'usage_rate' => 'required|numeric',
            'win_rate' => 'required|numeric',
            'deck_data' => 'required|array',
        ]);

        // The deck_data is automatically JSON encoded by Laravel
        // due to the 'array' cast in the MetaDeck model
        $metaDeck = MetaDeck::create($validated);

        return response()->json($metaDeck, 201);
    }

    /**
     * Display the specified meta deck.
     */
    public function show(MetaDeck $metaDeck) {}
}
