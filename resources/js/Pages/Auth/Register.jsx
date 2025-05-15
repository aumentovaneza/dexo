import React from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/register");
    };

    return (
        <GuestLayout title="Register">
            <Head title="Register" />

            <div className="py-12 flex flex-col justify-center items-center">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-primary">
                            Create Account
                        </h1>
                        <p className="text-text-muted mt-2">Join Dexo today!</p>
                    </div>

                    <div className="bg-surface p-8 rounded-lg shadow-lg">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-text-muted mb-1"
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
                                    className="w-full px-3 py-2 rounded-md border border-surface bg-background text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    required
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
                                    className="block text-sm font-medium text-text-muted mb-1"
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
                                    className="w-full px-3 py-2 rounded-md border border-surface bg-background text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    required
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
                                    className="block text-sm font-medium text-text-muted mb-1"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    className="w-full px-3 py-2 rounded-md border border-surface bg-background text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    required
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
                                    className="block text-sm font-medium text-text-muted mb-1"
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
                                    className="w-full px-3 py-2 rounded-md border border-surface bg-background text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-2 px-4 bg-primary text-background rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 disabled:opacity-50"
                                >
                                    {processing ? "Registering..." : "Register"}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="text-center mt-6">
                        <p className="text-text-muted">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="text-primary hover:underline"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
