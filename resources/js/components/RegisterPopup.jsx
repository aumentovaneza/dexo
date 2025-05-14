import React, { useState, useEffect } from "react";

/**
 * RegisterPopup component that displays a modal registration form
 * @param {boolean} isOpen - Controls visibility of the popup
 * @param {function} onClose - Function to call when closing the popup
 * @param {function} onRegister - Function to call when registration is submitted
 */
const RegisterPopup = ({ isOpen, onClose, onRegister }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [errors, setErrors] = useState({});
    const [internalIsOpen, setInternalIsOpen] = useState(isOpen);

    // Listen for the openRegister event and open the popup
    useEffect(() => {
        const openRegisterHandler = () => {
            setInternalIsOpen(true);
        };

        document.addEventListener("openRegister", openRegisterHandler);

        return () => {
            document.removeEventListener("openRegister", openRegisterHandler);
        };
    }, []);

    // Sync internal state with prop
    useEffect(() => {
        setInternalIsOpen(isOpen);
    }, [isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setErrors({});
        setIsLoading(true);

        // Basic validation
        if (password !== passwordConfirmation) {
            setErrors({ passwordConfirmation: "Passwords do not match" });
            setIsLoading(false);
            return;
        }

        try {
            // Call the registration function
            await onRegister({
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            });
            handleClose(); // Close the popup after successful registration
        } catch (err) {
            if (err.errors) {
                // Handle validation errors returned from the server
                setErrors(err.errors);
            } else {
                setError(
                    err.message || "Failed to register. Please try again."
                );
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setInternalIsOpen(false);
        setName("");
        setEmail("");
        setPassword("");
        setPasswordConfirmation("");
        setError("");
        setErrors({});
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
            <div className="relative z-10 w-full max-w-md p-6 mx-4 bg-surface rounded-lg shadow-xl overflow-y-auto max-h-[90vh]">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-text">Register</h2>
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
                        <label htmlFor="name" className="block mb-1 text-text">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`w-full px-3 py-2 bg-background border ${
                                errors.name
                                    ? "border-danger"
                                    : "border-gray-700"
                            } rounded focus:outline-none focus:ring-2 focus:ring-primary text-text`}
                            required
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-danger">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-1 text-text">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full px-3 py-2 bg-background border ${
                                errors.email
                                    ? "border-danger"
                                    : "border-gray-700"
                            } rounded focus:outline-none focus:ring-2 focus:ring-primary text-text`}
                            required
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-danger">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
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
                            className={`w-full px-3 py-2 bg-background border ${
                                errors.password
                                    ? "border-danger"
                                    : "border-gray-700"
                            } rounded focus:outline-none focus:ring-2 focus:ring-primary text-text`}
                            required
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-danger">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="passwordConfirmation"
                            className="block mb-1 text-text"
                        >
                            Confirm Password
                        </label>
                        <input
                            id="passwordConfirmation"
                            type="password"
                            value={passwordConfirmation}
                            onChange={(e) =>
                                setPasswordConfirmation(e.target.value)
                            }
                            className={`w-full px-3 py-2 bg-background border ${
                                errors.passwordConfirmation
                                    ? "border-danger"
                                    : "border-gray-700"
                            } rounded focus:outline-none focus:ring-2 focus:ring-primary text-text`}
                            required
                        />
                        {errors.passwordConfirmation && (
                            <p className="mt-1 text-sm text-danger">
                                {errors.passwordConfirmation}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 py-2 bg-primary text-background font-medium rounded hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Registering..." : "Register"}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                handleClose();
                                // Dispatch openLogin event to switch to login popup
                                document.dispatchEvent(
                                    new CustomEvent("openLogin")
                                );
                            }}
                            className="text-primary hover:underline"
                        >
                            Already have an account?
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPopup;
