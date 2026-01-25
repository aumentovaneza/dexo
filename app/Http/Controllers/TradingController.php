<?php

namespace App\Http\Controllers;

use App\Models\Trade;
use App\Models\User;
use App\Services\TradingSystemService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TradingController extends Controller
{
    protected $tradingService;

    public function __construct(TradingSystemService $tradingService)
    {
        $this->tradingService = $tradingService;
    }

    /**
     * Display the trading dashboard
     */
    public function index()
    {
        $user = Auth::user();
        
        $trades = Trade::where(function($query) use ($user) {
            $query->where('user_id', $user->id)
                  ->orWhere('recipient_id', $user->id);
        })->with(['user', 'recipient', 'tradeItems.pokemonCard'])
          ->orderBy('created_at', 'desc')
          ->get();

        $stats = [
            'activeTrades' => $trades->where('status', 'pending')->count(),
            'completedTrades' => $trades->where('status', 'completed')->count(),
            'totalValue' => '$' . number_format($trades->sum(function($trade) {
                return $trade->tradeItems->where('is_offering', true)->sum('estimated_value');
            }), 2),
            'tradingPartners' => $trades->pluck('user_id')
                               ->merge($trades->pluck('recipient_id'))
                               ->unique()
                               ->count() - 1, // Exclude current user
        ];

        return Inertia::render('Trading/Dashboard', [
            'auth' => Auth::user(),
            'trades' => $trades->map(function($trade) use ($user) {
                return [
                    'id' => $trade->id,
                    'status' => $trade->status,
                    'trade_type' => $trade->trade_type,
                    'recipient' => $trade->recipient,
                    'user' => $trade->user,
                    'items_count' => $trade->tradeItems->count(),
                    'shipping_cost' => $trade->shipping_cost,
                    'created_at' => $trade->created_at->diffForHumans(),
                    'expires_at' => $trade->expires_at->diffForHumans(),
                ];
            }),
            'stats' => $stats,
        ]);
    }

    /**
     * Show the create trade form
     */
    public function create()
    {
        $user = Auth::user();
        
        $collection = $user->pokemonCollection()
            ->with('pokemonCard')
            ->get();

        $users = User::where('id', '!=', $user->id)
            ->where('id', '!=', 1) // Exclude admin
            ->get()
            ->map(function($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'country' => $user->country ?? 'US',
                    'city' => $user->city ?? 'Unknown',
                    'trades_count' => Trade::where(function($query) use ($user) {
                        $query->where('user_id', $user->id)
                              ->orWhere('recipient_id', $user->id);
                    })->count(),
                    'rating' => $user->rating ?? 'N/A',
                ];
            });

        return Inertia::render('Trading/Create', [
            'auth' => Auth::user(),
            'collection' => $collection,
            'users' => $users,
        ]);
    }

    /**
     * Store a new trade offer
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'recipient_id' => 'required|exists:users,id',
            'trade_type' => 'required|in:local,international',
            'offering' => 'required|array|min:1',
            'offering.*.card_id' => 'required|exists:pokemon_cards,id',
            'offering.*.quantity' => 'required|integer|min:1',
            'offering.*.condition' => 'required|in:Mint,Near Mint,Excellent,Good,Played',
            'requesting' => 'nullable|array',
            'requesting.*.card_id' => 'required|exists:pokemon_cards,id',
            'requesting.*.quantity' => 'required|integer|min:1',
            'requesting.*.condition' => 'required|in:Mint,Near Mint,Excellent,Good,Played',
            'notes' => 'nullable|string|max:1000',
            'shipping_method' => 'nullable|string',
            'shipping_cost' => 'nullable|numeric|min:0',
        ]);

        try {
            $trade = $this->tradingService->createTradeOffer(Auth::id(), $validated);
            
            return redirect()->route('trading.dashboard')
                ->with('success', 'Trade offer created successfully!');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to create trade offer: ' . $e->getMessage());
        }
    }

    /**
     * Show trade details
     */
    public function show(Trade $trade)
    {
        $this->authorize('view', $trade);
        
        $trade->load(['user', 'recipient', 'tradeItems.pokemonCard']);
        
        $shippingOptions = $this->tradingService->calculateShippingOptions($trade);
        $safetyRecommendations = $this->tradingService->getSafetyRecommendations($trade);
        $currencyConversion = $this->tradingService->calculateCurrencyConversion($trade);
        
        if ($trade->trade_type === 'international') {
            $customsDeclaration = $this->tradingService->generateCustomsDeclaration($trade);
            $validation = $this->tradingService->validateInternationalTrade($trade);
        }

        return Inertia::render('Trading/Show', [
            'trade' => $trade,
            'shippingOptions' => $shippingOptions,
            'safetyRecommendations' => $safetyRecommendations,
            'currencyConversion' => $currencyConversion,
            'customsDeclaration' => $customsDeclaration ?? null,
            'validation' => $validation ?? null,
        ]);
    }

    /**
     * Accept a trade offer
     */
    public function accept(Trade $trade)
    {
        $this->authorize('accept', $trade);
        
        if ($trade->recipient_id !== Auth::id()) {
            return back()->with('error', 'You cannot accept this trade offer.');
        }

        if ($trade->status !== 'pending') {
            return back()->with('error', 'This trade is no longer pending.');
        }

        $trade->update([
            'status' => 'accepted',
            'accepted_at' => now(),
        ]);

        return back()->with('success', 'Trade accepted successfully!');
    }

    /**
     * Reject a trade offer
     */
    public function reject(Trade $trade)
    {
        $this->authorize('reject', $trade);
        
        if ($trade->recipient_id !== Auth::id()) {
            return back()->with('error', 'You cannot reject this trade offer.');
        }

        if ($trade->status !== 'pending') {
            return back()->with('error', 'This trade is no longer pending.');
        }

        $trade->update(['status' => 'rejected']);

        return back()->with('success', 'Trade rejected.');
    }

    /**
     * Cancel a trade offer
     */
    public function cancel(Trade $trade)
    {
        $this->authorize('cancel', $trade);
        
        if ($trade->user_id !== Auth::id()) {
            return back()->with('error', 'You cannot cancel this trade offer.');
        }

        if (!$trade->canBeCancelled()) {
            return back()->with('error', 'This trade cannot be cancelled.');
        }

        $trade->update(['status' => 'cancelled']);

        return back()->with('success', 'Trade cancelled.');
    }

    /**
     * Complete a trade
     */
    public function complete(Trade $trade)
    {
        $this->authorize('complete', $trade);
        
        if ($trade->status !== 'accepted') {
            return back()->with('error', 'Trade must be accepted before completion.');
        }

        $trade->update([
            'status' => 'completed',
            'completed_at' => now(),
        ]);

        return back()->with('success', 'Trade completed successfully!');
    }

    /**
     * Get shipping options for a trade
     */
    public function shippingOptions(Trade $trade)
    {
        $this->authorize('view', $trade);
        
        $options = $this->tradingService->calculateShippingOptions($trade);
        
        return response()->json($options);
    }

    /**
     * Get trading partners
     */
    public function tradingPartners()
    {
        $user = Auth::user();
        
        $partners = User::where('id', '!=', $user->id)
            ->where('country', $user->country) // Local partners first
            ->get()
            ->map(function($partner) {
                return [
                    'id' => $partner->id,
                    'name' => $partner->name,
                    'location' => $partner->city . ', ' . $partner->country,
                    'distance' => $this->calculateDistance($user, $partner),
                    'rating' => $partner->rating ?? 'N/A',
                    'trades_count' => Trade::where(function($query) use ($partner) {
                        $query->where('user_id', $partner->id)
                              ->orWhere('recipient_id', $partner->id);
                    })->count(),
                    'common_cards' => $this->getCommonCards($user, $partner),
                ];
            });

        return response()->json($partners);
    }

    /**
     * Get marketplace listings
     */
    public function marketplace(Request $request)
    {
        $query = User::where('id', '!=', Auth::id());
        
        // Filter by location preference
        if ($request->has('location')) {
            $location = $request->input('location');
            if ($location === 'local') {
                $query->where('country', Auth::user()->country);
            }
        }

        $users = $query->with('pokemonCollection.pokemonCard')
            ->get()
            ->map(function($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'location' => $user->city . ', ' . ($user->country ?? 'Unknown'),
                    'rating' => $user->rating ?? 'N/A',
                    'collection' => $user->pokemonCollection->map(function($item) {
                        return [
                            'pokemon_card' => $item->pokemonCard,
                            'quantity' => $item->quantity,
                            'condition' => $item->condition ?? 'Near Mint',
                        ];
                    }),
                ];
            });

        return response()->json($users);
    }

    // Helper methods
    private function calculateDistance($user1, $user2)
    {
        // Simplified distance calculation
        // In a real implementation, you'd use a geocoding service
        return rand(10, 500); // km
    }

    private function getCommonCards($user1, $user2)
    {
        $user1Cards = $user1->pokemonCollection()->pluck('pokemon_card_id');
        $user2Cards = $user2->pokemonCollection()->pluck('pokemon_card_id');
        
        return $user1Cards->intersect($user2Cards)->count();
    }
}
