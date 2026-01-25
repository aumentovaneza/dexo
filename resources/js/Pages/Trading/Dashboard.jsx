import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";

export default function TradingDashboard({ auth, trades, stats }) {
    const [activeTab, setActiveTab] = useState("overview");
    const [tradeType, setTradeType] = useState("all"); // all, local, international

    return (
        <MainLayout>
            <Head title="Trading Center" />

            <div className="py-4 px-4 sm:py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-text mb-2">Trading Center</h1>
                    <p className="text-text-muted">Connect with collectors worldwide and expand your collection</p>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-surface p-4 rounded-lg shadow">
                        <div className="flex items-center justify-between mb-2">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                </svg>
                            </div>
                            <span className="text-2xl font-bold text-primary">{stats.activeTrades}</span>
                        </div>
                        <div className="text-sm text-text-muted">Active Trades</div>
                    </div>

                    <div className="bg-surface p-4 rounded-lg shadow">
                        <div className="flex items-center justify-between mb-2">
                            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span className="text-2xl font-bold text-primary">{stats.completedTrades}</span>
                        </div>
                        <div className="text-sm text-text-muted">Completed</div>
                    </div>

                    <div className="bg-surface p-4 rounded-lg shadow">
                        <div className="flex items-center justify-between mb-2">
                            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012 2 2.5 2.5 0 004.95-.5A2.5 2.5 0 0119.5 8h.5a2 2 0 012-2v-1.565M17 15l-3 3m0 0l-3-3m3 3V12" />
                                </svg>
                            </div>
                            <span className="text-2xl font-bold text-primary">{stats.totalValue}</span>
                        </div>
                        <div className="text-sm text-text-muted">Total Value</div>
                    </div>

                    <div className="bg-surface p-4 rounded-lg shadow">
                        <div className="flex items-center justify-between mb-2">
                            <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <span className="text-2xl font-bold text-primary">{stats.tradingPartners}</span>
                        </div>
                        <div className="text-sm text-text-muted">Partners</div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <button className="flex-1 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition">
                        <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Create Trade Offer
                    </button>
                    <button className="flex-1 bg-surface border border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary/10 transition">
                        <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Find Trading Partners
                    </button>
                </div>

                {/* Navigation Tabs */}
                <div className="border-b border-surface mb-6">
                    <div className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab("overview")}
                            className={`py-2 px-1 border-b-2 font-medium text-sm transition ${
                                activeTab === "overview"
                                    ? "border-primary text-primary"
                                    : "border-transparent text-text-muted hover:text-text hover:border-surface"
                            }`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab("my-trades")}
                            className={`py-2 px-1 border-b-2 font-medium text-sm transition ${
                                activeTab === "my-trades"
                                    ? "border-primary text-primary"
                                    : "border-transparent text-text-muted hover:text-text hover:border-surface"
                            }`}
                        >
                            My Trades ({trades.length})
                        </button>
                        <button
                            onClick={() => setActiveTab("marketplace")}
                            className={`py-2 px-1 border-b-2 font-medium text-sm transition ${
                                activeTab === "marketplace"
                                    ? "border-primary text-primary"
                                    : "border-transparent text-text-muted hover:text-text hover:border-surface"
                            }`}
                        >
                            Marketplace
                        </button>
                        <button
                            onClick={() => setActiveTab("history")}
                            className={`py-2 px-1 border-b-2 font-medium text-sm transition ${
                                activeTab === "history"
                                    ? "border-primary text-primary"
                                    : "border-transparent text-text-muted hover:text-text hover:border-surface"
                            }`}
                        >
                            History
                        </button>
                    </div>
                </div>

                {/* Filter for trade type */}
                <div className="flex gap-2 mb-6 overflow-x-auto">
                    {["all", "local", "international"].map((type) => (
                        <button
                            key={type}
                            onClick={() => setTradeType(type)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                                tradeType === type
                                    ? "bg-primary text-white"
                                    : "bg-surface text-text-muted hover:bg-surface-alt"
                            }`}
                        >
                            {type === "all" && "All Trades"}
                            {type === "local" && "🏠 Local Only"}
                            {type === "international" && "🌐 International"}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                {activeTab === "overview" && (
                    <div className="space-y-6">
                        {/* Recent Activity */}
                        <div className="bg-surface rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold text-text mb-4">Recent Activity</h2>
                            <div className="space-y-4">
                                {trades.slice(0, 5).map((trade) => (
                                    <div key={trade.id} className="flex items-center justify-between p-3 bg-surface-alt rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-3 h-3 rounded-full ${
                                                trade.status === 'completed' ? 'bg-green-500' :
                                                trade.status === 'accepted' ? 'bg-blue-500' :
                                                trade.status === 'pending' ? 'bg-yellow-500' : 'bg-gray-400'
                                            }`} />
                                            <div>
                                                <p className="font-medium text-text">
                                                    Trade with {trade.recipient.name}
                                                </p>
                                                <p className="text-sm text-text-muted">
                                                    {trade.trade_type === 'international' ? '🌐 International' : '🏠 Local'} • {trade.items_count} items
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-text">{trade.status}</p>
                                            <p className="text-xs text-text-muted">{trade.created_at}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Trading Tips */}
                        <div className="bg-surface rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold text-text mb-4">Trading Tips</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 flex-shrink-0 mt-0.5">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-text">Verify Trader Reputation</p>
                                            <p className="text-sm text-text-muted">Check feedback scores and recent trades</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 flex-shrink-0 mt-0.5">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-text">Document Everything</p>
                                            <p className="text-sm text-text-muted">Take photos and keep all receipts</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 flex-shrink-0 mt-0.5">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-text">Use Tracked Shipping</p>
                                            <p className="text-sm text-text-muted">Always use tracking for international trades</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 flex-shrink-0 mt-0.5">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-text">Complete Customs Forms</p>
                                            <p className="text-sm text-text-muted">Accurate declarations prevent delays</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "my-trades" && (
                    <div className="space-y-4">
                        {trades.length === 0 ? (
                            <div className="text-center py-12">
                                <svg className="mx-auto h-12 w-12 text-text-muted mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                                <h3 className="text-lg font-medium text-text mb-2">No trades yet</h3>
                                <p className="text-text-muted mb-4">Start trading to connect with other collectors</p>
                                <button className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition">
                                    Create Your First Trade
                                </button>
                            </div>
                        ) : (
                            trades.map((trade) => (
                                <TradeCard key={trade.id} trade={trade} />
                            ))
                        )}
                    </div>
                )}

                {activeTab === "marketplace" && (
                    <div className="bg-surface rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold text-text mb-4">Trading Marketplace</h2>
                        <p className="text-text-muted mb-4">Browse available cards and find trading partners</p>
                        <div className="text-center py-8">
                            <svg className="mx-auto h-12 w-12 text-text-muted mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <p className="text-text-muted">Marketplace coming soon!</p>
                        </div>
                    </div>
                )}

                {activeTab === "history" && (
                    <div className="bg-surface rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold text-text mb-4">Trading History</h2>
                        <p className="text-text-muted mb-4">View your completed trades and statistics</p>
                        <div className="text-center py-8">
                            <svg className="mx-auto h-12 w-12 text-text-muted mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-text-muted">Trading history coming soon!</p>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}

// Trade Card Component
function TradeCard({ trade }) {
    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800';
            case 'accepted': return 'bg-blue-100 text-blue-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-surface rounded-lg shadow p-6 hover:shadow-md transition">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div>
                    <h3 className="font-semibold text-text">Trade with {trade.recipient.name}</h3>
                    <p className="text-sm text-text-muted">
                        {trade.trade_type === 'international' ? '🌐 International' : '🏠 Local'} • {trade.items_count} items
                    </p>
                </div>
                <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(trade.status)}`}>
                        {trade.status}
                    </span>
                    {trade.shipping_cost && (
                        <span className="text-sm text-text-muted">
                            Shipping: ${trade.shipping_cost}
                        </span>
                    )}
                </div>
            </div>
            
            <div className="flex justify-between items-center">
                <div className="text-sm text-text-muted">
                    Created {trade.created_at}
                    {trade.expires_at && ` • Expires ${trade.expires_at}`}
                </div>
                <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-surface hover:bg-surface-alt text-text text-sm rounded-lg transition">
                        View Details
                    </button>
                    {trade.status === 'pending' && (
                        <button className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 text-sm rounded-lg transition">
                            Cancel
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
