import React, { useState, useEffect } from "react";
import { Head, router } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";

export default function CreateTradeOffer({ auth, collection, users }) {
    const [activeStep, setActiveStep] = useState(1);
    const [selectedRecipient, setSelectedRecipient] = useState(null);
    const [selectedCards, setSelectedCards] = useState([]);
    const [requestedCards, setRequestedCards] = useState([]);
    const [tradeNotes, setTradeNotes] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [shippingOptions, setShippingOptions] = useState(null);
    const [selectedShipping, setSelectedShipping] = useState(null);

    const totalSteps = 4;

    const filteredUsers = users.filter(user => 
        user.id !== auth.user.id &&
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredCollection = collection.filter(item =>
        item.pokemonCard.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const addCardToOffer = (card) => {
        const existing = selectedCards.find(c => c.id === card.id);
        if (existing) {
            if (existing.quantity < card.quantity) {
                setSelectedCards(selectedCards.map(c => 
                    c.id === card.id ? { ...c, quantity: c.quantity + 1 } : c
                ));
            }
        } else {
            setSelectedCards([...selectedCards, { ...card, quantity: 1, condition: 'Near Mint' }]);
        }
    };

    const removeCardFromOffer = (cardId) => {
        setSelectedCards(selectedCards.filter(c => c.id !== cardId));
    };

    const updateCardQuantity = (cardId, quantity) => {
        if (quantity <= 0) {
            removeCardFromOffer(cardId);
        } else {
            setSelectedCards(selectedCards.map(c => 
                c.id === cardId ? { ...c, quantity } : c
            ));
        }
    };

    const calculateShipping = () => {
        if (!selectedRecipient) return;
        
        // Mock shipping calculation
        const isInternational = selectedRecipient.country !== auth.user.country;
        const packageWeight = selectedCards.reduce((sum, card) => sum + card.quantity, 0) * 0.002; // 2g per card
        
        const options = isInternational ? [
            {
                id: 'intl_standard',
                name: 'Standard International',
                days: '7-21',
                cost: 25.00,
                tracking: true,
                insurance: false
            },
            {
                id: 'intl_express',
                name: 'Express International',
                days: '3-7',
                cost: 45.00,
                tracking: true,
                insurance: true
            }
        ] : [
            {
                id: 'local_standard',
                name: 'Standard Mail',
                days: '2-5',
                cost: 4.50,
                tracking: false,
                insurance: false
            },
            {
                id: 'local_priority',
                name: 'Priority Mail',
                days: '1-2',
                cost: 8.00,
                tracking: true,
                insurance: true
            }
        ];
        
        setShippingOptions(options);
        setSelectedShipping(options[0]);
    };

    useEffect(() => {
        if (selectedRecipient && activeStep === 3) {
            calculateShipping();
        }
    }, [selectedRecipient, activeStep]);

    const handleSubmit = () => {
        const tradeData = {
            recipient_id: selectedRecipient.id,
            trade_type: selectedRecipient.country !== auth.user.country ? 'international' : 'local',
            offering: selectedCards.map(card => ({
                card_id: card.pokemon_card_id,
                quantity: card.quantity,
                condition: card.condition
            })),
            requesting: requestedCards.map(card => ({
                card_id: card.pokemon_card_id,
                quantity: card.quantity,
                condition: card.condition
            })),
            notes: tradeNotes,
            shipping_method: selectedShipping?.id,
            shipping_cost: selectedShipping?.cost
        };

        router.post('/trading/create', tradeData);
    };

    const nextStep = () => {
        if (activeStep < totalSteps) {
            setActiveStep(activeStep + 1);
        }
    };

    const prevStep = () => {
        if (activeStep > 1) {
            setActiveStep(activeStep - 1);
        }
    };

    const canProceed = () => {
        switch (activeStep) {
            case 1: return selectedRecipient !== null;
            case 2: return selectedCards.length > 0;
            case 3: return selectedShipping !== null;
            case 4: return true;
            default: return false;
        }
    };

    return (
        <MainLayout>
            <Head title="Create Trade Offer" />

            <div className="py-4 px-4 sm:py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-text mb-2">Create Trade Offer</h1>
                    <p className="text-text-muted">Set up a trade with another collector</p>
                </div>

                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        {[1, 2, 3, 4].map((step) => (
                            <div key={step} className="flex items-center">
                                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                                    step <= activeStep
                                        ? 'border-primary bg-primary text-white'
                                        : 'border-surface text-text-muted'
                                }`}>
                                    {step < activeStep ? (
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        step
                                    )}
                                </div>
                                <div className={`ml-3 text-sm font-medium ${
                                    step <= activeStep ? 'text-primary' : 'text-text-muted'
                                }`}>
                                    {step === 1 && 'Recipient'}
                                    {step === 2 && 'Offer Cards'}
                                    {step === 3 && 'Shipping'}
                                    {step === 4 && 'Review'}
                                </div>
                                {step < totalSteps && (
                                    <div className="flex-1 mx-4 border-t-2 border-surface" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Step 1: Select Recipient */}
                {activeStep === 1 && (
                    <div className="bg-surface rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold text-text mb-4">Select Trading Partner</h2>
                        
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-3 py-2 border border-surface rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>

                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {filteredUsers.map((user) => (
                                <div
                                    key={user.id}
                                    onClick={() => setSelectedRecipient(user)}
                                    className={`p-4 border rounded-lg cursor-pointer transition ${
                                        selectedRecipient?.id === user.id
                                            ? 'border-primary bg-primary/5'
                                            : 'border-surface hover:border-primary/50'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-medium text-text">{user.name}</p>
                                                <p className="text-sm text-text-muted">
                                                    {user.country === auth.user.country ? '🏠 Local' : '🌐 International'} • {user.city}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-text">{user.trades_count || 0} trades</p>
                                            <p className="text-xs text-text-muted">Rating: {user.rating || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 2: Select Cards to Offer */}
                {activeStep === 2 && (
                    <div className="space-y-6">
                        <div className="bg-surface rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold text-text mb-4">Select Cards to Offer</h2>
                            
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Search your collection..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-3 py-2 border border-surface rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-96 overflow-y-auto">
                                {filteredCollection.map((item) => (
                                    <div key={item.id} className="bg-surface-alt rounded-lg p-3">
                                        <div className="aspect-square relative mb-2">
                                            <img
                                                src={item.pokemonCard.images?.small || "/images/placeholder.jpg"}
                                                alt={item.pokemonCard.name}
                                                className="w-full h-full object-cover rounded"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = "https://placehold.co/200x200/e2e8f0/475569?text=" + item.pokemonCard.name;
                                                }}
                                            />
                                        </div>
                                        <h3 className="text-xs font-medium text-text truncate">{item.pokemonCard.name}</h3>
                                        <p className="text-xs text-text-muted mb-2">Available: {item.quantity}</p>
                                        <button
                                            onClick={() => addCardToOffer(item)}
                                            className="w-full bg-primary text-white px-2 py-1 rounded text-xs font-medium hover:bg-primary/90 transition"
                                        >
                                            Add to Offer
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Selected Cards */}
                        {selectedCards.length > 0 && (
                            <div className="bg-surface rounded-lg shadow p-6">
                                <h3 className="text-lg font-semibold text-text mb-4">Selected Cards ({selectedCards.length})</h3>
                                <div className="space-y-3">
                                    {selectedCards.map((card) => (
                                        <div key={card.id} className="flex items-center justify-between p-3 bg-surface-alt rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <img
                                                    src={card.pokemonCard.images?.small || "/images/placeholder.jpg"}
                                                    alt={card.pokemonCard.name}
                                                    className="w-12 h-12 rounded object-cover"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = "https://placehold.co/48x48/e2e8f0/475569?text=" + card.pokemonCard.name;
                                                    }}
                                                />
                                                <div>
                                                    <p className="font-medium text-text">{card.pokemonCard.name}</p>
                                                    <p className="text-sm text-text-muted">Condition: {card.condition}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => updateCardQuantity(card.id, card.quantity - 1)}
                                                    className="w-8 h-8 rounded-full bg-surface hover:bg-surface-alt flex items-center justify-center"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                    </svg>
                                                </button>
                                                <span className="w-8 text-center font-medium">{card.quantity}</span>
                                                <button
                                                    onClick={() => updateCardQuantity(card.id, card.quantity + 1)}
                                                    className="w-8 h-8 rounded-full bg-surface hover:bg-surface-alt flex items-center justify-center"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => removeCardFromOffer(card.id)}
                                                    className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Step 3: Shipping Options */}
                {activeStep === 3 && (
                    <div className="bg-surface rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold text-text mb-4">Shipping Options</h2>
                        
                        <div className="mb-6 p-4 bg-surface-alt rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-text">Trade Type:</span>
                                <span className="text-sm font-medium text-primary">
                                    {selectedRecipient?.country !== auth.user.country ? '🌐 International' : '🏠 Local'}
                                </span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-text">Recipient:</span>
                                <span className="text-sm text-text">{selectedRecipient?.name}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-medium text-text">Package Weight:</span>
                                <span className="text-sm text-text">
                                    {(selectedCards.reduce((sum, card) => sum + card.quantity, 0) * 0.002).toFixed(3)} kg
                                </span>
                            </div>
                        </div>

                        {shippingOptions && (
                            <div className="space-y-3">
                                {shippingOptions.map((option) => (
                                    <div
                                        key={option.id}
                                        onClick={() => setSelectedShipping(option)}
                                        className={`p-4 border rounded-lg cursor-pointer transition ${
                                            selectedShipping?.id === option.id
                                                ? 'border-primary bg-primary/5'
                                                : 'border-surface hover:border-primary/50'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-text">{option.name}</p>
                                                <p className="text-sm text-text-muted">
                                                    {option.days} • {option.tracking ? 'Tracked' : 'Untracked'} 
                                                    {option.insurance && ' • Insured'}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-semibold text-primary">${option.cost.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Step 4: Review and Submit */}
                {activeStep === 4 && (
                    <div className="space-y-6">
                        <div className="bg-surface rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold text-text mb-4">Review Trade Offer</h2>
                            
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-3 bg-surface-alt rounded-lg">
                                    <span className="font-medium text-text">Trading Partner:</span>
                                    <span className="text-text">{selectedRecipient?.name}</span>
                                </div>
                                
                                <div className="flex justify-between items-center p-3 bg-surface-alt rounded-lg">
                                    <span className="font-medium text-text">Trade Type:</span>
                                    <span className="text-text">
                                        {selectedRecipient?.country !== auth.user.country ? 'International' : 'Local'}
                                    </span>
                                </div>
                                
                                <div className="flex justify-between items-center p-3 bg-surface-alt rounded-lg">
                                    <span className="font-medium text-text">Cards Offering:</span>
                                    <span className="text-text">{selectedCards.length} cards</span>
                                </div>
                                
                                <div className="flex justify-between items-center p-3 bg-surface-alt rounded-lg">
                                    <span className="font-medium text-text">Shipping:</span>
                                    <span className="text-text">{selectedShipping?.name} - ${selectedShipping?.cost.toFixed(2)}</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text mb-2">
                                    Trade Notes (Optional)
                                </label>
                                <textarea
                                    value={tradeNotes}
                                    onChange={(e) => setTradeNotes(e.target.value)}
                                    placeholder="Add any special instructions or notes for the trader..."
                                    className="w-full px-3 py-2 border border-surface rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                                    rows={3}
                                />
                            </div>
                        </div>

                        {/* Selected Cards Summary */}
                        <div className="bg-surface rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-text mb-4">Cards You're Offering</h3>
                            <div className="space-y-2">
                                {selectedCards.map((card) => (
                                    <div key={card.id} className="flex items-center justify-between p-2 bg-surface-alt rounded">
                                        <div className="flex items-center space-x-2">
                                            <img
                                                src={card.pokemonCard.images?.small || "/images/placeholder.jpg"}
                                                alt={card.pokemonCard.name}
                                                className="w-8 h-8 rounded object-cover"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = "https://placehold.co/32x32/e2e8f0/475569?text=" + card.pokemonCard.name;
                                                }}
                                            />
                                            <span className="text-sm text-text">{card.pokemonCard.name}</span>
                                        </div>
                                        <span className="text-sm font-medium text-text">x{card.quantity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                    <button
                        onClick={prevStep}
                        disabled={activeStep === 1}
                        className={`px-6 py-2 rounded-lg font-medium transition ${
                            activeStep === 1
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-surface border border-surface text-text hover:bg-surface-alt'
                        }`}
                    >
                        Previous
                    </button>
                    
                    {activeStep < totalSteps ? (
                        <button
                            onClick={nextStep}
                            disabled={!canProceed()}
                            className={`px-6 py-2 rounded-lg font-medium transition ${
                                canProceed()
                                    ? 'bg-primary text-white hover:bg-primary/90'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition"
                        >
                            Submit Trade Offer
                        </button>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
