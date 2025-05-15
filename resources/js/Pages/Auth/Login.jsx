import React from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/login");
    };

    return (
        <GuestLayout title="Login">
            <Head title="Login" />

            <div className="py-12 flex flex-col justify-center items-center">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-primary">
                            Login to Dexo
                        </h1>
                        <p className="text-text-muted mt-2">Welcome back!</p>
                    </div>

                    <div className="bg-surface p-8 rounded-lg shadow-lg">
                        <form onSubmit={handleSubmit} className="space-y-6">
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

                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                    className="h-4 w-4 text-primary focus:ring-primary border-surface rounded bg-background"
                                />
                                <label
                                    htmlFor="remember"
                                    className="ml-2 block text-sm text-text-muted"
                                >
                                    Remember me
                                </label>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-2 px-4 bg-primary text-background rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 disabled:opacity-50"
                                >
                                    {processing ? "Logging in..." : "Login"}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="text-center mt-6">
                        <p className="text-text-muted">
                            Don't have an account?{" "}
                            <Link
                                href="/register"
                                className="text-primary hover:underline"
                            >
                                Register
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
