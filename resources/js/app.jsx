import React from "react";
import ReactDOM from "react-dom/client";
import "./bootstrap";
import "../css/app.css";

function App() {
    return (
        <h1 className="text-3xl font-bold text-teal-400">Welcome to Dexo</h1>
    );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
