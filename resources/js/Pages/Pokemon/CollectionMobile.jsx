import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";

export default function Collection({ collection }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [sortBy, setSortBy] = useState("name");
    const [viewMode, setViewMode] = useState("grid"); // grid or list

    const filteredCollection = collection.filter((item) => {
        const matchesSearch = item.pokemonCard.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === "all" || item.pokemonCard.types?.includes(filterType);
        return matchesSearch && matchesType;
    });

    const sortedCollection = [...filteredCollection].sort((a, b) => {
        switch (sortBy) {
            case "name":
                return a.pokemonCard.name.localeCompare(b.pokemonCard.name);
            case "rarity":
                return a.pokemonCard.rarity?.localeCompare(b.pokemonCard.rarity) || 0;
            case "quantity":
                return b.quantity - a.quantity;
            default:
                return 0;
        }
    });

    return (
        <MainLayout>
            <Head title="My Collection" />

            <div className="py-4 px-4 sm:py-6 sm:px-6 lg:px-8">
                {/* Header with mobile-optimized actions */}
                <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                        <h1 className="text-2xl font-bold text-text mb-2 sm:mb-0">My Collection</h1>
                        <div className="flex gap-2">
                            <button className="flex-1 sm:flex-none bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition">
                                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                <span className="hidden sm:inline">Add Cards</span>
                                <span className="sm:hidden">Add</span>
                            </button>
                            <button className="flex-1 sm:flex-none border border-primary text-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/10 transition">
                                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                <span className="hidden sm:inline">Import</span>
                                <span className="sm:hidden">Import</span>
                            </button>
                        </div>
                    </div>

                    {/* Mobile-optimized search and filters */}
                    <div className="space-y-3">
                        {/* Search bar */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search your collection..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-surface rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                            <svg className="absolute left-3 top-2.5 w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        {/* Filter and sort controls */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="flex-1 px-3 py-2 border border-surface rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                                <option value="all">All Types</option>
                                <option value="Fire">Fire</option>
                                <option value="Water">Water</option>
                                <option value="Grass">Grass</option>
                                <option value="Lightning">Lightning</option>
                                <option value="Psychic">Psychic</option>
                                <option value="Fighting">Fighting</option>
                            </select>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="flex-1 px-3 py-2 border border-surface rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                                <option value="name">Sort by Name</option>
                                <option value="rarity">Sort by Rarity</option>
                                <option value="quantity">Sort by Quantity</option>
                            </select>

                            {/* View mode toggle */}
                            <div className="flex border border-surface rounded-lg">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`px-3 py-2 ${viewMode === "grid" ? "bg-primary text-white" : "text-text-muted"}`}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`px-3 py-2 ${viewMode === "list" ? "bg-primary text-white" : "text-text-muted"}`}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Collection stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    <div className="bg-surface p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold text-primary">{collection.length}</div>
                        <div className="text-xs text-text-muted">Unique Cards</div>
                    </div>
                    <div className="bg-surface p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold text-primary">{collection.reduce((sum, item) => sum + item.quantity, 0)}</div>
                        <div className="text-xs text-text-muted">Total Cards</div>
                    </div>
                    <div className="bg-surface p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold text-primary">$1,247</div>
                        <div className="text-xs text-text-muted">Est. Value</div>
                    </div>
                    <div className="bg-surface p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold text-primary">12</div>
                        <div className="text-xs text-text-muted">Sets</div>
                    </div>
                </div>

                {/* Collection display */}
                {sortedCollection.length === 0 ? (
                    <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-text-muted mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <h3 className="text-lg font-medium text-text mb-2">No cards found</h3>
                        <p className="text-text-muted mb-4">Start building your collection by adding your first Pokémon cards.</p>
                        <button className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition">
                            Add Your First Card
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Grid view */}
                        {viewMode === "grid" && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                                {sortedCollection.map((item) => (
                                    <div key={item.id} className="bg-surface rounded-lg shadow hover:shadow-md transition cursor-pointer">
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
                                            <div className="absolute top-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                                                {item.quantity}x
                                            </div>
                                        </div>
                                        <div className="p-2">
                                            <h3 className="font-medium text-xs text-text truncate">{item.pokemonCard.name}</h3>
                                            <p className="text-xs text-text-muted">{item.pokemonCard.set_name}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* List view */}
                        {viewMode === "list" && (
                            <div className="space-y-2">
                                {sortedCollection.map((item) => (
                                    <div key={item.id} className="bg-surface rounded-lg shadow hover:shadow-md transition p-3">
                                        <div className="flex items-center space-x-3">
                                            <img
                                                src={item.pokemonCard.images?.small || "/images/placeholder.jpg"}
                                                alt={item.pokemonCard.name}
                                                className="w-12 h-12 rounded object-cover flex-shrink-0"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = "https://placehold.co/48x48/e2e8f0/475569?text=" + item.pokemonCard.name;
                                                }}
                                            />
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-medium text-text truncate">{item.pokemonCard.name}</h3>
                                                <p className="text-sm text-text-muted">{item.pokemonCard.set_name} • {item.pokemonCard.rarity}</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-medium text-text">{item.quantity}x</div>
                                                <div className="text-xs text-text-muted">${(item.pokemonCard.market_price || 5.00) * item.quantity}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </MainLayout>
    );
}
