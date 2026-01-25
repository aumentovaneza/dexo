import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Analytics({ auth, analytics }) {
    const [selectedPeriod, setSelectedPeriod] = useState("30d");
    const [activeTab, setActiveTab] = useState("overview");

    const periods = [
        { value: "7d", label: "7 Days" },
        { value: "30d", label: "30 Days" },
        { value: "90d", label: "3 Months" },
        { value: "1y", label: "1 Year" },
    ];

    const formatNumber = (num) => {
        return new Intl.NumberFormat('en-US').format(num);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    return (
        <AdminLayout>
            <Head title="Analytics" />

            <div className="py-6 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-text mb-2">
                        Analytics Dashboard
                    </h1>
                    <p className="text-text-muted">
                        Monitor platform performance and user engagement
                    </p>
                </div>

                {/* Period Selector */}
                <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                        {periods.map((period) => (
                            <button
                                key={period.value}
                                onClick={() => setSelectedPeriod(period.value)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                    selectedPeriod === period.value
                                        ? "bg-primary text-background"
                                        : "bg-surface text-text-muted hover:bg-surface/80"
                                }`}
                            >
                                {period.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-surface p-6 rounded-lg shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <span className="text-sm text-text-muted">Total Users</span>
                        </div>
                        <div className="text-2xl font-bold text-text">
                            {formatNumber(analytics?.totalUsers || 0)}
                        </div>
                        <div className="text-sm text-success mt-1">
                            +{analytics?.newUsersThisPeriod || 0} this period
                        </div>
                    </div>

                    <div className="bg-surface p-6 rounded-lg shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <span className="text-sm text-text-muted">Total Trades</span>
                        </div>
                        <div className="text-2xl font-bold text-text">
                            {formatNumber(analytics?.totalTrades || 0)}
                        </div>
                        <div className="text-sm text-success mt-1">
                            +{analytics?.tradesThisPeriod || 0} this period
                        </div>
                    </div>

                    <div className="bg-surface p-6 rounded-lg shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span className="text-sm text-text-muted">Market Volume</span>
                        </div>
                        <div className="text-2xl font-bold text-text">
                            {formatCurrency(analytics?.marketVolume || 0)}
                        </div>
                        <div className="text-sm text-success mt-1">
                            +{analytics?.volumeChangePercent || 0}% this period
                        </div>
                    </div>

                    <div className="bg-surface p-6 rounded-lg shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                            <span className="text-sm text-text-muted">Active Rate</span>
                        </div>
                        <div className="text-2xl font-bold text-text">
                            {analytics?.activeRate || 0}%
                        </div>
                        <div className="text-sm text-text-muted mt-1">
                            Daily active users
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-surface mb-6">
                    <nav className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab("overview")}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === "overview"
                                    ? "border-primary text-primary"
                                    : "border-transparent text-text-muted hover:text-text"
                            }`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab("users")}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === "users"
                                    ? "border-primary text-primary"
                                    : "border-transparent text-text-muted hover:text-text"
                            }`}
                        >
                            Users
                        </button>
                        <button
                            onClick={() => setActiveTab("trades")}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === "trades"
                                    ? "border-primary text-primary"
                                    : "border-transparent text-text-muted hover:text-text"
                            }`}
                        >
                            Trades
                        </button>
                        <button
                            onClick={() => setActiveTab("performance")}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === "performance"
                                    ? "border-primary text-primary"
                                    : "border-transparent text-text-muted hover:text-text"
                            }`}
                        >
                            Performance
                        </button>
                    </nav>
                </div>

                {/* Tab Content */}
                {activeTab === "overview" && (
                    <div className="space-y-6">
                        {/* Chart Placeholder */}
                        <div className="bg-surface p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-text mb-4">Platform Growth</h3>
                            <div className="h-64 bg-background rounded-lg flex items-center justify-center">
                                <div className="text-center text-text-muted">
                                    <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                    <p>Growth chart would go here</p>
                                    <p className="text-sm">Integration with charting library needed</p>
                                </div>
                            </div>
                        </div>

                        {/* Top Metrics */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-surface p-6 rounded-lg shadow">
                                <h3 className="text-lg font-semibold text-text mb-4">Top Collectors</h3>
                                <div className="space-y-3">
                                    {analytics?.topCollectors?.map((collector, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <div className="text-lg font-bold text-text-muted">#{index + 1}</div>
                                                <div>
                                                    <div className="font-medium text-text">{collector.name}</div>
                                                    <div className="text-sm text-text-muted">{collector.email}</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-medium text-text">{formatNumber(collection.cardCount)}</div>
                                                <div className="text-sm text-text-muted">{formatCurrency(collection.value)}</div>
                                            </div>
                                        </div>
                                    )) || (
                                        <div className="text-center text-text-muted py-8">
                                            No collector data available
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="bg-surface p-6 rounded-lg shadow">
                                <h3 className="text-lg font-semibold text-text mb-4">Most Traded Cards</h3>
                                <div className="space-y-3">
                                    {analytics?.mostTradedCards?.map((card, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <div className="text-lg font-bold text-text-muted">#{index + 1}</div>
                                                <div>
                                                    <div className="font-medium text-text">{card.name}</div>
                                                    <div className="text-sm text-text-muted">{card.set}</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-medium text-text">{card.tradeCount} trades</div>
                                                <div className="text-sm text-text-muted">{formatCurrency(card.avgPrice)}</div>
                                            </div>
                                        </div>
                                    )) || (
                                        <div className="text-center text-text-muted py-8">
                                            No card data available
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "users" && (
                    <div className="space-y-6">
                        <div className="bg-surface p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-text mb-4">User Analytics</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <div className="text-2xl font-bold text-text">{formatNumber(analytics?.newUsersThisPeriod || 0)}</div>
                                    <div className="text-sm text-text-muted">New Users</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-text">{analytics?.retentionRate || 0}%</div>
                                    <div className="text-sm text-text-muted">Retention Rate</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-text">{analytics?.avgSessionDuration || 0}m</div>
                                    <div className="text-sm text-text-muted">Avg Session</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-surface p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-text mb-4">User Activity</h3>
                            <div className="h-64 bg-background rounded-lg flex items-center justify-center">
                                <div className="text-center text-text-muted">
                                    <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                    <p>User activity chart would go here</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "trades" && (
                    <div className="space-y-6">
                        <div className="bg-surface p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-text mb-4">Trade Statistics</h3>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div>
                                    <div className="text-2xl font-bold text-text">{formatNumber(analytics?.totalTrades || 0)}</div>
                                    <div className="text-sm text-text-muted">Total Trades</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-text">{analytics?.successRate || 0}%</div>
                                    <div className="text-sm text-text-muted">Success Rate</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-text">{formatCurrency(analytics?.avgTradeValue || 0)}</div>
                                    <div className="text-sm text-text-muted">Avg Trade Value</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-text">{analytics?.avgTradeTime || 0}d</div>
                                    <div className="text-sm text-text-muted">Avg Completion Time</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-surface p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-text mb-4">Trade Volume Trends</h3>
                            <div className="h-64 bg-background rounded-lg flex items-center justify-center">
                                <div className="text-center text-text-muted">
                                    <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                    <p>Trade volume chart would go here</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "performance" && (
                    <div className="space-y-6">
                        <div className="bg-surface p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-text mb-4">System Performance</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <div className="text-2xl font-bold text-text">{analytics?.avgResponseTime || 0}ms</div>
                                    <div className="text-sm text-text-muted">Avg Response Time</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-text">{analytics?.uptime || 0}%</div>
                                    <div className="text-sm text-text-muted">Uptime</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-text">{analytics?.errorRate || 0}%</div>
                                    <div className="text-sm text-text-muted">Error Rate</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-surface p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-text mb-4">API Usage</h3>
                            <div className="h-64 bg-background rounded-lg flex items-center justify-center">
                                <div className="text-center text-text-muted">
                                    <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                    <p>API usage chart would go here</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
