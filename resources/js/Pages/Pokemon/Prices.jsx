import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";

export default function Prices({ auth, marketTrends, priceAlerts }) {
    const [activeTab, setActiveTab] = useState("market");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCard, setSelectedCard] = useState(null);
    const [priceHistory, setPriceHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [alerts, setAlerts] = useState(priceAlerts || []);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const formatPercent = (value) => {
        const sign = value > 0 ? '+' : '';
        return `${sign}${value.toFixed(2)}%`;
    };

    const fetchCardPrice = async (cardId) => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/prices/card/${cardId}`);
            const data = await response.json();
            setSelectedCard(data.current);
            setPriceHistory(data.history);
        } catch (error) {
            console.error('Error fetching card price:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const createPriceAlert = async (cardId, targetPrice, alertType) => {
        try {
            const response = await fetch('/api/prices/alerts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    card_id: cardId,
                    target_price: targetPrice,
                    alert_type: alertType
                })
            });
            
            if (response.ok) {
                // Refresh alerts
                const alertsResponse = await fetch('/api/prices/alerts');
                const alertsData = await alertsResponse.json();
                setAlerts(alertsData);
            }
        } catch (error) {
            console.error('Error creating price alert:', error);
        }
    };

    return (
        <MainLayout>
            <Head title="Price Tracking" />

            <div className="py-4 px-4 sm:py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-text mb-2">
                        Price Tracking
                    </h1>
                    <p className="text-text-muted">
                        Monitor card values and set price alerts for your collection
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search for cards to track prices..."
                            className="w-full px-4 py-3 pl-12 bg-surface border border-surface rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <svg
                            className="absolute left-4 top-3.5 w-5 h-5 text-text-muted"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-surface mb-6">
                    <nav className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab("market")}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === "market"
                                    ? "border-primary text-primary"
                                    : "border-transparent text-text-muted hover:text-text"
                            }`}
                        >
                            Market Overview
                        </button>
                        <button
                            onClick={() => setActiveTab("alerts")}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === "alerts"
                                    ? "border-primary text-primary"
                                    : "border-transparent text-text-muted hover:text-text"
                            }`}
                        >
                            Price Alerts
                            {alerts.length > 0 && (
                                <span className="ml-2 px-2 py-1 text-xs bg-primary text-background rounded-full">
                                    {alerts.length}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab("trends")}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === "trends"
                                    ? "border-primary text-primary"
                                    : "border-transparent text-text-muted hover:text-text"
                            }`}
                        >
                            Trends
                        </button>
                    </nav>
                </div>

                {/* Tab Content */}
                {activeTab === "market" && (
                    <div className="space-y-6">
                        {/* Market Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-surface p-6 rounded-lg shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                        </svg>
                                    </div>
                                    <span className="text-sm text-text-muted">Market Cap</span>
                                </div>
                                <div className="text-2xl font-bold text-text">
                                    {formatCurrency(marketTrends?.marketCap || 0)}
                                </div>
                                <div className="text-sm text-success mt-1">
                                    {formatPercent(marketTrends?.marketCapChange || 0)}
                                </div>
                            </div>

                            <div className="bg-surface p-6 rounded-lg shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm text-text-muted">Avg Price</span>
                                </div>
                                <div className="text-2xl font-bold text-text">
                                    {formatCurrency(marketTrends?.averagePrice || 0)}
                                </div>
                                <div className="text-sm text-danger mt-1">
                                    {formatPercent(marketTrends?.averagePriceChange || 0)}
                                </div>
                            </div>

                            <div className="bg-surface p-6 rounded-lg shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm text-text-muted">Volume</span>
                                </div>
                                <div className="text-2xl font-bold text-text">
                                    {formatNumber(marketTrends?.volume || 0)}
                                </div>
                                <div className="text-sm text-success mt-1">
                                    {formatPercent(marketTrends?.volumeChange || 0)}
                                </div>
                            </div>

                            <div className="bg-surface p-6 rounded-lg shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm text-text-muted">Active Listings</span>
                                </div>
                                <div className="text-2xl font-bold text-text">
                                    {formatNumber(marketTrends?.activeListings || 0)}
                                </div>
                                <div className="text-sm text-text-muted mt-1">
                                    Live now
                                </div>
                            </div>
                        </div>

                        {/* Trending Cards */}
                        <div className="bg-surface p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-text mb-4">Trending Cards</h3>
                            <div className="space-y-3">
                                {marketTrends?.trendingCards?.map((card, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 bg-background rounded-lg hover:bg-surface/50 transition cursor-pointer"
                                         onClick={() => fetchCardPrice(card.id)}>
                                        <div className="flex items-center space-x-4">
                                            <div className="text-lg font-bold text-text-muted">#{index + 1}</div>
                                            <div>
                                                <div className="font-medium text-text">{card.name}</div>
                                                <div className="text-sm text-text-muted">{card.set} • {card.rarity}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-medium text-text">{formatCurrency(card.currentPrice)}</div>
                                            <div className={`text-sm font-medium ${
                                                card.priceChange > 0 ? 'text-success' : card.priceChange < 0 ? 'text-danger' : 'text-text-muted'
                                            }`}>
                                                {formatPercent(card.priceChange)}
                                            </div>
                                        </div>
                                    </div>
                                )) || (
                                    <div className="text-center text-text-muted py-8">
                                        No trending cards available
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Card Price Details */}
                        {selectedCard && (
                            <div className="bg-surface p-6 rounded-lg shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-text">Price Details</h3>
                                    <button
                                        onClick={() => setSelectedCard(null)}
                                        className="text-text-muted hover:text-text"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-medium text-text mb-2">{selectedCard.name}</h4>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-text-muted">Current Price:</span>
                                                <span className="font-medium">{formatCurrency(selectedCard.price)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-text-muted">24h Change:</span>
                                                <span className={`font-medium ${
                                                    selectedCard.change24h > 0 ? 'text-success' : 'text-danger'
                                                }`}>
                                                    {formatPercent(selectedCard.change24h)}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-text-muted">7d Change:</span>
                                                <span className={`font-medium ${
                                                    selectedCard.change7d > 0 ? 'text-success' : 'text-danger'
                                                }`}>
                                                    {formatPercent(selectedCard.change7d)}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className="mt-4 space-y-2">
                                            <button
                                                onClick={() => createPriceAlert(selectedCard.id, selectedCard.price * 1.1, 'above')}
                                                className="w-full px-4 py-2 bg-success text-background rounded-lg hover:bg-success/90 transition"
                                            >
                                                Set Alert When Above {formatCurrency(selectedCard.price * 1.1)}
                                            </button>
                                            <button
                                                onClick={() => createPriceAlert(selectedCard.id, selectedCard.price * 0.9, 'below')}
                                                className="w-full px-4 py-2 bg-danger text-background rounded-lg hover:bg-danger/90 transition"
                                            >
                                                Set Alert When Below {formatCurrency(selectedCard.price * 0.9)}
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <h4 className="font-medium text-text mb-2">Price History</h4>
                                        <div className="h-48 bg-background rounded-lg flex items-center justify-center">
                                            <div className="text-center text-text-muted">
                                                <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                </svg>
                                                <p>Price chart would go here</p>
                                                <p className="text-sm">Integration with charting library needed</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "alerts" && (
                    <div className="space-y-6">
                        <div className="bg-surface p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-text mb-4">Your Price Alerts</h3>
                            <div className="space-y-3">
                                {alerts.length > 0 ? (
                                    alerts.map((alert, index) => (
                                        <div key={index} className="flex items-center justify-between p-4 bg-background rounded-lg">
                                            <div className="flex items-center space-x-4">
                                                <div className={`w-3 h-3 rounded-full ${
                                                    alert.alert_type === 'above' ? 'bg-success' : 'bg-danger'
                                                }`}></div>
                                                <div>
                                                    <div className="font-medium text-text">{alert.card_name}</div>
                                                    <div className="text-sm text-text-muted">
                                                        Alert when {alert.alert_type} {formatCurrency(alert.target_price)}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                    alert.is_triggered 
                                                        ? 'bg-warning/10 text-warning' 
                                                        : 'bg-primary/10 text-primary'
                                                }`}>
                                                    {alert.is_triggered ? 'Triggered' : 'Active'}
                                                </span>
                                                <button className="text-text-muted hover:text-danger">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-text-muted py-8">
                                        <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                        </svg>
                                        <p>No price alerts set</p>
                                        <p className="text-sm">Search for cards and set alerts to track their prices</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "trends" && (
                    <div className="space-y-6">
                        <div className="bg-surface p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-text mb-4">Market Trends Analysis</h3>
                            <div className="h-64 bg-background rounded-lg flex items-center justify-center">
                                <div className="text-center text-text-muted">
                                    <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                    <p>Market trends chart would go here</p>
                                    <p className="text-sm">Integration with charting library needed</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-surface p-6 rounded-lg shadow">
                                <h3 className="text-lg font-semibold text-text mb-4">Top Gainers</h3>
                                <div className="space-y-3">
                                    {marketTrends?.topGainers?.map((card, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <div>
                                                <div className="font-medium text-text">{card.name}</div>
                                                <div className="text-sm text-text-muted">{card.set}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-medium text-success">{formatPercent(card.change)}</div>
                                                <div className="text-sm text-text-muted">{formatCurrency(card.price)}</div>
                                            </div>
                                        </div>
                                    )) || (
                                        <div className="text-center text-text-muted py-4">
                                            No gainer data available
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="bg-surface p-6 rounded-lg shadow">
                                <h3 className="text-lg font-semibold text-text mb-4">Top Losers</h3>
                                <div className="space-y-3">
                                    {marketTrends?.topLosers?.map((card, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <div>
                                                <div className="font-medium text-text">{card.name}</div>
                                                <div className="text-sm text-text-muted">{card.set}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-medium text-danger">{formatPercent(card.change)}</div>
                                                <div className="text-sm text-text-muted">{formatCurrency(card.price)}</div>
                                            </div>
                                        </div>
                                    )) || (
                                        <div className="text-center text-text-muted py-4">
                                            No loser data available
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}

function formatNumber(num) {
    return new Intl.NumberFormat('en-US').format(num);
}
