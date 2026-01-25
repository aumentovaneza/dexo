import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";

export default function GuestLayout({ children, title }) {
    const { props } = usePage();
    const flash = props?.flash || {};
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

            {/* Simple Navigation Header */}
            <nav className="bg-surface shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex-shrink-0 flex items-center">
                            <Link
                                href="/"
                                className="text-primary text-2xl font-bold"
                            >
                                Dexo
                            </Link>
                        </div>
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
                    </div>
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="flex-grow">{children}</main>

            {/* Simple Footer */}
            <footer className="bg-surface mt-auto border-t border-surface/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <Link
                                href="/"
                                className="text-primary text-xl font-bold"
                            >
                                Dexo
                            </Link>
                            <p className="text-text-muted text-sm mt-1">
                                © {new Date().getFullYear()} Dexo. All rights
                                reserved.
                            </p>
                        </div>
                        <div className="flex space-x-6">
                            <Link
                                href="#"
                                className="text-text-muted hover:text-primary transition-colors"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="#"
                                className="text-text-muted hover:text-primary transition-colors"
                            >
                                Terms of Service
                            </Link>
                            <Link
                                href="#"
                                className="text-text-muted hover:text-primary transition-colors"
                            >
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
