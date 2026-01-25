<?php

namespace App\Http\Controllers;

use App\Services\CollectionStatisticsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CollectionStatisticsController extends Controller
{
    protected $collectionStatsService;

    public function __construct(CollectionStatisticsService $collectionStatsService)
    {
        $this->collectionStatsService = $collectionStatsService;
    }

    /**
     * Display the collection statistics dashboard
     */
    public function index()
    {
        $stats = $this->collectionStatsService->getUserCollectionStats();
        $trends = $this->collectionStatsService->getCollectionTrends();
        $insights = $this->collectionStatsService->getCollectionInsights();

        return Inertia::render('Pokemon/Statistics', [
            'stats' => $stats,
            'trends' => $trends,
            'insights' => $insights,
        ]);
    }

    /**
     * Get collection statistics as JSON (for API usage)
     */
    public function apiStats()
    {
        $stats = $this->collectionStatsService->getUserCollectionStats();
        
        return response()->json($stats);
    }

    /**
     * Get collection trends as JSON
     */
    public function apiTrends()
    {
        $trends = $this->collectionStatsService->getCollectionTrends();
        
        return response()->json($trends);
    }
}
