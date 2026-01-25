import React, { useState, useEffect } from "react";
import { Head, router } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";

export default function ShowTrade({ auth, trade, shippingOptions, safetyRecommendations, currencyConversion, customsDeclaration, validation }) {
    const [activeTab, setActiveTab] = useState("details");
    const [isLoading, setIsLoading] = useState(false);

    const formatCurrency = (amount, currency = 'USD') => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-warning/10 text-warning';
            case 'accepted':
                return 'bg-success/10 text-success';
            case 'rejected':
                return 'bg-danger/10 text-danger';
            case 'completed':
                return 'bg-primary/10 text-primary';
            case 'cancelled':
                return 'bg-text-muted/10 text-text-muted';
            default:
                return 'bg-text-muted/10 text-text-muted';
        }
    };

    const handleAcceptTrade = () => {
        if (confirm('Are you sure you want to accept this trade?')) {
            router.post(`/trading/${trade.id}/accept`, {}, {
                onSuccess: () => {
                    // Trade accepted successfully
                },
                onError: (errors) => {
                    console.error('Error accepting trade:', errors);
                }
            });
        }
    };

    const handleRejectTrade = () => {
        if (confirm('Are you sure you want to reject this trade?')) {
            router.post(`/trading/${trade.id}/reject`, {}, {
                onSuccess: () => {
                    // Trade rejected successfully
                },
                onError: (errors) => {
                    console.error('Error rejecting trade:', errors);
                }
            });
        }
    };

    const handleCancelTrade = () => {
        if (confirm('Are you sure you want to cancel this trade?')) {
            router.post(`/trading/${trade.id}/cancel`, {}, {
                onSuccess: () => {
                    // Trade cancelled successfully
                },
                onError: (errors) => {
                    console.error('Error cancelling trade:', errors);
                }
            });
        }
    };

    const handleCompleteTrade = () => {
        if (confirm('Are you sure you want to mark this trade as completed?')) {
            router.post(`/trading/${trade.id}/complete`, {}, {
                onSuccess: () => {
                    // Trade completed successfully
                },
                onError: (errors) => {
                    console.error('Error completing trade:', errors);
                }
            });
        }
    };

    const canAccept = trade.recipient_id === auth.user.id && trade.status === 'pending';
    const canReject = trade.recipient_id === auth.user.id && trade.status === 'pending';
    const canCancel = trade.user_id === auth.user.id && trade.canBeCancelled && trade.status === 'pending';
    const canComplete = (trade.user_id === auth.user.id || trade.recipient_id === auth.user.id) && trade.status === 'accepted';

    return (
        <MainLayout>
            <Head title={`Trade #${trade.id} - ${trade.status}`} />

            <div className="py-4 px-4 sm:py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-text mb-2">
                                Trade #{trade.id}
                            </h1>
                            <div className="flex items-center space-x-4">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(trade.status)}`}>
                                    {trade.status.charAt(0).toUpperCase() + trade.status.slice(1)}
                                </span>
                                <span className="text-text-muted">
                                    Created {trade.created_at}
                                </span>
                                {trade.expires_at && (
                                    <span className="text-text-muted">
                                        Expires {trade.expires_at}
                                    </span>
                                )}
                            </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex space-x-2">
                            {canAccept && (
                                <button
                                    onClick={handleAcceptTrade}
                                    className="px-4 py-2 bg-success text-background rounded-lg hover:bg-success/90 transition"
                                >
                                    Accept Trade
                                </button>
                            )}
                            {canReject && (
                                <button
                                    onClick={handleRejectTrade}
                                    className="px-4 py-2 bg-danger text-background rounded-lg hover:bg-danger/90 transition"
                                >
                                    Reject Trade
                                </button>
                            )}
                            {canCancel && (
                                <button
                                    onClick={handleCancelTrade}
                                    className="px-4 py-2 bg-warning text-background rounded-lg hover:bg-warning/90 transition"
                                >
                                    Cancel Trade
                                </button>
                            )}
                            {canComplete && (
                                <button
                                    onClick={handleCompleteTrade}
                                    className="px-4 py-2 bg-primary text-background rounded-lg hover:bg-primary/90 transition"
                                >
                                    Complete Trade
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Trade Participants */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <div className="bg-surface p-6 rounded-lg shadow">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                                <span className="text-primary font-bold">
                                    {trade.user.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div>
                                <div className="font-medium text-text">{trade.user.name}</div>
                                <div className="text-sm text-text-muted">Trader</div>
                            </div>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-text-muted">Location:</span>
                                <span className="text-text">{trade.user.city}, {trade.user.country}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-text-muted">Rating:</span>
                                <span className="text-text">{trade.user.rating || 'N/A'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-surface p-6 rounded-lg shadow">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m14 0H4" />
                                </svg>
                            </div>
                            <div className="font-medium text-text mb-1">{trade.trade_type}</div>
                            <div className="text-sm text-text-muted">Trade Type</div>
                        </div>
                    </div>

                    <div className="bg-surface p-6 rounded-lg shadow">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="h-12 w-12 rounded-full bg-success/20 flex items-center justify-center">
                                <span className="text-success font-bold">
                                    {trade.recipient.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div>
                                <div className="font-medium text-text">{trade.recipient.name}</div>
                                <div className="text-sm text-text-muted">Recipient</div>
                            </div>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-text-muted">Location:</span>
                                <span className="text-text">{trade.recipient.city}, {trade.recipient.country}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-text-muted">Rating:</span>
                                <span className="text-text">{trade.recipient.rating || 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-surface mb-6">
                    <nav className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab("details")}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === "details"
                                    ? "border-primary text-primary"
                                    : "border-transparent text-text-muted hover:text-text"
                            }`}
                        >
                            Trade Details
                        </button>
                        <button
                            onClick={() => setActiveTab("shipping")}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === "shipping"
                                    ? "border-primary text-primary"
                                    : "border-transparent text-text-muted hover:text-text"
                            }`}
                        >
                            Shipping
                        </button>
                        <button
                            onClick={() => setActiveTab("safety")}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === "safety"
                                    ? "border-primary text-primary"
                                    : "border-transparent text-text-muted hover:text-text"
                            }`}
                        >
                            Safety
                        </button>
                        {trade.trade_type === 'international' && (
                            <button
                                onClick={() => setActiveTab("customs")}
                                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === "customs"
                                        ? "border-primary text-primary"
                                        : "border-transparent text-text-muted hover:text-text"
                                }`}
                            >
                                Customs
                            </button>
                        )}
                    </nav>
                </div>

                {/* Tab Content */}
                {activeTab === "details" && (
                    <div className="space-y-6">
                        {/* Offering Cards */}
                        <div className="bg-surface p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-text mb-4">Offering Cards</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {trade.tradeItems?.filter(item => item.is_offering).map((item, index) => (
                                    <div key={index} className="bg-background p-4 rounded-lg">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <div className="w-16 h-20 bg-surface rounded flex items-center justify-center">
                                                <span className="text-xs text-text-muted">Card</span>
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-medium text-text">{item.pokemonCard.name}</div>
                                                <div className="text-sm text-text-muted">{item.pokemonCard.set}</div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-text-muted">Quantity:</span>
                                            <span className="text-text">{item.quantity}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-text-muted">Condition:</span>
                                            <span className="text-text">{item.condition}</span>
                                        </div>
                                        <div className="flex justify-between text-sm font-medium">
                                            <span className="text-text-muted">Est. Value:</span>
                                            <span className="text-text">{formatCurrency(item.estimated_value)}</span>
                                        </div>
                                    </div>
                                )) || (
                                    <div className="col-span-full text-center text-text-muted py-8">
                                        No cards being offered
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Requesting Cards */}
                        <div className="bg-surface p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-text mb-4">Requesting Cards</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {trade.tradeItems?.filter(item => !item.is_offering).map((item, index) => (
                                    <div key={index} className="bg-background p-4 rounded-lg">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <div className="w-16 h-20 bg-surface rounded flex items-center justify-center">
                                                <span className="text-xs text-text-muted">Card</span>
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-medium text-text">{item.pokemonCard.name}</div>
                                                <div className="text-sm text-text-muted">{item.pokemonCard.set}</div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-text-muted">Quantity:</span>
                                            <span className="text-text">{item.quantity}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-text-muted">Condition:</span>
                                            <span className="text-text">{item.condition}</span>
                                        </div>
                                        <div className="flex justify-between text-sm font-medium">
                                            <span className="text-text-muted">Est. Value:</span>
                                            <span className="text-text">{formatCurrency(item.estimated_value)}</span>
                                        </div>
                                    </div>
                                )) || (
                                    <div className="col-span-full text-center text-text-muted py-8">
                                        No cards being requested
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Trade Notes */}
                        {trade.notes && (
                            <div className="bg-surface p-6 rounded-lg shadow">
                                <h3 className="text-lg font-semibold text-text mb-4">Trade Notes</h3>
                                <p className="text-text-muted">{trade.notes}</p>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "shipping" && (
                    <div className="space-y-6">
                        <div className="bg-surface p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-text mb-4">Shipping Options</h3>
                            <div className="space-y-4">
                                {shippingOptions?.map((option, index) => (
                                    <div key={index} className="border border-surface rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <div>
                                                <div className="font-medium text-text">{option.name}</div>
                                                <div className="text-sm text-text-muted">{option.description}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-medium text-text">{formatCurrency(option.cost)}</div>
                                                <div className="text-sm text-text-muted">{option.estimated_days} days</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                option.tracking ? 'bg-success/10 text-success' : 'bg-text-muted/10 text-text-muted'
                                            }`}>
                                                {option.tracking ? 'Tracking Available' : 'No Tracking'}
                                            </span>
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                option.insurance ? 'bg-success/10 text-success' : 'bg-text-muted/10 text-text-muted'
                                            }`}>
                                                {option.insurance ? 'Insured' : 'No Insurance'}
                                            </span>
                                        </div>
                                    </div>
                                )) || (
                                    <div className="text-center text-text-muted py-8">
                                        No shipping options available
                                    </div>
                                )}
                            </div>
                        </div>

                        {trade.shipping_cost && (
                            <div className="bg-surface p-6 rounded-lg shadow">
                                <h3 className="text-lg font-semibold text-text mb-4">Shipping Cost</h3>
                                <div className="text-2xl font-bold text-text">
                                    {formatCurrency(trade.shipping_cost)}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "safety" && (
                    <div className="space-y-6">
                        <div className="bg-surface p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-text mb-4">Safety Recommendations</h3>
                            <div className="space-y-4">
                                {safetyRecommendations?.map((recommendation, index) => (
                                    <div key={index} className="flex items-start space-x-3 p-4 bg-background rounded-lg">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                            recommendation.type === 'warning' ? 'bg-warning/10 text-warning' :
                                            recommendation.type === 'danger' ? 'bg-danger/10 text-danger' :
                                            'bg-success/10 text-success'
                                        }`}>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                {recommendation.type === 'warning' && (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                )}
                                                {recommendation.type === 'danger' && (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                )}
                                                {recommendation.type === 'success' && (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                )}
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="font-medium text-text mb-1">{recommendation.title}</div>
                                            <div className="text-sm text-text-muted">{recommendation.description}</div>
                                        </div>
                                    </div>
                                )) || (
                                    <div className="text-center text-text-muted py-8">
                                        No safety recommendations available
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "customs" && trade.trade_type === 'international' && (
                    <div className="space-y-6">
                        <div className="bg-surface p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-text mb-4">Customs Declaration</h3>
                            {customsDeclaration ? (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-text mb-1">Declaration Type</label>
                                            <div className="text-text">{customsDeclaration.declaration_type}</div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-text mb-1">Declared Value</label>
                                            <div className="text-text">{formatCurrency(customsDeclaration.declared_value)}</div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-text mb-1">HS Code</label>
                                            <div className="text-text">{customsDeclaration.hs_code}</div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-text mb-1">Country of Origin</label>
                                            <div className="text-text">{customsDeclaration.country_of_origin}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text mb-1">Description</label>
                                        <div className="text-text">{customsDeclaration.description}</div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center text-text-muted py-8">
                                    No customs declaration available
                                </div>
                            )}
                        </div>

                        {validation && (
                            <div className="bg-surface p-6 rounded-lg shadow">
                                <h3 className="text-lg font-semibold text-text mb-4">Trade Validation</h3>
                                <div className="space-y-3">
                                    <div className={`p-3 rounded-lg ${
                                        validation.is_valid ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
                                    }`}>
                                        <div className="font-medium">
                                            {validation.is_valid ? '✓ Trade is Valid' : '✗ Trade Validation Failed'}
                                        </div>
                                        {!validation.is_valid && (
                                            <div className="text-sm mt-1">{validation.error_message}</div>
                                        )}
                                    </div>
                                    {validation.restrictions?.length > 0 && (
                                        <div>
                                            <div className="font-medium text-text mb-2">Restrictions:</div>
                                            <ul className="list-disc list-inside text-sm text-text-muted">
                                                {validation.restrictions.map((restriction, index) => (
                                                    <li key={index}>{restriction}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
