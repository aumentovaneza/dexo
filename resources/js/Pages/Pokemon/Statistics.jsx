import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";

export default function Statistics({ auth, stats, trends, insights }) {
    const [activeTab, setActiveTab] = useState("overview");
    const [selectedPeriod, setSelectedPeriod] = useState("30d");
    const [isLoading, setIsLoading] = useState(false);

    const periods = [
        { value: "7d", label: "7 Days" },
        { value: "30d", label: "30 Days" },
        { value: "90d", label: "3 Months" },
        { value: "1y", label: "1 Year" },
    ];

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const formatNumber = (num) => {
        return new Intl.NumberFormat('en-US').format(num);
    };

    return (
        <MainLayout>
            <Head title="Collection Statistics" />

            <div className="py-4 px-4 sm:py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-text mb-2">
                        Collection Statistics
                    </h1>
                    <p className="text-text-muted">
                        Track your collection's growth and value over time
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

                {/* Stats Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-surface p-6 rounded-lg shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <span className="text-sm text-text-muted">Total Cards</span>
                        </div>
                        <div className="text-2xl font-bold text-text">
                            {formatNumber(stats?.totalCards || 0)}
                        </div>
                        <div className="text-sm text-success mt-1">
                            +{stats?.newCardsThisPeriod || 0} this period
                        </div>
                    </div>

                    <div className="bg-surface p-6 rounded-lg shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span className="text-sm text-text-muted">Total Value</span>
                        </div>
                        <div className="text-2xl font-bold text-text">
                            {formatCurrency(stats?.totalValue || 0)}
                        </div>
                        <div className="text-sm text-success mt-1">
                            +{stats?.valueChangePercent || 0}% this period
                        </div>
                    </div>

                    <div className="bg-surface p-6 rounded-lg shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                            </div>
                            <span className="text-sm text-text-muted">Unique Cards</span>
                        </div>
                        <div className="text-2xl font-bold text-text">
                            {formatNumber(stats?.uniqueCards || 0)}
                        </div>
                        <div className="text-sm text-text-muted mt-1">
                            {stats?.completionRate || 0}% completion rate
                        </div>
                    </div>

                    <div className="bg-surface p-6 rounded-lg shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                            <span className="text-sm text-text-muted">Rarest Card</span>
                        </div>
                        <div className="text-lg font-bold text-text truncate">
                            {stats?.rarestCard?.name || 'N/A'}
                        </div>
                        <div className="text-sm text-text-muted mt-1">
                            {stats?.rarestCard?.rarity || 'Unknown'}
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
                            onClick={() => setActiveTab("trends")}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === "trends"
                                    ? "border-primary text-primary"
                                    : "border-transparent text-text-muted hover:text-text"
                            }`}
                        >
                            Trends
                        </button>
                        <button
                            onClick={() => setActiveTab("insights")}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === "insights"
                                    ? "border-primary text-primary"
                                    : "border-transparent text-text-muted hover:text-text"
                            }`}
                        >
                            Insights
                        </button>
                    </nav>
                </div>

                {/* Tab Content */}
                {activeTab === "overview" && (
                    <div className="space-y-6">
                        {/* Collection by Type */}
                        <div className="bg-surface p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-text mb-4">Collection by Type</h3>
                            <div className="space-y-3">
                                {stats?.byType?.map((type, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-4 h-4 rounded" style={{ backgroundColor: type.color }}></div>
                                            <span className="text-sm text-text">{type.name}</span>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <span className="text-sm text-text-muted">{type.count} cards</span>
                                            <span className="text-sm font-medium">{formatCurrency(type.value)}</span>
                                        </div>
                                    </div>
                                )) || (
                                    <div className="text-center text-text-muted py-8">
                                        No type data available
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Top Valuable Cards */}
                        <div className="bg-surface p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-text mb-4">Most Valuable Cards</h3>
                            <div className="space-y-3">
                                {stats?.topCards?.map((card, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className="text-lg font-bold text-text-muted">#{index + 1}</div>
                                            <div>
                                                <div className="font-medium text-text">{card.name}</div>
                                                <div className="text-sm text-text-muted">{card.set}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-medium text-text">{formatCurrency(card.value)}</div>
                                            <div className="text-sm text-text-muted">{card.quantity}x</div>
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
                )}

                {activeTab === "trends" && (
                    <div className="space-y-6">
                        {/* Growth Chart Placeholder */}
                        <div className="bg-surface p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-text mb-4">Collection Growth</h3>
                            <div className="h-64 bg-background rounded-lg flex items-center justify-center">
                                <div className="text-center text-text-muted">
                                    <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                    <p>Chart visualization would go here</p>
                                    <p className="text-sm">Integration with charting library needed</p>
                                </div>
                            </div>
                        </div>

                        {/* Trend Data */}
                        <div className="bg-surface p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-text mb-4">Recent Trends</h3>
                            <div className="space-y-3">
                                {trends?.map((trend, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg">
                                        <div>
                                            <div className="font-medium text-text">{trend.metric}</div>
                                            <div className="text-sm text-text-muted">{trend.description}</div>
                                        </div>
                                        <div className={`text-sm font-medium ${
                                            trend.change > 0 ? 'text-success' : trend.change < 0 ? 'text-danger' : 'text-text-muted'
                                        }`}>
                                            {trend.change > 0 ? '+' : ''}{trend.change}%
                                        </div>
                                    </div>
                                )) || (
                                    <div className="text-center text-text-muted py-8">
                                        No trend data available
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "insights" && (
                    <div className="space-y-6">
                        {/* AI Insights */}
                        <div className="bg-surface p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-text mb-4">Collection Insights</h3>
                            <div className="space-y-4">
                                {insights?.map((insight, index) => (
                                    <div key={index} className="p-4 bg-background rounded-lg border-l-4 border-primary">
                                        <div className="flex items-start space-x-3">
                                            <svg className="w-5 h-5 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <div>
                                                <div className="font-medium text-text mb-1">{insight.title}</div>
                                                <div className="text-sm text-text-muted">{insight.description}</div>
                                                {insight.actionable && (
                                                    <div className="mt-2">
                                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                                            Actionable
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )) || (
                                    <div className="text-center text-text-muted py-8">
                                        No insights available
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Recommendations */}
                        <div className="bg-surface p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-text mb-4">Recommendations</h3>
                            <div className="space-y-3">
                                <div className="p-4 bg-background rounded-lg">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="font-medium text-text">Diversify Your Collection</span>
                                    </div>
                                    <p className="text-sm text-text-muted">
                                        Consider adding cards from different types to balance your collection value.
                                    </p>
                                </div>
                                <div className="p-4 bg-background rounded-lg">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <svg className="w-5 h-5 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                        <span className="font-medium text-text">Monitor Market Trends</span>
                                    </div>
                                    <p className="text-sm text-text-muted">
                                        Some card values are declining. Consider reviewing your pricing strategy.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
