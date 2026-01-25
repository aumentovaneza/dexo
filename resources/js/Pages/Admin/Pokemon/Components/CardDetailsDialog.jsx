import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";

export default function CardDetailsDialog({
    cardId,
    initialCardData,
    isOpen,
    onClose,
}) {
    const [card, setCard] = useState(initialCardData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Reset states when dialog opens/closes
        if (!isOpen) {
            setError(null);
            return;
        }

        // Use the card data we already have if available
        if (initialCardData) {
            setCard(initialCardData);
            setIsLoading(false);
            setError(null);
            return;
        }

        // Only fetch data if the dialog is open, we have a cardId, and no initialCardData
        if (isOpen && cardId && !initialCardData) {
            setIsLoading(true);
            setError(null);

            // Make a simple fetch request instead of using Inertia
            fetch(route("admin.pokemon.cards.show", cardId))
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(
                            `HTTP error! Status: ${response.status}`
                        );
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.card) {
                        setCard(data.card);
                    } else {
                        throw new Error("Card data not found in response");
                    }
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching card:", err);
                    setError("Failed to load card details. Please try again.");
                    setIsLoading(false);
                });
        }
    }, [isOpen, cardId, initialCardData]);

    // Helper function to format dates
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        try {
            return new Date(dateString).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        } catch (e) {
            return dateString;
        }
    };

    // Get the type color scheme for the card (if available)
    const getTypeColors = (cardType) => {
        const typeColor = cardType ? cardType.toLowerCase() : null;
        switch (typeColor) {
            case "fire":
                return {
                    bgLight: "bg-red-50",
                    bgMedium: "bg-red-100",
                    text: "text-red-800",
                    border: "border-red-200",
                    highlight: "text-red-600",
                };
            case "water":
                return {
                    bgLight: "bg-blue-50",
                    bgMedium: "bg-blue-100",
                    text: "text-blue-800",
                    border: "border-blue-200",
                    highlight: "text-blue-600",
                };
            case "grass":
                return {
                    bgLight: "bg-green-50",
                    bgMedium: "bg-green-100",
                    text: "text-green-800",
                    border: "border-green-200",
                    highlight: "text-green-600",
                };
            case "electric":
                return {
                    bgLight: "bg-yellow-50",
                    bgMedium: "bg-yellow-100",
                    text: "text-yellow-800",
                    border: "border-yellow-200",
                    highlight: "text-yellow-600",
                };
            case "psychic":
                return {
                    bgLight: "bg-purple-50",
                    bgMedium: "bg-purple-100",
                    text: "text-purple-800",
                    border: "border-purple-200",
                    highlight: "text-purple-600",
                };
            case "fighting":
                return {
                    bgLight: "bg-orange-50",
                    bgMedium: "bg-orange-100",
                    text: "text-orange-800",
                    border: "border-orange-200",
                    highlight: "text-orange-600",
                };
            case "darkness":
            case "dark":
                return {
                    bgLight: "bg-gray-50",
                    bgMedium: "bg-gray-100",
                    text: "text-gray-800",
                    border: "border-gray-200",
                    highlight: "text-gray-600",
                };
            case "metal":
            case "steel":
                return {
                    bgLight: "bg-slate-50",
                    bgMedium: "bg-slate-100",
                    text: "text-slate-800",
                    border: "border-slate-200",
                    highlight: "text-slate-600",
                };
            case "fairy":
                return {
                    bgLight: "bg-pink-50",
                    bgMedium: "bg-pink-100",
                    text: "text-pink-800",
                    border: "border-pink-200",
                    highlight: "text-pink-600",
                };
            case "dragon":
                return {
                    bgLight: "bg-indigo-50",
                    bgMedium: "bg-indigo-100",
                    text: "text-indigo-800",
                    border: "border-indigo-200",
                    highlight: "text-indigo-600",
                };
            default:
                return {
                    bgLight: "bg-gray-50",
                    bgMedium: "bg-gray-100",
                    text: "text-gray-800",
                    border: "border-gray-200",
                    highlight: "text-gray-600",
                };
        }
    };

    // Get the primary card type
    const cardType =
        card?.types && card.types.length > 0
            ? card.types[0]
            : card?.type || null;

    const colors = getTypeColors(cardType);

    // If dialog is not open, render nothing
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                {/* Blurred overlay instead of solid color */}
                <div
                    className="fixed inset-0 backdrop-blur-sm bg-gray-500/50 transition-opacity"
                    aria-hidden="true"
                    onClick={onClose}
                ></div>

                <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                >
                    &#8203;
                </span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full relative">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        {/* Loading state */}
                        {isLoading && (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                            </div>
                        )}

                        {/* Error state */}
                        {error && !isLoading && (
                            <div className="text-center py-8">
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                                    <svg
                                        className="h-6 w-6 text-red-600"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="mt-3 text-center text-lg font-medium text-gray-900">
                                    Error
                                </h3>
                                <p className="mt-2 text-center text-sm text-gray-600">
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* Content state - show the card if we have it */}
                        {!isLoading && !error && card && (
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3
                                            className="text-lg leading-6 font-medium text-gray-900"
                                            id="modal-title"
                                        >
                                            Card Details
                                        </h3>
                                        <button
                                            type="button"
                                            className="text-gray-400 hover:text-gray-500"
                                            onClick={onClose}
                                        >
                                            <span className="sr-only">
                                                Close
                                            </span>
                                            <svg
                                                className="h-6 w-6"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-6">
                                        <div className="flex-shrink-0">
                                            <img
                                                src={
                                                    card.images?.small ||
                                                    card.image_url
                                                }
                                                alt={card.name}
                                                className={`h-80 w-auto object-contain ${colors.border} p-1 rounded-md border`}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src =
                                                        "https://via.placeholder.com/150?text=No+Image";
                                                }}
                                            />
                                        </div>

                                        <div className="flex-1 mt-4 sm:mt-0 space-y-4 overflow-y-auto max-h-96">
                                            <div>
                                                <h4
                                                    className={`text-xl font-semibold ${colors.highlight}`}
                                                >
                                                    {card.name}
                                                </h4>
                                                {card.tcg_id && (
                                                    <p className="text-sm text-gray-600">
                                                        TCG ID: {card.tcg_id}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {/* Basic Information */}
                                                <div>
                                                    <h5 className="text-sm font-medium text-gray-700">
                                                        Supertype
                                                    </h5>
                                                    <p className="mt-1 text-gray-900">
                                                        {card.supertype ||
                                                            "N/A"}
                                                    </p>
                                                </div>

                                                <div>
                                                    <h5 className="text-sm font-medium text-gray-700">
                                                        Subtype
                                                    </h5>
                                                    <p className="mt-1 text-gray-900">
                                                        {card.subtype || "N/A"}
                                                    </p>
                                                </div>

                                                <div>
                                                    <h5 className="text-sm font-medium text-gray-700">
                                                        Type
                                                    </h5>
                                                    <p
                                                        className={`mt-1 ${colors.highlight} font-medium`}
                                                    >
                                                        {card.types &&
                                                        card.types.length > 0
                                                            ? card.types.join(
                                                                  ", "
                                                              )
                                                            : card.type ||
                                                              "N/A"}
                                                    </p>
                                                </div>

                                                <div>
                                                    <h5 className="text-sm font-medium text-gray-700">
                                                        HP
                                                    </h5>
                                                    <p className="mt-1 text-gray-900">
                                                        {card.hp || "N/A"}
                                                    </p>
                                                </div>

                                                {/* Set Information */}
                                                <div>
                                                    <h5 className="text-sm font-medium text-gray-700">
                                                        Set
                                                    </h5>
                                                    <p className="mt-1 text-gray-900">
                                                        {card.set || "N/A"}
                                                    </p>
                                                </div>

                                                <div>
                                                    <h5 className="text-sm font-medium text-gray-700">
                                                        Rarity
                                                    </h5>
                                                    <p className="mt-1 text-gray-900">
                                                        {card.rarity || "N/A"}
                                                    </p>
                                                </div>

                                                <div>
                                                    <h5 className="text-sm font-medium text-gray-700">
                                                        Legal Status
                                                    </h5>
                                                    <p className="mt-1">
                                                        <span
                                                            className={`inline-flex px-2 text-xs font-semibold leading-5 ${
                                                                card.legalities
                                                                    ?.standard ===
                                                                    "Legal" ||
                                                                card.is_legal
                                                                    ? "bg-green-100 text-green-800"
                                                                    : "bg-red-100 text-red-800"
                                                            } rounded-full`}
                                                        >
                                                            {card.legalities
                                                                ?.standard ===
                                                                "Legal" ||
                                                            card.is_legal
                                                                ? "Legal"
                                                                : "Not Legal"}
                                                        </span>
                                                    </p>
                                                </div>

                                                {/* Card Numbers & Identifiers */}
                                                <div>
                                                    <h5 className="text-sm font-medium text-gray-700">
                                                        Card Number
                                                    </h5>
                                                    <p className="mt-1 text-gray-900">
                                                        {card.number || "N/A"}
                                                    </p>
                                                </div>

                                                {card.artist && (
                                                    <div>
                                                        <h5 className="text-sm font-medium text-gray-700">
                                                            Artist
                                                        </h5>
                                                        <p className="mt-1 text-gray-900">
                                                            {card.artist}
                                                        </p>
                                                    </div>
                                                )}

                                                {/* Release Information */}
                                                <div>
                                                    <h5 className="text-sm font-medium text-gray-700">
                                                        Release Date
                                                    </h5>
                                                    <p className="mt-1 text-gray-900">
                                                        {formatDate(
                                                            card.release_date
                                                        )}
                                                    </p>
                                                </div>

                                                <div>
                                                    <h5 className="text-sm font-medium text-gray-700">
                                                        Created At
                                                    </h5>
                                                    <p className="mt-1 text-gray-900">
                                                        {formatDate(
                                                            card.created_at
                                                        )}
                                                    </p>
                                                </div>

                                                {/* Additional Combat/Game Info */}
                                                {card.retreat_cost && (
                                                    <div>
                                                        <h5 className="text-sm font-medium text-gray-700">
                                                            Retreat Cost
                                                        </h5>
                                                        <p className="mt-1 text-gray-900">
                                                            {Array.isArray(
                                                                card.retreat_cost
                                                            )
                                                                ? card.retreat_cost.join(
                                                                      ", "
                                                                  )
                                                                : card.retreat_cost}
                                                        </p>
                                                    </div>
                                                )}

                                                {card.evolves_from && (
                                                    <div>
                                                        <h5 className="text-sm font-medium text-gray-700">
                                                            Evolves From
                                                        </h5>
                                                        <p className="mt-1 text-gray-900">
                                                            {card.evolves_from}
                                                        </p>
                                                    </div>
                                                )}

                                                {card.evolves_to && (
                                                    <div>
                                                        <h5 className="text-sm font-medium text-gray-700">
                                                            Evolves To
                                                        </h5>
                                                        <p className="mt-1 text-gray-900">
                                                            {Array.isArray(
                                                                card.evolves_to
                                                            )
                                                                ? card.evolves_to.join(
                                                                      ", "
                                                                  )
                                                                : card.evolves_to}
                                                        </p>
                                                    </div>
                                                )}

                                                {/* Market Information */}
                                                {card.price && (
                                                    <div>
                                                        <h5 className="text-sm font-medium text-gray-700">
                                                            Price
                                                        </h5>
                                                        <p className="mt-1 text-gray-900">
                                                            {typeof card.price ===
                                                            "object"
                                                                ? `$${
                                                                      card.price
                                                                          .market ||
                                                                      card.price
                                                                          .mid ||
                                                                      "N/A"
                                                                  }`
                                                                : `$${card.price}`}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Card Text/Abilities - Full Width */}
                                            {(card.text || card.abilities) && (
                                                <div className="col-span-2 mt-4">
                                                    <h5 className="text-sm font-medium text-gray-700">
                                                        Card Text & Abilities
                                                    </h5>
                                                    <div
                                                        className={`mt-1 p-3 ${colors.bgLight} rounded-md ${colors.border} border`}
                                                    >
                                                        {card.abilities &&
                                                            Array.isArray(
                                                                card.abilities
                                                            ) &&
                                                            card.abilities.map(
                                                                (
                                                                    ability,
                                                                    index
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="mb-2"
                                                                    >
                                                                        <p
                                                                            className={`font-medium ${colors.highlight}`}
                                                                        >
                                                                            {
                                                                                ability.name
                                                                            }
                                                                            :{" "}
                                                                            {
                                                                                ability.type
                                                                            }
                                                                        </p>
                                                                        <p className="text-gray-900">
                                                                            {
                                                                                ability.text
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                )
                                                            )}

                                                        {card.text &&
                                                            Array.isArray(
                                                                card.text
                                                            ) &&
                                                            card.text.map(
                                                                (
                                                                    text,
                                                                    index
                                                                ) => (
                                                                    <p
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="text-gray-900 mb-2"
                                                                    >
                                                                        {text}
                                                                    </p>
                                                                )
                                                            )}

                                                        {card.text &&
                                                            !Array.isArray(
                                                                card.text
                                                            ) && (
                                                                <p className="text-gray-900">
                                                                    {card.text}
                                                                </p>
                                                            )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Attacks - Full Width */}
                                            {card.attacks &&
                                                Array.isArray(card.attacks) &&
                                                card.attacks.length > 0 && (
                                                    <div className="col-span-2 mt-4">
                                                        <h5 className="text-sm font-medium text-gray-700">
                                                            Attacks
                                                        </h5>
                                                        <div className="mt-1">
                                                            {card.attacks.map(
                                                                (
                                                                    attack,
                                                                    index
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
                                                                        className={`mb-2 p-2 ${colors.bgMedium} rounded-md border ${colors.border}`}
                                                                    >
                                                                        <p
                                                                            className={`font-medium ${colors.text}`}
                                                                        >
                                                                            {
                                                                                attack.name
                                                                            }{" "}
                                                                            {attack.damage &&
                                                                                `- ${attack.damage}`}
                                                                        </p>
                                                                        <p className="text-gray-700 text-sm">
                                                                            Cost:{" "}
                                                                            {Array.isArray(
                                                                                attack.cost
                                                                            )
                                                                                ? attack.cost.join(
                                                                                      ", "
                                                                                  )
                                                                                : attack.cost ||
                                                                                  "N/A"}
                                                                        </p>
                                                                        {attack.text && (
                                                                            <p className="text-gray-900 mt-1">
                                                                                {
                                                                                    attack.text
                                                                                }
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div
                        className={`${colors.bgLight} px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse`}
                    >
                        <button
                            type="button"
                            className={`mt-3 w-full inline-flex justify-center rounded-md border ${colors.border} shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:${colors.bgLight} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm`}
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
