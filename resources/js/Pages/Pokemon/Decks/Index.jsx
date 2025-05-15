import React from "react";
import { Head, Link } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import {
    PlusIcon,
    EyeIcon,
    PencilIcon,
    TrashIcon,
    ShareIcon,
} from "@heroicons/react/24/outline";

export default function DecksIndex({ decks, success }) {
    return (
        <MainLayout>
            <Head title="Your Pokemon Decks" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Header section with title and actions */}
                    <div className="bg-surface p-4 sm:p-6 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <h1 className="text-2xl font-bold text-primary">
                                Your Pokemon Decks
                            </h1>
                            <div className="flex flex-wrap gap-2">
                                <Link
                                    href={route("pokemon.collection")}
                                    className="px-4 py-2 bg-secondary/20 text-secondary rounded-lg hover:bg-secondary/30 transition"
                                >
                                    Your Collection
                                </Link>
                                <Link
                                    href={route("pokemon.decks.create")}
                                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition flex items-center gap-2"
                                >
                                    <PlusIcon className="w-5 h-5" />
                                    <span>New Deck</span>
                                </Link>
                            </div>
                        </div>

                        {/* Success Messages */}
                        {success && (
                            <div className="mt-4 p-3 bg-success/20 border border-success text-success rounded-lg">
                                {success}
                            </div>
                        )}
                    </div>

                    {/* Decks List */}
                    <div className="bg-surface overflow-hidden shadow-sm sm:rounded-lg p-4 sm:p-6">
                        {decks.data.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {decks.data.map((deck) => (
                                    <div
                                        key={deck.id}
                                        className="bg-background border border-surface rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                                    >
                                        <div className="p-5">
                                            <h3 className="text-xl font-semibold line-clamp-1">
                                                {deck.name}
                                            </h3>

                                            <div className="mt-2 flex items-center space-x-3">
                                                {deck.format && (
                                                    <span className="px-2 py-1 bg-tertiary/10 text-tertiary text-sm rounded">
                                                        {deck.format}
                                                    </span>
                                                )}
                                                <span className="px-2 py-1 bg-primary/10 text-primary text-sm rounded">
                                                    {deck.deck_cards_count}{" "}
                                                    cards
                                                </span>
                                            </div>

                                            {deck.notes && (
                                                <div className="mt-3 text-text-muted text-sm line-clamp-2">
                                                    {deck.notes}
                                                </div>
                                            )}

                                            <div className="mt-5 flex items-center justify-between pt-3 border-t border-surface">
                                                <div className="flex space-x-2">
                                                    <Link
                                                        href={route(
                                                            "pokemon.decks.show",
                                                            deck.id
                                                        )}
                                                        className="p-2 text-secondary hover:bg-secondary/10 rounded-full transition"
                                                        title="View Deck"
                                                    >
                                                        <EyeIcon className="w-5 h-5" />
                                                    </Link>
                                                    <Link
                                                        href={route(
                                                            "pokemon.decks.edit",
                                                            deck.id
                                                        )}
                                                        className="p-2 text-primary hover:bg-primary/10 rounded-full transition"
                                                        title="Edit Deck"
                                                    >
                                                        <PencilIcon className="w-5 h-5" />
                                                    </Link>
                                                    <Link
                                                        href={route(
                                                            "pokemon.decks.share",
                                                            deck.id
                                                        )}
                                                        method="post"
                                                        as="button"
                                                        className="p-2 text-tertiary hover:bg-tertiary/10 rounded-full transition"
                                                        title="Share Deck"
                                                    >
                                                        <ShareIcon className="w-5 h-5" />
                                                    </Link>
                                                </div>
                                                <Link
                                                    href={route(
                                                        "pokemon.decks.destroy",
                                                        deck.id
                                                    )}
                                                    method="delete"
                                                    as="button"
                                                    className="p-2 text-danger hover:bg-danger/10 rounded-full transition"
                                                    title="Delete Deck"
                                                >
                                                    <TrashIcon className="w-5 h-5" />
                                                </Link>
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
                                    You haven't created any decks yet. Build
                                    your first deck now!
                                </p>
                                <Link
                                    href={route("pokemon.decks.create")}
                                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
                                >
                                    Create Your First Deck
                                </Link>
                            </div>
                        )}

                        {/* Pagination */}
                        {decks.data.length > 0 && (
                            <div className="mt-8 flex justify-center">
                                <div className="flex space-x-1">
                                    {decks.links.map((link, i) => (
                                        <Link
                                            key={i}
                                            href={link.url}
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
                                                __html: link.label,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
