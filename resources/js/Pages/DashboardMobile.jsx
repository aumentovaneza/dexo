import React from "react";
import { Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";

export default function Dashboard({ auth }) {
    // Mock data for collection highlights - in a real app, these would come from the backend
    const collectionHighlights = [
        {
            id: 1,
            type: "pokemon",
            name: "Charizard",
            rarity: "Rare Holo",
            set: "Base Set",
            image: "/images/placeholder.jpg",
        },
        {
            id: 2,
            type: "pokemon",
            name: "Pikachu",
            rarity: "Promo",
            set: "25th Anniversary",
            image: "/images/placeholder.jpg",
        },
    ];

    // Mock data for community showcases
    const communityShowcases = [
        {
            id: 1,
            username: "collector123",
            item: "Lugia 1st Edition",
            type: "pokemon",
            likes: 243,
            image: "/images/placeholder.jpg",
        },
    ];

    return (
        <MainLayout>
            <Head title="Dashboard" />

            <div className="py-4 px-4 sm:py-6 sm:px-6 lg:px-8">
                {/* Welcome section - Mobile optimized */}
                <div className="bg-surface overflow-hidden shadow-sm sm:rounded-lg mb-6">
                    <div className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div className="mb-4 sm:mb-0">
                                <h1 className="text-xl sm:text-2xl font-semibold text-text">
                                    Welcome back, {auth?.user?.name}!
                                </h1>
                                <p className="mt-1 text-sm sm:text-base text-text-muted">
                                    Manage your Pokémon card collections all in one place.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <a
                                    href="/pokemon/collection"
                                    className="inline-flex items-center px-3 sm:px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary/90 transition"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 mr-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                        />
                                    </svg>
                                    <span className="hidden sm:inline">View Collection</span>
                                    <span className="sm:hidden">Collection</span>
                                </a>
                                <a
                                    href="/pokemon/decks/create"
                                    className="inline-flex items-center px-3 sm:px-4 py-2 border border-primary text-primary rounded-md text-sm font-medium hover:bg-primary/10 transition"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 mr-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        />
                                    </svg>
                                    <span className="hidden sm:inline">Create Deck</span>
                                    <span className="sm:hidden">New Deck</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Overview - Mobile optimized cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-surface p-4 rounded-lg shadow flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 flex-shrink-0">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                />
                            </svg>
                        </div>
                        <div>
                            <div className="text-2xl font-semibold text-text">247</div>
                            <div className="text-xs sm:text-sm text-text-muted">Total Cards</div>
                        </div>
                    </div>

                    <div className="bg-surface p-4 rounded-lg shadow flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-500 flex-shrink-0">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                />
                            </svg>
                        </div>
                        <div>
                            <div className="text-2xl font-semibold text-text">12</div>
                            <div className="text-xs sm:text-sm text-text-muted">Decks</div>
                        </div>
                    </div>

                    <div className="bg-surface p-4 rounded-lg shadow flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-500 flex-shrink-0">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <div>
                            <div className="text-2xl font-semibold text-text">$1,247</div>
                            <div className="text-xs sm:text-sm text-text-muted">Collection Value</div>
                        </div>
                    </div>

                    <div className="bg-surface p-4 rounded-lg shadow flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 flex-shrink-0">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                />
                            </svg>
                        </div>
                        <div>
                            <div className="text-2xl font-semibold text-text">+12%</div>
                            <div className="text-xs sm:text-sm text-text-muted">This Month</div>
                        </div>
                    </div>
                </div>

                {/* Collection Highlights - Mobile optimized */}
                <div className="bg-surface overflow-hidden shadow-sm sm:rounded-lg mb-6">
                    <div className="p-4 sm:p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-text">
                                Your Collection Highlights
                            </h2>
                            <div className="flex space-x-2">
                                <button className="px-2 sm:px-3 py-1 bg-primary/10 hover:bg-primary/20 text-primary text-xs sm:text-sm rounded-full transition">
                                    All
                                </button>
                                <button className="px-2 sm:px-3 py-1 bg-surface hover:bg-primary/10 text-text-muted text-xs sm:text-sm rounded-full transition">
                                    Pokémon
                                </button>
                            </div>
                        </div>

                        {/* Mobile scrollable card grid */}
                        <div className="flex space-x-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-3 lg:gap-4 lg:overflow-visible">
                            {collectionHighlights.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex-none w-48 lg:w-auto bg-surface-alt rounded-lg shadow overflow-hidden hover:shadow-md transition cursor-pointer"
                                >
                                    <div className="aspect-square bg-gray-200 relative">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "https://placehold.co/200x200/e2e8f0/475569?text=" + item.name;
                                            }}
                                        />
                                        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                            {item.rarity}
                                        </div>
                                    </div>
                                    <div className="p-3">
                                        <h3 className="font-medium text-text text-sm truncate">{item.name}</h3>
                                        <p className="text-xs text-text-muted mt-1">{item.set}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Add card button - Mobile optimized */}
                        <div className="mt-4 flex flex-col sm:flex-row gap-2">
                            <a
                                href="/pokemon/collection"
                                className="bg-primary/10 hover:bg-primary/20 rounded-lg p-3 text-center transition"
                            >
                                <div className="h-8 w-8 mx-auto mb-2 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        />
                                    </svg>
                                </div>
                                <span className="font-medium text-sm">Add Pokémon</span>
                            </a>
                            <a
                                href="/profile"
                                className="bg-surface-alt hover:bg-surface-alt/80 rounded-lg p-3 text-center transition border border-surface"
                            >
                                <div className="h-8 w-8 mx-auto mb-2 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </div>
                                <span className="font-medium text-sm">Profile</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Community Showcases - Mobile optimized */}
                <div className="bg-surface overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-4 sm:p-6">
                        <h2 className="text-lg font-semibold text-text mb-4">
                            Community Showcases
                        </h2>

                        <div className="space-y-4">
                            {communityShowcases.map((showcase) => (
                                <div key={showcase.id} className="flex items-center space-x-4 p-3 bg-surface-alt rounded-lg">
                                    <img
                                        src={showcase.image}
                                        alt={showcase.item}
                                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "https://placehold.co/64x64/e2e8f0/475569?text=Card";
                                        }}
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-text truncate">{showcase.item}</p>
                                        <p className="text-sm text-text-muted">by {showcase.username}</p>
                                        <div className="flex items-center mt-1">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 text-red-500 mr-1"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span className="text-xs text-text-muted">{showcase.likes}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 text-center">
                            <a
                                href="/community"
                                className="inline-flex items-center text-primary hover:text-primary/80 text-sm font-medium"
                            >
                                View More Showcases
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="ml-1 h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
