import React, { useState, useEffect } from "react";

/**
 * LoginPopup component that displays a modal login form
 * @param {boolean} isOpen - Controls visibility of the popup
 * @param {function} onClose - Function to call when closing the popup
 * @param {function} onLogin - Function to call when login is submitted
 */
const LoginPopup = ({ isOpen, onClose, onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [internalIsOpen, setInternalIsOpen] = useState(isOpen);

    // Listen for the openLogin event and open the popup
    useEffect(() => {
        const openLoginHandler = () => {
            setInternalIsOpen(true);
        };

        document.addEventListener("openLogin", openLoginHandler);

        return () => {
            document.removeEventListener("openLogin", openLoginHandler);
        };
    }, []);

    // Sync internal state with prop
    useEffect(() => {
        setInternalIsOpen(isOpen);
    }, [isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            // Here you would typically make a call to your auth API
            await onLogin({ email, password });
            handleClose(); // Close the popup after successful login
        } catch (err) {
            setError(err.message || "Failed to log in. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setInternalIsOpen(false);
        setEmail("");
        setPassword("");
        setError("");
        if (onClose) onClose();
    };

    // If popup is not open, don't render anything
    if (!internalIsOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                onClick={handleClose}
            ></div>

            {/* Modal */}
            <div className="relative z-10 w-full max-w-md p-6 mx-4 bg-surface rounded-lg shadow-xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-text">Login</h2>
                    <button
                        onClick={handleClose}
                        className="text-text-muted hover:text-text"
                        type="button"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
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

                {error && (
                    <div className="mb-4 p-2 bg-danger/10 border border-danger text-danger rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-1 text-text">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 bg-background border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-primary text-text"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block mb-1 text-text"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 bg-background border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-primary text-text"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 py-2 bg-primary text-background font-medium rounded hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                handleClose();
                                // Dispatch openRegister event to switch to register popup
                                document.dispatchEvent(
                                    new CustomEvent("openRegister")
                                );
                            }}
                            className="text-primary hover:underline"
                        >
                            Need an account?
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPopup;
