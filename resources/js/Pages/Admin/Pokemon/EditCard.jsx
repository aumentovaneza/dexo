import React, { useState, useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Checkbox from "@/Components/Checkbox";
import PrimaryButton from "@/Components/PrimaryButton";

export default function EditCard({ auth, card }) {
    const { data, setData, put, processing, errors } = useForm({
        name: card.name || "",
        supertype: card.supertype || "",
        subtype: card.subtype || "",
        type: card.type || "",
        set: card.set || "",
        rarity: card.rarity || "",
        image_url: card.image_url || "",
        is_legal: card.is_legal,
    });

    const [imagePreview, setImagePreview] = useState(card.image_url);

    const onSubmit = (e) => {
        e.preventDefault();
        put(route("admin.pokemon.cards.update", card.id));
    };

    const handleImageUrlChange = (e) => {
        const url = e.target.value;
        setData("image_url", url);
        setImagePreview(url);
    };

    return (
        <AdminLayout title="Edit Pokemon Card">
            <Head title="Edit Pokemon Card" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={onSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-6">
                                        {/* Name */}
                                        <div>
                                            <InputLabel
                                                htmlFor="name"
                                                value="Card Name"
                                            />
                                            <TextInput
                                                id="name"
                                                type="text"
                                                name="name"
                                                value={data.name}
                                                className="mt-1 block w-full"
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                            <InputError
                                                message={errors.name}
                                                className="mt-2"
                                            />
                                        </div>

                                        {/* Supertype */}
                                        <div>
                                            <InputLabel
                                                htmlFor="supertype"
                                                value="Supertype"
                                            />
                                            <TextInput
                                                id="supertype"
                                                type="text"
                                                name="supertype"
                                                value={data.supertype}
                                                className="mt-1 block w-full"
                                                onChange={(e) =>
                                                    setData(
                                                        "supertype",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                            <InputError
                                                message={errors.supertype}
                                                className="mt-2"
                                            />
                                        </div>

                                        {/* Subtype */}
                                        <div>
                                            <InputLabel
                                                htmlFor="subtype"
                                                value="Subtype"
                                            />
                                            <TextInput
                                                id="subtype"
                                                type="text"
                                                name="subtype"
                                                value={data.subtype}
                                                className="mt-1 block w-full"
                                                onChange={(e) =>
                                                    setData(
                                                        "subtype",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.subtype}
                                                className="mt-2"
                                            />
                                        </div>

                                        {/* Type */}
                                        <div>
                                            <InputLabel
                                                htmlFor="type"
                                                value="Type"
                                            />
                                            <TextInput
                                                id="type"
                                                type="text"
                                                name="type"
                                                value={data.type}
                                                className="mt-1 block w-full"
                                                onChange={(e) =>
                                                    setData(
                                                        "type",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.type}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Set */}
                                        <div>
                                            <InputLabel
                                                htmlFor="set"
                                                value="Set"
                                            />
                                            <TextInput
                                                id="set"
                                                type="text"
                                                name="set"
                                                value={data.set}
                                                className="mt-1 block w-full"
                                                onChange={(e) =>
                                                    setData(
                                                        "set",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                            <InputError
                                                message={errors.set}
                                                className="mt-2"
                                            />
                                        </div>

                                        {/* Rarity */}
                                        <div>
                                            <InputLabel
                                                htmlFor="rarity"
                                                value="Rarity"
                                            />
                                            <TextInput
                                                id="rarity"
                                                type="text"
                                                name="rarity"
                                                value={data.rarity}
                                                className="mt-1 block w-full"
                                                onChange={(e) =>
                                                    setData(
                                                        "rarity",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.rarity}
                                                className="mt-2"
                                            />
                                        </div>

                                        {/* Image URL */}
                                        <div>
                                            <InputLabel
                                                htmlFor="image_url"
                                                value="Image URL"
                                            />
                                            <TextInput
                                                id="image_url"
                                                type="url"
                                                name="image_url"
                                                value={data.image_url}
                                                className="mt-1 block w-full"
                                                onChange={handleImageUrlChange}
                                                required
                                            />
                                            <InputError
                                                message={errors.image_url}
                                                className="mt-2"
                                            />
                                        </div>

                                        {/* Is Legal */}
                                        <div className="flex items-center mt-4">
                                            <Checkbox
                                                name="is_legal"
                                                checked={data.is_legal}
                                                onChange={(e) =>
                                                    setData(
                                                        "is_legal",
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                            <InputLabel
                                                htmlFor="is_legal"
                                                value="Is Legal for Play"
                                                className="ml-2"
                                            />
                                            <InputError
                                                message={errors.is_legal}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Image Preview */}
                                {imagePreview && (
                                    <div className="mt-6">
                                        <h3 className="text-lg font-medium text-gray-900">
                                            Image Preview
                                        </h3>
                                        <div className="mt-2 flex justify-center">
                                            <img
                                                src={imagePreview}
                                                alt="Card Preview"
                                                className="max-h-96 object-contain"
                                                onError={() =>
                                                    setImagePreview(null)
                                                }
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center justify-end mt-6">
                                    <PrimaryButton
                                        className="ml-4"
                                        disabled={processing}
                                    >
                                        Update Card
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
