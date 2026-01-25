<?php

namespace App\Http\Controllers;

use App\Models\PokemonCard;
use App\Models\PriceHistory;
use App\Services\PriceTrackingService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PriceTrackingController extends Controller
{
    protected $priceService;

    public function __construct(PriceTrackingService $priceService)
    {
        $this->priceService = $priceService;
    }

    /**
     * Display price tracking dashboard
     */
    public function index()
    {
        $marketTrends = $this->priceService->getMarketTrends();
        $priceAlerts = Auth::check() ? $this->priceService->getPriceAlerts(Auth::id()) : [];

        return Inertia::render('Pokemon/Prices', [
            'marketTrends' => $marketTrends,
            'priceAlerts' => $priceAlerts,
        ]);
    }

    /**
     * Get price data for a specific card
     */
    public function cardPrice(PokemonCard $card)
    {
        $currentPrice = $this->priceService->getCurrentPrice($card);
        $priceHistory = $this->priceService->getPriceHistory($card);

        return response()->json([
            'current' => $currentPrice,
            'history' => $priceHistory,
        ]);
    }

    /**
     * Get price alerts for the authenticated user
     */
    public function alerts()
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $alerts = $this->priceService->getPriceAlerts(Auth::id());
        return response()->json($alerts);
    }

    /**
     * Update prices for multiple cards (admin function)
     */
    public function updatePrices(Request $request)
    {
        $request->validate([
            'card_ids' => 'required|array',
            'card_ids.*' => 'integer|exists:pokemon_cards,id',
        ]);

        $results = $this->priceService->updateMultiplePrices($request->card_ids);

        return response()->json([
            'success' => true,
            'results' => $results,
        ]);
    }

    /**
     * Get market trends data
     */
    public function marketTrends()
    {
        $trends = $this->priceService->getMarketTrends();
        return response()->json($trends);
    }

    /**
     * Get price history for a card
     */
    public function priceHistory(PokemonCard $card, Request $request)
    {
        $days = $request->get('days', 30);
        $history = $this->priceService->getPriceHistory($card, $days);

        return response()->json($history);
    }
}
