import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";

export default function Profile({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: auth.user.name,
        email: auth.user.email,
        password: "",
        password_confirmation: "",
    });

    const [message, setMessage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/profile/update", {
            onSuccess: () => {
                setMessage("Profile updated successfully");
                setData("password", "");
                setData("password_confirmation", "");
            },
        });
    };

    return (
        <MainLayout>
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-surface overflow-hidden shadow-sm sm:rounded-lg p-6">
                        {message && (
                            <div className="mb-4 p-4 bg-success/20 border border-success text-text rounded">
                                {message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-text-muted"
                                >
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    className="mt-1 block w-full rounded-md border-surface bg-background text-text shadow-sm focus:border-primary focus:ring focus:ring-primary/30"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-danger">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-text-muted"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className="mt-1 block w-full rounded-md border-surface bg-background text-text shadow-sm focus:border-primary focus:ring focus:ring-primary/30"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-danger">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-text-muted"
                                >
                                    New Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    className="mt-1 block w-full rounded-md border-surface bg-background text-text shadow-sm focus:border-primary focus:ring focus:ring-primary/30"
                                />
                                {errors.password && (
                                    <p className="mt-1 text-sm text-danger">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="password_confirmation"
                                    className="block text-sm font-medium text-text-muted"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                    className="mt-1 block w-full rounded-md border-surface bg-background text-text shadow-sm focus:border-primary focus:ring focus:ring-primary/30"
                                />
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-primary text-background rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 disabled:opacity-50"
                                >
                                    {processing
                                        ? "Updating..."
                                        : "Update Profile"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
