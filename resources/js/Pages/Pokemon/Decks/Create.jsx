import React, { useState, useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import {
    XMarkIcon,
    PlusIcon,
    MinusIcon,
    ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

export default function CreateDeck({ collection }) {
    const [selectedCards, setSelectedCards] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [selectedType, setSelectedType] = useState("");

    const { data, setData, post, processing, errors } = useForm({
        name: "",
        format: "",
        notes: "",
        cards: [],
    });

    // Update form data when selected cards change
    useEffect(() => {
        setData(
            "cards",
            selectedCards.map((card) => ({
                pokemon_card_id: card.pokemon_card.id,
                quantity: card.quantity,
            }))
        );
    }, [selectedCards]);

    // Filter cards based on search text and selected type
    const filteredCollection = collection.filter((card) => {
        const nameMatch = card.pokemon_card.name
            .toLowerCase()
            .includes(filterText.toLowerCase());
        const typeMatch =
            selectedType === "" || card.pokemon_card.type === selectedType;
        return nameMatch && typeMatch;
    });

    // Get unique types from collection
    const uniqueTypes = [
        ...new Set(
            collection.map((card) => card.pokemon_card.type).filter(Boolean)
        ),
    ];

    // Add card to selected cards
    const addCard = (collectionCard) => {
        const existingCardIndex = selectedCards.findIndex(
            (card) => card.pokemon_card.id === collectionCard.pokemon_card.id
        );

        if (existingCardIndex !== -1) {
            // Card already selected, increase quantity if below 4
            const updatedCards = [...selectedCards];
            if (updatedCards[existingCardIndex].quantity < 4) {
                updatedCards[existingCardIndex].quantity += 1;
                setSelectedCards(updatedCards);
            }
        } else {
            // Add new card with quantity 1
            setSelectedCards([
                ...selectedCards,
                { ...collectionCard, quantity: 1 },
            ]);
        }
    };

    // Update card quantity in selected cards
    const updateCardQuantity = (index, newQuantity) => {
        if (newQuantity < 1 || newQuantity > 4) return;

        const updatedCards = [...selectedCards];
        updatedCards[index].quantity = newQuantity;
        setSelectedCards(updatedCards);
    };

    // Remove card from selected cards
    const removeCard = (index) => {
        const updatedCards = [...selectedCards];
        updatedCards.splice(index, 1);
        setSelectedCards(updatedCards);
    };

    // Calculate total cards in deck
    const totalCards = selectedCards.reduce(
        (sum, card) => sum + card.quantity,
        0
    );

    // Submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("pokemon.decks.store"));
    };

    return (
        <MainLayout>
            <Head title="Create New Deck" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-surface overflow-hidden shadow-sm sm:rounded-lg p-4 sm:p-6">
                        <div className="flex items-center mb-6">
                            <Link
                                href={route("pokemon.decks.index")}
                                className="mr-4 p-2 text-text-muted hover:text-primary hover:bg-primary/10 rounded-full transition"
                            >
                                <ArrowLeftIcon className="w-5 h-5" />
                            </Link>
                            <h1 className="text-2xl font-bold text-primary">
                                Create New Deck
                            </h1>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Left column - Deck details */}
                                <div className="lg:col-span-1 space-y-6">
                                    <div className="bg-background border border-surface rounded-lg p-4">
                                        <h2 className="text-lg font-semibold mb-4">
                                            Deck Information
                                        </h2>

                                        <div className="space-y-4">
                                            <div>
                                                <label
                                                    htmlFor="name"
                                                    className="block text-sm font-medium mb-1"
                                                >
                                                    Deck Name*
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    value={data.name}
                                                    onChange={(e) =>
                                                        setData(
                                                            "name",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full rounded-md border-surface focus:border-primary focus:ring focus:ring-primary/30"
                                                    required
                                                />
                                                {errors.name && (
                                                    <p className="text-danger text-sm mt-1">
                                                        {errors.name}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="format"
                                                    className="block text-sm font-medium mb-1"
                                                >
                                                    Format (Optional)
                                                </label>
                                                <select
                                                    id="format"
                                                    value={data.format}
                                                    onChange={(e) =>
                                                        setData(
                                                            "format",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full rounded-md border-surface focus:border-primary focus:ring focus:ring-primary/30"
                                                >
                                                    <option value="">
                                                        Select a format
                                                    </option>
                                                    <option value="Standard">
                                                        Standard
                                                    </option>
                                                    <option value="Expanded">
                                                        Expanded
                                                    </option>
                                                    <option value="Legacy">
                                                        Legacy
                                                    </option>
                                                    <option value="Unlimited">
                                                        Unlimited
                                                    </option>
                                                </select>
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="notes"
                                                    className="block text-sm font-medium mb-1"
                                                >
                                                    Notes (Optional)
                                                </label>
                                                <textarea
                                                    id="notes"
                                                    value={data.notes}
                                                    onChange={(e) =>
                                                        setData(
                                                            "notes",
                                                            e.target.value
                                                        )
                                                    }
                                                    rows="4"
                                                    className="w-full rounded-md border-surface focus:border-primary focus:ring focus:ring-primary/30"
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-background border border-surface rounded-lg p-4">
                                        <h2 className="text-lg font-semibold mb-1">
                                            Selected Cards
                                        </h2>
                                        <p className="text-sm text-text-muted mb-4">
                                            Total: {totalCards} cards |{" "}
                                            {selectedCards.length} unique
                                        </p>

                                        {selectedCards.length === 0 ? (
                                            <div className="text-center py-8 text-text-muted">
                                                No cards selected yet
                                            </div>
                                        ) : (
                                            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                                                {selectedCards.map(
                                                    (card, index) => (
                                                        <div
                                                            key={`${card.pokemon_card.id}-${index}`}
                                                            className="flex items-center justify-between bg-surface/50 p-2 rounded-lg"
                                                        >
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 w-10 h-10 mr-3">
                                                                    {card
                                                                        .pokemon_card
                                                                        .image_url ? (
                                                                        <img
                                                                            src={
                                                                                card
                                                                                    .pokemon_card
                                                                                    .image_url
                                                                            }
                                                                            alt={
                                                                                card
                                                                                    .pokemon_card
                                                                                    .name
                                                                            }
                                                                            className="w-full h-full object-cover rounded"
                                                                        />
                                                                    ) : (
                                                                        <div className="w-full h-full bg-surface flex items-center justify-center rounded">
                                                                            <span className="text-xs text-text-muted">
                                                                                No
                                                                                Img
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="text-sm font-medium truncate">
                                                                        {
                                                                            card
                                                                                .pokemon_card
                                                                                .name
                                                                        }
                                                                    </p>
                                                                    <p className="text-xs text-text-muted">
                                                                        {
                                                                            card
                                                                                .pokemon_card
                                                                                .type
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        updateCardQuantity(
                                                                            index,
                                                                            card.quantity -
                                                                                1
                                                                        )
                                                                    }
                                                                    className="p-1 text-text-muted hover:text-primary"
                                                                >
                                                                    <MinusIcon className="w-4 h-4" />
                                                                </button>
                                                                <span className="mx-2 text-sm min-w-[20px] text-center">
                                                                    {
                                                                        card.quantity
                                                                    }
                                                                </span>
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        updateCardQuantity(
                                                                            index,
                                                                            card.quantity +
                                                                                1
                                                                        )
                                                                    }
                                                                    className="p-1 text-text-muted hover:text-primary"
                                                                >
                                                                    <PlusIcon className="w-4 h-4" />
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        removeCard(
                                                                            index
                                                                        )
                                                                    }
                                                                    className="ml-2 p-1 text-danger hover:bg-danger/10 rounded"
                                                                >
                                                                    <XMarkIcon className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex justify-end">
                                        <Link
                                            href={route("pokemon.decks.index")}
                                            className="px-4 py-2 bg-surface text-text-muted rounded-lg hover:bg-surface/80 transition mr-3"
                                        >
                                            Cancel
                                        </Link>
                                        <button
                                            type="submit"
                                            disabled={
                                                processing ||
                                                selectedCards.length === 0
                                            }
                                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition disabled:opacity-70"
                                        >
                                            {processing
                                                ? "Creating..."
                                                : "Create Deck"}
                                        </button>
                                    </div>
                                </div>

                                {/* Right column - Card selection */}
                                <div className="lg:col-span-2">
                                    <div className="bg-background border border-surface rounded-lg p-4">
                                        <h2 className="text-lg font-semibold mb-4">
                                            Select Cards from Your Collection
                                        </h2>

                                        {/* Filter controls */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                            <div className="md:col-span-2">
                                                <input
                                                    type="text"
                                                    placeholder="Search cards by name..."
                                                    value={filterText}
                                                    onChange={(e) =>
                                                        setFilterText(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full rounded-md border-surface focus:border-primary focus:ring focus:ring-primary/30"
                                                />
                                            </div>
                                            <div>
                                                <select
                                                    value={selectedType}
                                                    onChange={(e) =>
                                                        setSelectedType(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full rounded-md border-surface focus:border-primary focus:ring focus:ring-primary/30"
                                                >
                                                    <option value="">
                                                        All Types
                                                    </option>
                                                    {uniqueTypes.map((type) => (
                                                        <option
                                                            key={type}
                                                            value={type}
                                                        >
                                                            {type}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        {/* Card grid */}
                                        {collection.length > 0 ? (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[calc(100vh-400px)] overflow-y-auto pr-2">
                                                {filteredCollection.map(
                                                    (card) => (
                                                        <div
                                                            key={card.id}
                                                            className="bg-surface/50 rounded-lg overflow-hidden border border-surface hover:shadow-md transition-shadow"
                                                        >
                                                            <div className="relative">
                                                                {card
                                                                    .pokemon_card
                                                                    .image_url ? (
                                                                    <img
                                                                        src={
                                                                            card
                                                                                .pokemon_card
                                                                                .image_url
                                                                        }
                                                                        alt={
                                                                            card
                                                                                .pokemon_card
                                                                                .name
                                                                        }
                                                                        className="w-full h-32 object-cover"
                                                                    />
                                                                ) : (
                                                                    <div className="w-full h-32 bg-surface flex items-center justify-center">
                                                                        <span className="text-text-muted">
                                                                            No
                                                                            Image
                                                                        </span>
                                                                    </div>
                                                                )}
                                                                <div className="absolute top-2 right-2 bg-background/80 px-2 py-1 rounded text-xs font-medium">
                                                                    {
                                                                        card.quantity
                                                                    }{" "}
                                                                    in
                                                                    collection
                                                                </div>
                                                                {card
                                                                    .pokemon_card
                                                                    .rarity && (
                                                                    <div className="absolute bottom-2 left-2 bg-background/80 px-2 py-1 rounded text-xs font-medium flex items-center">
                                                                        <StarIcon className="h-3 w-3 text-yellow-500 mr-1" />
                                                                        {
                                                                            card
                                                                                .pokemon_card
                                                                                .rarity
                                                                        }
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="p-3">
                                                                <h3 className="text-sm font-medium line-clamp-1">
                                                                    {
                                                                        card
                                                                            .pokemon_card
                                                                            .name
                                                                    }
                                                                </h3>
                                                                <p className="text-xs text-text-muted mt-1">
                                                                    {card
                                                                        .pokemon_card
                                                                        .type ||
                                                                        "No Type"}{" "}
                                                                    •{" "}
                                                                    {card
                                                                        .pokemon_card
                                                                        .set ||
                                                                        "No Set"}
                                                                </p>
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        addCard(
                                                                            card
                                                                        )
                                                                    }
                                                                    className="mt-2 w-full py-1 px-3 bg-primary/10 text-primary text-sm rounded hover:bg-primary/20 transition flex items-center justify-center"
                                                                >
                                                                    <PlusIcon className="w-4 h-4 mr-1" />
                                                                    Add to Deck
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        ) : (
                                            <div className="text-center py-8">
                                                <p className="text-text-muted">
                                                    Your collection is empty.
                                                    Add cards to your collection
                                                    first.
                                                </p>
                                                <Link
                                                    href={route(
                                                        "pokemon.collection"
                                                    )}
                                                    className="mt-4 inline-block px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
                                                >
                                                    Go to Collection
                                                </Link>
                                            </div>
                                        )}

                                        {filteredCollection.length === 0 &&
                                            collection.length > 0 && (
                                                <div className="text-center py-8">
                                                    <p className="text-text-muted">
                                                        No cards match your
                                                        search criteria.
                                                    </p>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setFilterText("");
                                                            setSelectedType("");
                                                        }}
                                                        className="mt-4 px-4 py-2 bg-secondary/20 text-secondary rounded-lg hover:bg-secondary/30 transition"
                                                    >
                                                        Clear Filters
                                                    </button>
                                                </div>
                                            )}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
