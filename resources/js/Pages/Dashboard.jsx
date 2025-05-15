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
        {
            id: 3,
            type: "beyblade",
            name: "Dragoon F",
            series: "Plastic Gen",
            condition: "Mint",
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
        {
            id: 2,
            username: "beymaster",
            item: "Dranzer MS",
            type: "beyblade",
            likes: 187,
            image: "/images/placeholder.jpg",
        },
    ];

    return (
        <MainLayout>
            <Head title="Dashboard" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Welcome section - with stronger call to action */}
                    <div className="bg-surface overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6 text-text">
                            <h1 className="text-2xl font-semibold">
                                Welcome back, {auth?.user?.name}!
                            </h1>
                            <p className="mt-2 text-text-muted">
                                Manage your Pokémon and Beyblade collections all
                                in one place.
                            </p>
                            <div className="mt-4 flex flex-wrap gap-3">
                                <a
                                    href="/pokemon/collection"
                                    className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary/90 transition"
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
                                    Add to Collection
                                </a>
                                <a
                                    href="/community"
                                    className="inline-flex items-center px-4 py-2 border border-primary text-primary rounded-md text-sm font-medium hover:bg-primary/10 transition"
                                >
                                    Explore Community
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Stats overview - Quick metrics for better context */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="bg-surface p-4 rounded-lg shadow flex items-center space-x-4">
                            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
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
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <div className="text-sm text-text-muted">
                                    Total items
                                </div>
                                <div className="text-xl font-semibold">157</div>
                            </div>
                        </div>
                        <div className="bg-surface p-4 rounded-lg shadow flex items-center space-x-4">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 flex-shrink-0">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-sm text-text-muted">
                                    Pokémon
                                </div>
                                <div className="text-xl font-semibold">108</div>
                            </div>
                        </div>
                        <div className="bg-surface p-4 rounded-lg shadow flex items-center space-x-4">
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
                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                    />
                                </svg>
                            </div>
                            <div>
                                <div className="text-sm text-text-muted">
                                    Beyblades
                                </div>
                                <div className="text-xl font-semibold">49</div>
                            </div>
                        </div>
                        <div className="bg-surface p-4 rounded-lg shadow flex items-center space-x-4">
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
                                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <div className="text-sm text-text-muted">
                                    Last added
                                </div>
                                <div className="text-sm font-medium">Today</div>
                            </div>
                        </div>
                    </div>

                    {/* Collection Highlights - with added filter capabilities */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">
                                Your Collection Highlights
                            </h2>
                            <div className="flex space-x-2">
                                <button className="px-3 py-1 bg-primary/10 hover:bg-primary/20 text-primary text-sm rounded-full transition">
                                    All
                                </button>
                                <button className="px-3 py-1 bg-surface hover:bg-primary/10 text-text-muted text-sm rounded-full transition">
                                    Pokémon
                                </button>
                                <button className="px-3 py-1 bg-surface hover:bg-primary/10 text-text-muted text-sm rounded-full transition">
                                    Beyblade
                                </button>
                            </div>
                        </div>

                        {/* existing collection grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {collectionHighlights.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-surface rounded-lg shadow overflow-hidden hover:shadow-md transition cursor-pointer"
                                >
                                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-500">
                                            [Item Image]
                                        </span>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-medium text-lg">
                                                    {item.name}
                                                </h3>
                                                {item.type === "pokemon" ? (
                                                    <p className="text-sm text-text-muted">
                                                        {item.rarity} ·{" "}
                                                        {item.set}
                                                    </p>
                                                ) : (
                                                    <p className="text-sm text-text-muted">
                                                        {item.series} ·{" "}
                                                        {item.condition}
                                                    </p>
                                                )}
                                            </div>
                                            <span className="text-xs uppercase font-medium px-2 py-1 rounded bg-primary/10 text-primary">
                                                {item.type}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 text-right">
                            <a
                                href="/collections"
                                className="text-primary hover:underline text-sm font-medium inline-flex items-center"
                            >
                                View all collections
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 ml-1"
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

                    {/* Quick Actions - now as a tabbed interface for better organization */}
                    <div className="bg-surface overflow-hidden shadow-sm sm:rounded-lg mb-8">
                        <div className="border-b border-surface">
                            <nav className="flex -mb-px">
                                <button className="text-primary border-primary px-4 py-3 border-b-2 font-medium text-sm">
                                    Quick Actions
                                </button>
                                <button className="text-text-muted hover:text-text border-transparent px-4 py-3 border-b-2 font-medium text-sm">
                                    Recent Activity
                                </button>
                            </nav>
                        </div>
                        <div className="p-6">
                            {/* existing quick actions grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <a
                                    href="/pokemon/collection"
                                    className="bg-primary/10 hover:bg-primary/20 rounded-lg p-4 text-center transition"
                                >
                                    <div className="h-10 w-10 mx-auto mb-2 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
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
                                    <span className="font-medium">
                                        Add Pokémon
                                    </span>
                                </a>
                                <a
                                    href="/beyblade/collection"
                                    className="bg-primary/10 hover:bg-primary/20 rounded-lg p-4 text-center transition"
                                >
                                    <div className="h-10 w-10 mx-auto mb-2 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
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
                                    <span className="font-medium">
                                        Add Beyblade
                                    </span>
                                </a>
                                <a
                                    href="/profile"
                                    className="bg-surface-alt hover:bg-surface-alt/80 rounded-lg p-4 text-center transition border border-surface"
                                >
                                    <div className="h-10 w-10 mx-auto mb-2 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
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
                                    <span className="font-medium">
                                        Edit Profile
                                    </span>
                                </a>
                                <a
                                    href="/settings"
                                    className="bg-surface-alt hover:bg-surface-alt/80 rounded-lg p-4 text-center transition border border-surface"
                                >
                                    <div className="h-10 w-10 mx-auto mb-2 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                    </div>
                                    <span className="font-medium">
                                        Settings
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Community Showcases - with improved interaction elements */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">
                                Community Showcases
                            </h2>
                            <button className="px-3 py-1 border border-primary text-primary text-sm rounded-full hover:bg-primary/10 transition">
                                What's Hot
                            </button>
                        </div>

                        {/* Improved showcase cards with better interaction affordances */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {communityShowcases.map((showcase) => (
                                <div
                                    key={showcase.id}
                                    className="bg-surface rounded-lg shadow overflow-hidden flex flex-col md:flex-row hover:shadow-md transition"
                                >
                                    <div className="md:w-1/3 h-48 md:h-auto bg-gray-200 flex items-center justify-center relative cursor-pointer">
                                        <span className="text-gray-500">
                                            [Showcase Image]
                                        </span>
                                        <div className="absolute inset-0 bg-black/0 hover:bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-10 w-10 text-white"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="p-4 md:w-2/3">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-medium text-lg">
                                                    {showcase.item}
                                                </h3>
                                                <p className="text-sm text-text-muted">
                                                    Shared by{" "}
                                                    <span className="font-medium">
                                                        {showcase.username}
                                                    </span>
                                                </p>
                                            </div>
                                            <span className="text-xs uppercase font-medium px-2 py-1 rounded bg-primary/10 text-primary">
                                                {showcase.type}
                                            </span>
                                        </div>
                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="flex items-center text-text-muted">
                                                <button className="flex items-center hover:text-primary transition">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5 mr-1"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                                        />
                                                    </svg>
                                                    <span>
                                                        {showcase.likes} likes
                                                    </span>
                                                </button>
                                            </div>
                                            <button className="text-sm text-primary hover:underline">
                                                Comment
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 text-center">
                            <a
                                href="/community"
                                className="inline-block px-4 py-2 bg-surface border border-surface hover:bg-surface-alt rounded-md text-text-muted hover:text-text transition"
                            >
                                Explore More From Community
                            </a>
                        </div>
                    </div>

                    {/* Coming Soon Section - with more visual appeal */}
                    <div className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-6 text-center relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-xl font-semibold mb-2">
                                More Features Coming Soon!
                            </h2>
                            <p className="text-text-muted max-w-2xl mx-auto">
                                We're working on adding trading features,
                                collection analytics, and more community
                                features. Stay tuned for updates!
                            </p>
                            <button className="mt-4 bg-white/90 hover:bg-white text-primary px-4 py-2 rounded-md text-sm font-medium transition">
                                Join Beta Program
                            </button>
                        </div>
                        <div className="absolute top-0 right-0 opacity-10">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-48 w-48 text-primary"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1}
                                    d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
