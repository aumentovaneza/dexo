import React, { useState, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";

export default function DeckBuilder({ deck, collection }) {
    const [selectedCards, setSelectedCards] = useState(deck?.deckCards || []);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [activeTab, setActiveTab] = useState("collection"); // collection or allcards

    const totalCards = selectedCards.reduce((sum, card) => sum + card.quantity, 0);
    const isValidDeck = totalCards === 60;

    const filteredCollection = collection.filter((item) => {
        const matchesSearch = item.pokemonCard.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === "all" || item.pokemonCard.types?.includes(filterType);
        return matchesSearch && matchesType;
    });

    const addCardToDeck = (pokemonCard) => {
        const existingCard = selectedCards.find(c => c.pokemon_card_id === pokemonCard.id);
        
        if (existingCard) {
            if (existingCard.quantity < 4) {
                setSelectedCards(selectedCards.map(c => 
                    c.pokemon_card_id === pokemonCard.id 
                        ? { ...c, quantity: c.quantity + 1 }
                        : c
                ));
            }
        } else {
            setSelectedCards([...selectedCards, {
                pokemon_card_id: pokemonCard.id,
                pokemonCard: pokemonCard,
                quantity: 1
            }]);
        }
    };

    const removeCardFromDeck = (pokemonCardId) => {
        setSelectedCards(selectedCards.filter(c => c.pokemon_card_id !== pokemonCardId));
    };

    const updateCardQuantity = (pokemonCardId, newQuantity) => {
        if (newQuantity <= 0) {
            removeCardFromDeck(pokemonCardId);
        } else if (newQuantity <= 4) {
            setSelectedCards(selectedCards.map(c => 
                c.pokemon_card_id === pokemonCardId 
                    ? { ...c, quantity: newQuantity }
                    : c
            ));
        }
    };

    return (
        <MainLayout>
            <Head title={deck ? `Edit Deck: ${deck.name}` : "Create Deck"} />

            <div className="py-4 px-4 sm:py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-xl sm:text-2xl font-bold text-text">
                        {deck ? `Edit: ${deck.name}` : "Create New Deck"}
                    </h1>
                    <div className="flex gap-2">
                        <Link
                            href="/pokemon/decks"
                            className="px-3 sm:px-4 py-2 border border-surface text-text-muted rounded-lg text-sm font-medium hover:bg-surface transition"
                        >
                            Cancel
                        </Link>
                        <button
                            disabled={!isValidDeck}
                            className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition ${
                                isValidDeck
                                    ? "bg-primary text-white hover:bg-primary/90"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                        >
                            {deck ? "Update" : "Save"} Deck
                        </button>
                    </div>
                </div>

                {/* Deck Info */}
                <div className="bg-surface rounded-lg shadow p-4 mb-6">
                    <input
                        type="text"
                        placeholder="Deck Name"
                        defaultValue={deck?.name || ""}
                        className="w-full px-3 py-2 border border-surface rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent mb-3"
                    />
                    <textarea
                        placeholder="Deck Notes (optional)"
                        defaultValue={deck?.notes || ""}
                        className="w-full px-3 py-2 border border-surface rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                        rows={3}
                    />
                </div>

                {/* Deck Status */}
                <div className="bg-surface rounded-lg shadow p-4 mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="font-semibold text-text">Deck Status</h2>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            isValidDeck 
                                ? "bg-green-100 text-green-800" 
                                : "bg-yellow-100 text-yellow-800"
                        }`}>
                            {totalCards}/60 Cards
                        </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                        <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${Math.min((totalCards / 60) * 100, 100)}%` }}
                        />
                    </div>

                    {!isValidDeck && (
                        <div className="text-sm text-text-muted">
                            {totalCards < 60 
                                ? `Add ${60 - totalCards} more cards to complete your deck.`
                                : `Remove ${totalCards - 60} cards to meet the 60-card limit.`
                            }
                        </div>
                    )}
                </div>

                {/* Mobile-optimized tabs */}
                <div className="flex border-b border-surface mb-6">
                    <button
                        onClick={() => setActiveTab("collection")}
                        className={`flex-1 px-3 py-2 text-sm font-medium border-b-2 transition ${
                            activeTab === "collection"
                                ? "border-primary text-primary"
                                : "border-transparent text-text-muted hover:text-text"
                        }`}
                    >
                        My Collection
                    </button>
                    <button
                        onClick={() => setActiveTab("allcards")}
                        className={`flex-1 px-3 py-2 text-sm font-medium border-b-2 transition ${
                            activeTab === "allcards"
                                ? "border-primary text-primary"
                                : "border-transparent text-text-muted hover:text-text"
                        }`}
                    >
                        All Cards
                    </button>
                    <button
                        onClick={() => setActiveTab("deck")}
                        className={`flex-1 px-3 py-2 text-sm font-medium border-b-2 transition ${
                            activeTab === "deck"
                                ? "border-primary text-primary"
                                : "border-transparent text-text-muted hover:text-text"
                        }`}
                    >
                        Current Deck ({totalCards})
                    </button>
                </div>

                {/* Search and Filters */}
                <div className="space-y-3 mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search cards..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-surface rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <svg className="absolute left-3 top-2.5 w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {["all", "Fire", "Water", "Grass", "Lightning", "Psychic"].map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilterType(type)}
                                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition ${
                                    filterType === type
                                        ? "bg-primary text-white"
                                        : "bg-surface text-text-muted hover:bg-surface-alt"
                                }`}
                            >
                                {type === "all" ? "All Types" : type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content based on active tab */}
                {activeTab === "deck" && (
                    <div className="space-y-2">
                        {selectedCards.length === 0 ? (
                            <div className="text-center py-8">
                                <svg className="mx-auto h-12 w-12 text-text-muted mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                                <p className="text-text-muted">No cards in deck yet</p>
                                <button
                                    onClick={() => setActiveTab("collection")}
                                    className="mt-2 text-primary hover:text-primary/80 text-sm font-medium"
                                >
                                    Browse Your Collection
                                </button>
                            </div>
                        ) : (
                            selectedCards.map((card) => (
                                <div key={card.pokemon_card_id} className="bg-surface rounded-lg shadow p-3">
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src={card.pokemonCard.images?.small || "/images/placeholder.jpg"}
                                            alt={card.pokemonCard.name}
                                            className="w-12 h-12 rounded object-cover flex-shrink-0"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "https://placehold.co/48x48/e2e8f0/475569?text=" + card.pokemonCard.name;
                                            }}
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-medium text-text truncate">{card.pokemonCard.name}</h3>
                                            <p className="text-sm text-text-muted">{card.pokemonCard.set_name}</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => updateCardQuantity(card.pokemon_card_id, card.quantity - 1)}
                                                className="w-8 h-8 rounded-full bg-surface hover:bg-surface-alt flex items-center justify-center"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                </svg>
                                            </button>
                                            <span className="w-8 text-center font-medium">{card.quantity}</span>
                                            <button
                                                onClick={() => updateCardQuantity(card.pokemon_card_id, card.quantity + 1)}
                                                className="w-8 h-8 rounded-full bg-surface hover:bg-surface-alt flex items-center justify-center"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {(activeTab === "collection" || activeTab === "allcards") && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {filteredCollection.map((item) => (
                            <div key={item.id} className="bg-surface rounded-lg shadow hover:shadow-md transition">
                                <div className="aspect-square relative">
                                    <img
                                        src={item.pokemonCard.images?.small || "/images/placeholder.jpg"}
                                        alt={item.pokemonCard.name}
                                        className="w-full h-full object-cover rounded-t-lg"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "https://placehold.co/200x200/e2e8f0/475569?text=" + item.pokemonCard.name;
                                        }}
                                    />
                                    {activeTab === "collection" && (
                                        <div className="absolute top-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                                            {item.quantity}x
                                        </div>
                                    )}
                                </div>
                                <div className="p-2">
                                    <h3 className="font-medium text-xs text-text truncate">{item.pokemonCard.name}</h3>
                                    <p className="text-xs text-text-muted mb-2">{item.pokemonCard.set_name}</p>
                                    <button
                                        onClick={() => addCardToDeck(item.pokemonCard)}
                                        className="w-full bg-primary text-white px-2 py-1 rounded text-xs font-medium hover:bg-primary/90 transition"
                                    >
                                        Add to Deck
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
