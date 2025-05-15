import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import {
    ArrowLeftIcon,
    PencilIcon,
    ShareIcon,
    TrashIcon,
    ArrowTopRightOnSquareIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChartPieIcon } from "@heroicons/react/24/solid";

export default function ShowDeck({ deck, success, shareUrl }) {
    const [showShareModal, setShowShareModal] = useState(false);
    const [showTypeChart, setShowTypeChart] = useState(false);

    // Group cards by type for statistics
    const typeGroups = deck.deck_cards.reduce((groups, deckCard) => {
        const type = deckCard.pokemon_card.type || "Unknown";
        if (!groups[type]) {
            groups[type] = { count: 0, cards: [] };
        }
        groups[type].count += deckCard.quantity;
        groups[type].cards.push(deckCard);
        return groups;
    }, {});

    // Sort cards by name
    const sortedCards = [...deck.deck_cards].sort((a, b) =>
        a.pokemon_card.name.localeCompare(b.pokemon_card.name)
    );

    // Calculate total cards
    const totalCards = deck.deck_cards.reduce(
        (sum, card) => sum + card.quantity,
        0
    );

    // Copy share URL to clipboard
    const copyShareUrl = () => {
        navigator.clipboard
            .writeText(shareUrl)
            .then(() => {
                alert("Share URL copied to clipboard!");
            })
            .catch((err) => {
                console.error("Failed to copy: ", err);
            });
    };

    return (
        <MainLayout>
            <Head title={`Deck: ${deck.name}`} />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Header section with title and actions */}
                    <div className="bg-surface p-4 sm:p-6 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex items-center mb-4">
                            <Link
                                href={route("pokemon.decks.index")}
                                className="mr-4 p-2 text-text-muted hover:text-primary hover:bg-primary/10 rounded-full transition"
                            >
                                <ArrowLeftIcon className="w-5 h-5" />
                            </Link>
                            <h1 className="text-2xl font-bold text-primary">
                                {deck.name}
                            </h1>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            {deck.format && (
                                <span className="px-3 py-1 bg-tertiary/10 text-tertiary rounded-full text-sm">
                                    {deck.format}
                                </span>
                            )}
                            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                                {totalCards} cards
                            </span>
                            <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">
                                {deck.deck_cards.length} unique
                            </span>
                            <button
                                onClick={() => setShowTypeChart(!showTypeChart)}
                                className="px-3 py-1 bg-surface border border-surface rounded-full text-sm flex items-center hover:bg-surface/80 transition"
                            >
                                <ChartPieIcon className="w-4 h-4 mr-1" />
                                <span>Type Distribution</span>
                            </button>
                        </div>

                        {deck.notes && (
                            <div className="mt-4 p-4 bg-background rounded-lg border border-surface">
                                <h3 className="font-medium mb-2">Notes:</h3>
                                <p className="text-text-muted whitespace-pre-line">
                                    {deck.notes}
                                </p>
                            </div>
                        )}

                        {/* Success Messages */}
                        {success && (
                            <div className="mt-4 p-3 bg-success/20 border border-success text-success rounded-lg">
                                {success}
                            </div>
                        )}

                        {/* Action buttons */}
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link
                                href={route("pokemon.decks.edit", deck.id)}
                                className="px-4 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition flex items-center"
                            >
                                <PencilIcon className="w-5 h-5 mr-2" />
                                Edit Deck
                            </Link>
                            <button
                                onClick={() => setShowShareModal(true)}
                                className="px-4 py-2 bg-tertiary/20 text-tertiary rounded-lg hover:bg-tertiary/30 transition flex items-center"
                            >
                                <ShareIcon className="w-5 h-5 mr-2" />
                                Share Deck
                            </button>
                            <Link
                                href={route("pokemon.decks.destroy", deck.id)}
                                method="delete"
                                as="button"
                                className="px-4 py-2 bg-danger/20 text-danger rounded-lg hover:bg-danger/30 transition flex items-center"
                            >
                                <TrashIcon className="w-5 h-5 mr-2" />
                                Delete Deck
                            </Link>
                        </div>
                    </div>

                    {/* Type Distribution Chart */}
                    {showTypeChart && (
                        <div className="bg-surface overflow-hidden shadow-sm sm:rounded-lg p-4 sm:p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">
                                    Type Distribution
                                </h2>
                                <button
                                    onClick={() => setShowTypeChart(false)}
                                    className="text-text-muted hover:text-text"
                                >
                                    <XMarkIcon className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <div className="bg-background rounded-lg p-4 h-full">
                                        <div className="space-y-3">
                                            {Object.entries(typeGroups).map(
                                                ([type, data]) => (
                                                    <div
                                                        key={type}
                                                        className="flex items-center"
                                                    >
                                                        <div className="w-24 font-medium">
                                                            {type}
                                                        </div>
                                                        <div className="flex-1 mx-2">
                                                            <div className="h-5 bg-surface overflow-hidden rounded-full">
                                                                <div
                                                                    className="h-full bg-primary"
                                                                    style={{
                                                                        width: `${
                                                                            (data.count /
                                                                                totalCards) *
                                                                            100
                                                                        }%`,
                                                                    }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                        <div className="text-text-muted text-sm w-16 text-right">
                                                            {data.count} (
                                                            {Math.round(
                                                                (data.count /
                                                                    totalCards) *
                                                                    100
                                                            )}
                                                            %)
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="bg-background rounded-lg p-4 h-full">
                                        <h3 className="font-medium mb-3">
                                            Cards by Type
                                        </h3>
                                        <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                                            {Object.entries(typeGroups).map(
                                                ([type, data]) => (
                                                    <div
                                                        key={type}
                                                        className="space-y-2"
                                                    >
                                                        <h4 className="text-sm font-medium text-primary">
                                                            {type}
                                                        </h4>
                                                        <ul className="pl-4 space-y-1">
                                                            {data.cards.map(
                                                                (card) => (
                                                                    <li
                                                                        key={
                                                                            card.id
                                                                        }
                                                                        className="text-sm flex justify-between"
                                                                    >
                                                                        <span>
                                                                            {
                                                                                card
                                                                                    .pokemon_card
                                                                                    .name
                                                                            }
                                                                        </span>
                                                                        <span className="text-text-muted">
                                                                            ×
                                                                            {
                                                                                card.quantity
                                                                            }
                                                                        </span>
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Deck Cards Grid */}
                    <div className="bg-surface overflow-hidden shadow-sm sm:rounded-lg p-4 sm:p-6">
                        <h2 className="text-xl font-semibold mb-6">
                            Cards in this Deck
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {sortedCards.map((deckCard) => (
                                <div
                                    key={deckCard.id}
                                    className="bg-background border border-surface rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                                >
                                    <div className="relative">
                                        {deckCard.pokemon_card.image_url ? (
                                            <img
                                                src={
                                                    deckCard.pokemon_card
                                                        .image_url
                                                }
                                                alt={deckCard.pokemon_card.name}
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
                                        <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded text-sm font-medium">
                                            ×{deckCard.quantity}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold line-clamp-1">
                                            {deckCard.pokemon_card.name}
                                        </h3>
                                        <div className="mt-2 text-sm text-text-muted space-y-1">
                                            {deckCard.pokemon_card.type && (
                                                <p className="flex items-center">
                                                    <span className="font-medium w-16">
                                                        Type:
                                                    </span>
                                                    <span>
                                                        {
                                                            deckCard
                                                                .pokemon_card
                                                                .type
                                                        }
                                                    </span>
                                                </p>
                                            )}
                                            {deckCard.pokemon_card.rarity && (
                                                <p className="flex items-center">
                                                    <span className="font-medium w-16">
                                                        Rarity:
                                                    </span>
                                                    <span>
                                                        {
                                                            deckCard
                                                                .pokemon_card
                                                                .rarity
                                                        }
                                                    </span>
                                                </p>
                                            )}
                                            {deckCard.pokemon_card.set && (
                                                <p className="flex items-center">
                                                    <span className="font-medium w-16">
                                                        Set:
                                                    </span>
                                                    <span>
                                                        {
                                                            deckCard
                                                                .pokemon_card
                                                                .set
                                                        }
                                                    </span>
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Share Modal */}
            {showShareModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-background rounded-lg shadow-xl w-full max-w-md mx-auto p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-primary">
                                Share Your Deck
                            </h2>
                            <button
                                onClick={() => setShowShareModal(false)}
                                className="text-text-muted hover:text-text"
                            >
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>

                        <p className="text-text-muted mb-4">
                            Share this deck with other players using the link
                            below:
                        </p>

                        <div className="flex items-center mb-4">
                            <input
                                type="text"
                                readOnly
                                value={
                                    shareUrl || "Generate a share link first"
                                }
                                className="flex-1 rounded-l-md border-surface bg-surface/50 focus:border-primary focus:ring focus:ring-primary/30"
                            />
                            <button
                                onClick={copyShareUrl}
                                disabled={!shareUrl}
                                className="px-4 py-2 bg-primary text-white rounded-r-md hover:bg-primary/90 transition disabled:opacity-70"
                            >
                                Copy
                            </button>
                        </div>

                        {!shareUrl && (
                            <div className="mb-4">
                                <Link
                                    href={route("pokemon.decks.share", deck.id)}
                                    method="post"
                                    className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition text-center block"
                                >
                                    Generate Share Link
                                </Link>
                            </div>
                        )}

                        <div className="mt-6 border-t border-surface pt-4">
                            <h3 className="font-medium mb-2">
                                What gets shared:
                            </h3>
                            <ul className="list-disc pl-5 text-sm text-text-muted space-y-1">
                                <li>Deck name and format</li>
                                <li>Cards in the deck</li>
                                <li>Notes you've added</li>
                                <li>Your username as the deck creator</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </MainLayout>
    );
}
