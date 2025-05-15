import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
    MagnifyingGlassIcon as SearchIcon,
    EyeIcon,
} from "@heroicons/react/24/outline";
import CardDetailsDialog from "./Components/CardDetailsDialog";
import TextInput from "@/Components/TextInput";

export default function Cards({ auth, cards }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedCardId, setSelectedCardId] = useState(null);
    const [selectedCardData, setSelectedCardData] = useState(null);

    // Add a check to ensure cards and cards.data exist before trying to filter
    const filteredCards =
        cards && cards.data
            ? cards.data.filter(
                  (card) =>
                      card.name
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                      (card.set &&
                          card.set
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase()))
              )
            : [];

    // Handle view card details
    const handleViewCard = (card) => {
        // This approach doesn't rely on router.visit which might be causing issues
        setSelectedCardId(card.id);
        setSelectedCardData(card);
        setIsDialogOpen(true);
    };

    // Close dialog
    const closeDialog = () => {
        setIsDialogOpen(false);
        // Don't reset the selectedCardId immediately to avoid UI flashing
        setTimeout(() => {
            setSelectedCardId(null);
            setSelectedCardData(null);
        }, 200);
    };

    return (
        <AdminLayout title="Pokemon Card Management">
            <Head title="Pokemon Card Management" />

            <div className="py-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div className="flex items-center space-x-2 relative w-full md:w-64">
                        <TextInput
                            type="text"
                            placeholder="Search cards..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon className="h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Image
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Type
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Set
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Rarity
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Legal
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredCards.map((card) => (
                                    <tr
                                        key={card.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <img
                                                src={
                                                    card.images?.small ||
                                                    card.image_url
                                                }
                                                alt={card.name}
                                                className="h-16 w-auto object-contain"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900">
                                                {card.name}
                                            </div>
                                            {card.tcg_id && (
                                                <div className="text-xs text-gray-500">
                                                    ID: {card.tcg_id}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-gray-500">
                                                {card.types &&
                                                card.types.length > 0
                                                    ? card.types.join(", ")
                                                    : card.type || "N/A"}
                                            </div>
                                            {card.supertype && (
                                                <div className="text-xs text-gray-500">
                                                    {card.supertype}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-gray-500">
                                                {card.set}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-gray-500">
                                                {card.rarity || "N/A"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex px-2 text-xs font-semibold leading-5 ${
                                                    card.legalities
                                                        ?.standard ===
                                                        "Legal" || card.is_legal
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-red-100 text-red-800"
                                                } rounded-full`}
                                            >
                                                {card.legalities?.standard ===
                                                    "Legal" || card.is_legal
                                                    ? "Legal"
                                                    : "Not Legal"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end items-center">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleViewCard(card)
                                                    }
                                                    className="text-blue-600 hover:text-blue-900 cursor-pointer"
                                                >
                                                    <EyeIcon className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {cards && cards.from && (
                    <div className="mt-6 flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                            Showing{" "}
                            <span className="font-medium">{cards.from}</span> to{" "}
                            <span className="font-medium">{cards.to}</span> of{" "}
                            <span className="font-medium">{cards.total}</span>{" "}
                            results
                        </div>
                        <div className="flex items-center space-x-2">
                            {cards.links &&
                                cards.links.map((link, index) =>
                                    link.url ? (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            className={`relative inline-flex items-center px-4 py-2 border ${
                                                link.active
                                                    ? "bg-blue-600 border-blue-600 text-white"
                                                    : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                                            } text-sm font-medium rounded-md`}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    ) : (
                                        <span
                                            key={index}
                                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-gray-500 bg-white text-sm font-medium rounded-md opacity-50 cursor-not-allowed"
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    )
                                )}
                        </div>
                    </div>
                )}
            </div>

            <CardDetailsDialog
                cardId={selectedCardId}
                initialCardData={selectedCardData}
                isOpen={isDialogOpen}
                onClose={closeDialog}
            />
        </AdminLayout>
    );
}
