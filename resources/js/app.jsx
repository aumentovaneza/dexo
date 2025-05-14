import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./bootstrap";
import "../css/app.css";
import LoginPopup from "./components/LoginPopup";

function App() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const handleLogin = async (credentials) => {
        // This would typically be an API call to your backend
        console.log("Login attempted with:", credentials);

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // For demo purposes, let's consider successful login if email contains "demo"
        if (credentials.email.includes("demo")) {
            console.log("Login successful");
            return Promise.resolve();
        } else {
            return Promise.reject(new Error("Invalid credentials"));
        }
    };

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-4xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-primary">Dexo</h1>
                    <button
                        onClick={() => setIsLoginOpen(true)}
                        className="px-4 py-2 bg-primary text-background rounded hover:bg-primary/90"
                    >
                        Log In
                    </button>
                </header>

                <main>
                    <div className="bg-surface p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-text mb-4">
                            Welcome to Dexo
                        </h2>
                        <p className="text-text-muted">
                            Click the Login button in the header to see the
                            login popup.
                        </p>
                    </div>
                </main>

                <LoginPopup
                    isOpen={isLoginOpen}
                    onClose={() => setIsLoginOpen(false)}
                    onLogin={handleLogin}
                />
            </div>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
