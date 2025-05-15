import React, { useState, useEffect } from "react";

const EditCardModal = ({ isOpen, onClose, collectionId, onSubmit }) => {
    const [quantity, setQuantity] = useState(1);
    const [tags, setTags] = useState({
        favorite: false,
        forTrade: false,
        forDeck: false,
    });

    useEffect(() => {
        // Reset form when opening for a new card
        if (isOpen && collectionId) {
            // In a real implementation, you would fetch the card data here
            // and populate the form fields

            // For demonstration, we'll just reset the form
            setQuantity(1);
            setTags({
                favorite: false,
                forTrade: false,
                forDeck: false,
            });
        }
    }, [isOpen, collectionId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Prepare tags array from the tag state object
        const selectedTags = Object.entries(tags)
            .filter(([_, isSelected]) => isSelected)
            .map(([key, _]) => {
                if (key === "forTrade") return "for trade";
                if (key === "forDeck") return "for deck";
                return key;
            });

        onSubmit({
            collectionId,
            quantity,
            tags: selectedTags,
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-surface rounded-xl w-full max-w-md mx-4 overflow-hidden">
                <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-text">
                        Edit Collection Item
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-text-muted hover:text-text"
                    >
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
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <input
                        type="hidden"
                        name="_token"
                        value={document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content")}
                    />
                    <input type="hidden" name="_method" value="PUT" />

                    <div className="mb-4">
                        <label
                            htmlFor="edit_quantity"
                            className="block text-sm font-medium text-text mb-1"
                        >
                            Quantity
                        </label>
                        <input
                            type="number"
                            id="edit_quantity"
                            name="quantity"
                            min="0"
                            required
                            value={quantity}
                            onChange={(e) =>
                                setQuantity(parseInt(e.target.value))
                            }
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary text-text"
                        />
                        <p className="text-xs text-text mt-1">
                            Set to 0 to remove from collection
                        </p>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-text mb-1">
                            Tags
                        </label>
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="edit_tag_favorite"
                                    checked={tags.favorite}
                                    onChange={(e) =>
                                        setTags({
                                            ...tags,
                                            favorite: e.target.checked,
                                        })
                                    }
                                    className="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                                />
                                <label
                                    htmlFor="edit_tag_favorite"
                                    className="ml-2 text-sm text-text"
                                >
                                    Favorite
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="edit_tag_for_trade"
                                    checked={tags.forTrade}
                                    onChange={(e) =>
                                        setTags({
                                            ...tags,
                                            forTrade: e.target.checked,
                                        })
                                    }
                                    className="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                                />
                                <label
                                    htmlFor="edit_tag_for_trade"
                                    className="ml-2 text-sm text-text"
                                >
                                    For Trade
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="edit_tag_for_deck"
                                    checked={tags.forDeck}
                                    onChange={(e) =>
                                        setTags({
                                            ...tags,
                                            forDeck: e.target.checked,
                                        })
                                    }
                                    className="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                                />
                                <label
                                    htmlFor="edit_tag_for_deck"
                                    className="ml-2 text-sm text-text"
                                >
                                    For Deck
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-3 px-4 py-2 text-text-muted hover:text-text"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCardModal;
