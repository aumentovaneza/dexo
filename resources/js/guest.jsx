import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./bootstrap";
import LoginPopup from "./components/LoginPopup";
import RegisterPopup from "./components/RegisterPopup";

function GuestLayout() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    // Function to handle opening the login popup
    const openLoginPopup = () => {
        setIsRegisterOpen(false); // Close register popup if open
        setIsLoginOpen(true);
    };

    // Function to handle opening the register popup
    const openRegisterPopup = () => {
        setIsLoginOpen(false); // Close login popup if open
        setIsRegisterOpen(true);
    };

    // Effect to listen for login and register link clicks and events
    useEffect(() => {
        // Get all login and register links
        const loginLinks = document.querySelectorAll('a[href*="login"]');
        const registerLinks = document.querySelectorAll('a[href*="register"]');

        // Function to handle login link clicks
        const handleLoginClick = (e) => {
            e.preventDefault();
            openLoginPopup();
        };

        // Function to handle register link clicks
        const handleRegisterClick = (e) => {
            e.preventDefault();
            openRegisterPopup();
        };

        // Function to handle openLogin event
        const handleOpenLoginEvent = () => {
            openLoginPopup();
        };

        // Function to handle openRegister event
        const handleOpenRegisterEvent = () => {
            openRegisterPopup();
        };

        // Add click event listeners to all login links
        loginLinks.forEach((link) => {
            link.addEventListener("click", handleLoginClick);
        });

        // Add click event listeners to all register links
        registerLinks.forEach((link) => {
            link.addEventListener("click", handleRegisterClick);
        });

        // Add listeners for the open events
        document.addEventListener("openLogin", handleOpenLoginEvent);
        document.addEventListener("openRegister", handleOpenRegisterEvent);

        // Cleanup function to remove event listeners
        return () => {
            loginLinks.forEach((link) => {
                link.removeEventListener("click", handleLoginClick);
            });
            registerLinks.forEach((link) => {
                link.removeEventListener("click", handleRegisterClick);
            });
            document.removeEventListener("openLogin", handleOpenLoginEvent);
            document.removeEventListener(
                "openRegister",
                handleOpenRegisterEvent
            );
        };
    }, []);

    const handleLogin = async (credentials) => {
        try {
            // Get the CSRF token from the meta tag
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content");

            // Make a POST request to the login endpoint
            const response = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                },
                body: JSON.stringify(credentials),
            });

            // Parse the response
            const data = await response.json();

            // If login was not successful, throw an error
            if (!response.ok) {
                throw new Error(data.message || "Failed to login");
            }

            // If login was successful, redirect to dashboard or reload the page
            if (data.redirect) {
                window.location.href = data.redirect;
            } else {
                window.location.reload();
            }

            return data;
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

    const handleRegister = async (userData) => {
        try {
            // Get the CSRF token from the meta tag
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content");

            // Make a POST request to the register endpoint
            const response = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                },
                body: JSON.stringify(userData),
            });

            // Parse the response
            const data = await response.json();

            // If registration was not successful, handle validation errors or throw a general error
            if (!response.ok) {
                if (response.status === 422 && data.errors) {
                    // Laravel validation errors
                    const error = new Error(
                        data.message || "Validation failed"
                    );
                    error.errors = data.errors;
                    throw error;
                } else {
                    throw new Error(data.message || "Failed to register");
                }
            }

            // If registration was successful, redirect to dashboard or reload the page
            if (data.redirect) {
                window.location.href = data.redirect;
            } else {
                window.location.reload();
            }

            return data;
        } catch (error) {
            console.error("Registration error:", error);
            throw error;
        }
    };

    return (
        <>
            <LoginPopup
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                onLogin={handleLogin}
            />
            <RegisterPopup
                isOpen={isRegisterOpen}
                onClose={() => setIsRegisterOpen(false)}
                onRegister={handleRegister}
            />
        </>
    );
}

// Initialize the component when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    const guestLayoutRoot = document.getElementById("guest-layout-root");
    if (guestLayoutRoot) {
        ReactDOM.createRoot(guestLayoutRoot).render(<GuestLayout />);
    }
});

// Export functions to open the popups that can be called from global scope
window.openLoginPopup = () => {
    // Dispatch the openLogin event
    const openLoginEvent = new CustomEvent("openLogin");
    document.dispatchEvent(openLoginEvent);
};

window.openRegisterPopup = () => {
    // Dispatch the openRegister event
    const openRegisterEvent = new CustomEvent("openRegister");
    document.dispatchEvent(openRegisterEvent);
};

// Export the GuestLayout component
export default GuestLayout;
