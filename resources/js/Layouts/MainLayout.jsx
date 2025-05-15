import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";

export default function MainLayout({ children }) {
    const { auth, flash = {} } = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [showFlash, setShowFlash] = useState(false);

    // Show flash message if it exists
    useEffect(() => {
        if (flash?.message || flash?.success || flash?.error) {
            setShowFlash(true);
            const timer = setTimeout(() => {
                setShowFlash(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [flash]);

    const flashMessage = flash?.message || flash?.success || flash?.error;
    const flashType = flash?.success
        ? "success"
        : flash?.error
        ? "error"
        : "info";

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Flash Messages */}
            {showFlash && flashMessage && (
                <div
                    className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg max-w-md ${
                        flashType === "success"
                            ? "bg-success/20 border border-success text-success"
                            : flashType === "error"
                            ? "bg-danger/20 border border-danger text-danger"
                            : "bg-primary/20 border border-primary text-primary"
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <p>{flashMessage}</p>
                        <button
                            onClick={() => setShowFlash(false)}
                            className="ml-4 text-current hover:text-text focus:outline-none"
                        >
                            <span className="sr-only">Close</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {/* Navigation */}
            <nav className="bg-surface shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <Link
                                    href="/"
                                    className="text-primary text-2xl font-bold"
                                >
                                    Dexo
                                </Link>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                <Link
                                    href="/dashboard"
                                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                                        usePage().url === "/dashboard"
                                            ? "border-primary text-text"
                                            : "border-transparent text-text-muted hover:text-text hover:border-surface"
                                    }`}
                                >
                                    Dashboard
                                </Link>

                                <Link
                                    href="/pokemon/collection"
                                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                                        usePage().url === "/pokemon/collection"
                                            ? "border-primary text-text"
                                            : "border-transparent text-text-muted hover:text-text hover:border-surface"
                                    }`}
                                >
                                    Pokémon Collection
                                </Link>

                                <Link
                                    href="/beyblade/collection"
                                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                                        usePage().url === "/beyblade/collection"
                                            ? "border-primary text-text"
                                            : "border-transparent text-text-muted hover:text-text hover:border-surface"
                                    }`}
                                >
                                    Beyblade Collection
                                </Link>

                                <Link
                                    href="/community"
                                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                                        usePage().url === "/community"
                                            ? "border-primary text-text"
                                            : "border-transparent text-text-muted hover:text-text hover:border-surface"
                                    }`}
                                >
                                    Community
                                </Link>
                            </div>
                        </div>

                        <div className="hidden sm:ml-6 sm:flex sm:items-center">
                            {auth?.user ? (
                                <div className="ml-3 relative">
                                    <div>
                                        <button
                                            onClick={() =>
                                                setUserMenuOpen(!userMenuOpen)
                                            }
                                            className="bg-surface flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                        >
                                            <span className="sr-only">
                                                Open user menu
                                            </span>
                                            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                                {auth.user.name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>
                                        </button>
                                    </div>

                                    {userMenuOpen && (
                                        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-background ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                                            <div className="px-4 py-2 text-xs text-text-muted">
                                                Logged in as{" "}
                                                <span className="font-medium text-text">
                                                    {auth.user.name}
                                                </span>
                                            </div>
                                            <Link
                                                href="/profile"
                                                className="block px-4 py-2 text-sm text-text-muted hover:bg-surface"
                                            >
                                                Your Profile
                                            </Link>
                                            <Link
                                                href="/logout"
                                                method="post"
                                                as="button"
                                                className="block w-full text-left px-4 py-2 text-sm text-text-muted hover:bg-surface"
                                            >
                                                Sign out
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <Link
                                        href="/login"
                                        className="text-text-muted hover:text-text px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="bg-primary text-background px-3 py-2 rounded-md text-sm font-medium hover:bg-primary/90"
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>

                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setMobileMenuOpen(!mobileMenuOpen)
                                }
                                className="inline-flex items-center justify-center p-2 rounded-md text-text-muted hover:text-text hover:bg-surface focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                            >
                                <span className="sr-only">Open main menu</span>
                                <svg
                                    className={`${
                                        mobileMenuOpen ? "hidden" : "block"
                                    } h-6 w-6`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                                <svg
                                    className={`${
                                        mobileMenuOpen ? "block" : "hidden"
                                    } h-6 w-6`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                <div
                    className={`${
                        mobileMenuOpen ? "block" : "hidden"
                    } sm:hidden`}
                >
                    <div className="pt-2 pb-3 space-y-1">
                        <Link
                            href="/dashboard"
                            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                                usePage().url === "/dashboard"
                                    ? "border-primary text-primary bg-primary/5"
                                    : "border-transparent text-text-muted hover:bg-surface hover:border-surface hover:text-text"
                            }`}
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/pokemon/collection"
                            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                                usePage().url === "/pokemon/collection"
                                    ? "border-primary text-primary bg-primary/5"
                                    : "border-transparent text-text-muted hover:bg-surface hover:border-surface hover:text-text"
                            }`}
                        >
                            Pokémon Collection
                        </Link>
                        <Link
                            href="/beyblade/collection"
                            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                                usePage().url === "/beyblade/collection"
                                    ? "border-primary text-primary bg-primary/5"
                                    : "border-transparent text-text-muted hover:bg-surface hover:border-surface hover:text-text"
                            }`}
                        >
                            Beyblade Collection
                        </Link>
                        <Link
                            href="/community"
                            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                                usePage().url === "/community"
                                    ? "border-primary text-primary bg-primary/5"
                                    : "border-transparent text-text-muted hover:bg-surface hover:border-surface hover:text-text"
                            }`}
                        >
                            Community
                        </Link>
                    </div>

                    {auth?.user ? (
                        <div className="pt-4 pb-3 border-t border-surface">
                            <div className="flex items-center px-4">
                                <div className="flex-shrink-0">
                                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                        {auth.user.name.charAt(0).toUpperCase()}
                                    </div>
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium text-text">
                                        {auth.user.name}
                                    </div>
                                    <div className="text-sm font-medium text-text-muted">
                                        {auth.user.email}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 space-y-1">
                                <Link
                                    href="/profile"
                                    className="block px-4 py-2 text-base font-medium text-text-muted hover:text-text hover:bg-surface"
                                >
                                    Your Profile
                                </Link>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="block w-full text-left px-4 py-2 text-base font-medium text-text-muted hover:text-text hover:bg-surface"
                                >
                                    Sign out
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="pt-4 pb-3 border-t border-surface">
                            <div className="flex items-center justify-around">
                                <Link
                                    href="/login"
                                    className="text-text-muted hover:text-text px-3 py-2 text-base font-medium"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="bg-primary text-background px-3 py-2 rounded-md text-base font-medium hover:bg-primary/90"
                                >
                                    Register
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Page Content */}
            <main className="flex-grow">{children}</main>

            {/* Footer */}
            <footer className="bg-surface border-t border-surface/50 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="text-center text-text-muted text-sm">
                        © {new Date().getFullYear()} Dexo. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
