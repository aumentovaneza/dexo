import React, { useState } from "react";
import { Head, Link, useForm, router } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

// Ensure route function exists
const safeRoute = (name, params, absolute) => {
    if (typeof window.route === "undefined") {
        console.warn("Route function is not defined. Using fallback.");
        // Fallback routes for critical functionality
        const routes = {
            "pokemon.collection.add": "/pokemon/collection/add",
            "pokemon.collection.update": (id) => `/pokemon/collection/${id}`,
            "pokemon.collection.remove": (id) => `/pokemon/collection/${id}`,
            "pokemon.decks.index": "/pokemon/decks",
        };

        if (typeof routes[name] === "function") {
            return routes[name](params);
        }
        return routes[name] || "#";
    }
    return window.route(name, params, absolute);
};

export default function Collection({
    collection = { data: [], links: [] },
    success,
    error,
}) {
    const [isAddingCard, setIsAddingCard] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [activeFilters, setActiveFilters] = useState({
        type: "",
        rarity: "",
        set: "",
    });

    // Card add form
    const { data, setData, post, processing, errors, reset } = useForm({
        pokemon_card_id: "",
        card_name: "",
        quantity: 1,
        tags: [],
    });

    const submitAddCard = (e) => {
        e.preventDefault();
        post(safeRoute("pokemon.collection.add"), {
            onSuccess: () => {
                reset();
                setIsAddingCard(false);
            },
        });
    };

    // Filter function for collection cards
    const filterCards = (cards) => {
        return cards.filter((item) => {
            // Type filter
            if (
                activeFilters.type &&
                item.pokemon_card.type !== activeFilters.type
            ) {
                return false;
            }
            // Rarity filter
            if (
                activeFilters.rarity &&
                item.pokemon_card.rarity !== activeFilters.rarity
            ) {
                return false;
            }
            // Set filter
            if (
                activeFilters.set &&
                item.pokemon_card.set !== activeFilters.set
            ) {
                return false;
            }
            return true;
        });
    };

    const filteredCards =
        collection.data && Array.isArray(collection.data)
            ? filterCards(collection.data)
            : [];

    // Extract unique values for filters
    const getUniqueValues = (field) => {
        if (!collection.data || !Array.isArray(collection.data)) return [];

        const values = collection.data
            .filter(
                (item) => item && item.pokemon_card && item.pokemon_card[field]
            )
            .map((item) => item.pokemon_card[field])
            .filter(Boolean);
        return [...new Set(values)];
    };

    const types = getUniqueValues("type");
    const rarities = getUniqueValues("rarity");
    const sets = getUniqueValues("set");

    // Handle filter change
    const handleFilterChange = (field, value) => {
        setActiveFilters((prev) => ({
            ...prev,
            [field]: value === prev[field] ? "" : value,
        }));
    };

    return (
        <MainLayout>
            <Head title="Pokemon Collection" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Header section with title and actions */}
                    <div className="bg-surface p-4 sm:p-6 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <h1 className="text-2xl font-bold text-primary">
                                Your Pokemon Collection
                            </h1>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="px-4 py-2 bg-secondary/20 text-secondary rounded-lg hover:bg-secondary/30 transition flex items-center gap-2 cursor-pointer"
                                >
                                    <span>Filters</span>
                                    {Object.values(activeFilters).some(
                                        Boolean
                                    ) && (
                                        <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full">
                                            {
                                                Object.values(
                                                    activeFilters
                                                ).filter(Boolean).length
                                            }
                                        </span>
                                    )}
                                </button>
                                <Link
                                    href={safeRoute("pokemon.decks.index")}
                                    className="px-4 py-2 bg-tertiary/20 text-tertiary rounded-lg hover:bg-tertiary/30 transition"
                                >
                                    Your Decks
                                </Link>
                                <button
                                    onClick={() => setIsAddingCard(true)}
                                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition flex items-center gap-2 cursor-pointer"
                                >
                                    <PlusIcon className="w-5 h-5" />
                                    <span>Add Card</span>
                                </button>
                            </div>
                        </div>

                        {/* Filter Section */}
                        {showFilters && (
                            <div className="mt-4 p-4 bg-background rounded-lg border border-surface">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-medium">
                                        Filter Cards
                                    </h3>
                                    <button
                                        onClick={() =>
                                            setActiveFilters({
                                                type: "",
                                                rarity: "",
                                                set: "",
                                            })
                                        }
                                        className="text-sm text-primary hover:underline"
                                    >
                                        Clear All
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* Type Filter */}
                                    <div>
                                        <h4 className="text-sm font-medium mb-2">
                                            Type
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {types.map((type) => (
                                                <button
                                                    key={`type-${type}`}
                                                    onClick={() =>
                                                        handleFilterChange(
                                                            "type",
                                                            type
                                                        )
                                                    }
                                                    className={`px-3 py-1 text-sm rounded-full transition ${
                                                        activeFilters.type ===
                                                        type
                                                            ? "bg-primary text-white"
                                                            : "bg-surface hover:bg-surface/80"
                                                    }`}
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    {/* Rarity Filter */}
                                    <div>
                                        <h4 className="text-sm font-medium mb-2">
                                            Rarity
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {rarities.map((rarity) => (
                                                <button
                                                    key={`rarity-${rarity}`}
                                                    onClick={() =>
                                                        handleFilterChange(
                                                            "rarity",
                                                            rarity
                                                        )
                                                    }
                                                    className={`px-3 py-1 text-sm rounded-full transition ${
                                                        activeFilters.rarity ===
                                                        rarity
                                                            ? "bg-primary text-white"
                                                            : "bg-surface hover:bg-surface/80"
                                                    }`}
                                                >
                                                    {rarity}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    {/* Set Filter */}
                                    <div>
                                        <h4 className="text-sm font-medium mb-2">
                                            Set
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {sets.map((set) => (
                                                <button
                                                    key={`set-${set}`}
                                                    onClick={() =>
                                                        handleFilterChange(
                                                            "set",
                                                            set
                                                        )
                                                    }
                                                    className={`px-3 py-1 text-sm rounded-full transition ${
                                                        activeFilters.set ===
                                                        set
                                                            ? "bg-primary text-white"
                                                            : "bg-surface hover:bg-surface/80"
                                                    }`}
                                                >
                                                    {set}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Success & Error Messages */}
                        {success && (
                            <div className="mt-4 p-3 bg-success/20 border border-success text-success rounded-lg">
                                {success}
                            </div>
                        )}
                        {error && (
                            <div className="mt-4 p-3 bg-danger/20 border border-danger text-danger rounded-lg">
                                {error}
                            </div>
                        )}
                    </div>

                    {/* Collection Cards Grid */}
                    <div className="bg-surface overflow-hidden shadow-sm sm:rounded-lg p-4 sm:p-6">
                        {filteredCards.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {filteredCards.map((item) => (
                                    <div
                                        key={item.id}
                                        className="bg-background border border-surface rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                                    >
                                        <div className="relative">
                                            {item.pokemon_card.image_url ? (
                                                <img
                                                    src={
                                                        item.pokemon_card
                                                            .image_url
                                                    }
                                                    alt={item.pokemon_card.name}
                                                    className="w-full object-cover h-48"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="w-full h-48 flex items-center justify-center bg-surface/50">
                                                    <span className="text-text-muted">
                                                        No Image
                                                    </span>
                                                </div>
                                            )}
                                            {item.pokemon_card.rarity && (
                                                <div className="absolute top-2 right-2 bg-background/80 px-2 py-1 rounded text-xs font-medium flex items-center">
                                                    <StarIcon className="h-3 w-3 text-yellow-500 mr-1" />
                                                    {item.pokemon_card.rarity}
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-lg font-semibold line-clamp-1">
                                                    {item.pokemon_card.name}
                                                </h3>
                                                <span className="px-2 py-1 bg-primary/10 text-primary text-sm font-medium rounded">
                                                    ×{item.quantity}
                                                </span>
                                            </div>
                                            <div className="mt-2 text-sm text-text-muted space-y-1">
                                                {item.pokemon_card.type && (
                                                    <p className="flex items-center">
                                                        <span className="font-medium w-16">
                                                            Type:
                                                        </span>
                                                        <span>
                                                            {
                                                                item
                                                                    .pokemon_card
                                                                    .type
                                                            }
                                                        </span>
                                                    </p>
                                                )}
                                                {item.pokemon_card.set && (
                                                    <p className="flex items-center">
                                                        <span className="font-medium w-16">
                                                            Set:
                                                        </span>
                                                        <span>
                                                            {
                                                                item
                                                                    .pokemon_card
                                                                    .set
                                                            }
                                                        </span>
                                                    </p>
                                                )}
                                            </div>
                                            <div className="mt-4 flex justify-between">
                                                <button
                                                    onClick={() =>
                                                        router.visit(
                                                            safeRoute(
                                                                "pokemon.collection.update",
                                                                item.id
                                                            ),
                                                            { method: "put" }
                                                        )
                                                    }
                                                    className="px-3 py-1 bg-primary/20 text-primary rounded hover:bg-primary/30 transition flex items-center"
                                                >
                                                    <PencilIcon className="h-4 w-4 mr-1" />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        router.visit(
                                                            safeRoute(
                                                                "pokemon.collection.remove",
                                                                item.id
                                                            ),
                                                            { method: "delete" }
                                                        )
                                                    }
                                                    className="px-3 py-1 bg-danger/20 text-danger rounded hover:bg-danger/30 transition flex items-center"
                                                >
                                                    <TrashIcon className="h-4 w-4 mr-1" />
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-surface/50 mb-4">
                                    <PlusIcon className="h-8 w-8 text-text-muted" />
                                </div>
                                <p className="text-text-muted mb-4">
                                    {Object.values(activeFilters).some(Boolean)
                                        ? "No cards match your filter criteria."
                                        : "Your collection is empty. Start adding Pokemon cards!"}
                                </p>
                                {Object.values(activeFilters).some(Boolean) ? (
                                    <button
                                        onClick={() =>
                                            setActiveFilters({
                                                type: "",
                                                rarity: "",
                                                set: "",
                                            })
                                        }
                                        className="px-4 py-2 bg-secondary/20 text-secondary rounded-lg hover:bg-secondary/30 transition"
                                    >
                                        Clear Filters
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setIsAddingCard(true)}
                                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
                                    >
                                        Add Your First Card
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Pagination */}
                        {collection.data &&
                            collection.data.length > 0 &&
                            collection.links &&
                            Array.isArray(collection.links) && (
                                <div className="mt-8 flex justify-center">
                                    <div className="flex space-x-1">
                                        {collection.links.map((link, i) => (
                                            <Link
                                                key={i}
                                                href={link.url || "#"}
                                                className={`px-4 py-2 rounded ${
                                                    link.active
                                                        ? "bg-primary text-white"
                                                        : "bg-surface text-text-muted hover:bg-surface/80"
                                                } ${
                                                    !link.url
                                                        ? "opacity-50 cursor-not-allowed"
                                                        : ""
                                                }`}
                                                dangerouslySetInnerHTML={{
                                                    __html: link.label || "",
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </div>

            {/* Add Card Modal */}
            {isAddingCard && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-background rounded-lg shadow-xl w-full max-w-md mx-auto p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-primary">
                                Add Card to Collection
                            </h2>
                            <button
                                onClick={() => setIsAddingCard(false)}
                                className="text-text-muted hover:text-text"
                            >
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>

                        <form onSubmit={submitAddCard}>
                            <div className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="card_name"
                                        className="block text-sm font-medium text-text mb-1"
                                    >
                                        Card Name
                                    </label>
                                    <input
                                        type="text"
                                        id="card_name"
                                        className="w-full rounded-md border-surface bg-background shadow-sm focus:border-primary focus:ring focus:ring-primary/30"
                                        value={data.card_name}
                                        onChange={(e) =>
                                            setData("card_name", e.target.value)
                                        }
                                        required
                                    />
                                    {errors.card_name && (
                                        <p className="text-danger text-sm mt-1">
                                            {errors.card_name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="quantity"
                                        className="block text-sm font-medium text-text mb-1"
                                    >
                                        Quantity
                                    </label>
                                    <input
                                        type="number"
                                        id="quantity"
                                        min="1"
                                        className="w-full rounded-md border-surface bg-background shadow-sm focus:border-primary focus:ring focus:ring-primary/30"
                                        value={data.quantity}
                                        onChange={(e) =>
                                            setData(
                                                "quantity",
                                                parseInt(e.target.value)
                                            )
                                        }
                                        required
                                    />
                                    {errors.quantity && (
                                        <p className="text-danger text-sm mt-1">
                                            {errors.quantity}
                                        </p>
                                    )}
                                </div>

                                <div className="flex justify-end gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsAddingCard(false)}
                                        className="px-4 py-2 bg-surface text-text-muted rounded hover:bg-surface/80 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition disabled:opacity-70"
                                    >
                                        {processing
                                            ? "Adding..."
                                            : "Add to Collection"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </MainLayout>
    );
}
