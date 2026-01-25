<?php

namespace App\Http\Controllers\PokemonCard;

use App\Http\Controllers\Controller;
use App\Models\PokemonCard;
use App\Services\PokemonSearchService;
use Illuminate\Http\Request;

class PokemonCardController extends Controller
{
    protected $searchService;

    public function __construct(PokemonSearchService $searchService)
    {
        $this->searchService = $searchService;
    }

    /**
     * Display a listing of Pokemon cards.
     */
    public function index(Request $request)
    {
        $filterOptions = $this->searchService->getFilterOptions();
        
        if ($request->hasAny(['search', 'types', 'supertypes', 'rarities', 'sets'])) {
            $results = $this->searchService->searchCards($request);
            return response()->json($results);
        }

        return inertia('Pokemon/Cards', [
            'filterOptions' => $filterOptions,
        ]);
    }

    /**
     * Search for Pokemon cards based on various criteria.
     */
    public function search(Request $request)
    {
        $results = $this->searchService->searchCards($request);
        return response()->json($results);
    }

    /**
     * Get search suggestions for autocomplete.
     */
    public function suggestions(Request $request)
    {
        $query = $request->input('q', '');
        $suggestions = $this->searchService->getSearchSuggestions($query);
        return response()->json($suggestions);
    }

    /**
     * Get available filter options.
     */
    public function filterOptions()
    {
        $options = $this->searchService->getFilterOptions();
        return response()->json($options);
    }

    /**
     * Display details for a specific Pokemon card.
     */
    public function show(PokemonCard $pokemonCard)
    {
        return inertia('Pokemon/CardDetails', [
            'card' => $pokemonCard,
        ]);
    }
}
