import "./bootstrap";
import "../css/app.css";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

// Adding global route function
const appName =
    window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

// Initialize Ziggy route helper
window.route = function (name, params, absolute, config) {
    try {
        // Get the route information from Ziggy data provided by Laravel
        const ziggyData =
            window.Ziggy || (window.Inertia && window.Inertia.page.props.ziggy);

        if (!ziggyData || !ziggyData.routes || !ziggyData.routes[name]) {
            console.warn(`Route '${name}' not found`, { ziggyData });
            return "#";
        }

        // Simple route generation for essential functionality
        let url = ziggyData.url + "/" + name.replace(/\./g, "/");

        // Basic parameter handling
        if (params && typeof params === "object") {
            const queryParams = new URLSearchParams();
            for (const key in params) {
                queryParams.append(key, params[key]);
            }
            url += "?" + queryParams.toString();
        }

        return url;
    } catch (error) {
        console.error(`Route error: ${error.message}`, { name, params });
        return "#";
    }
};

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
        const page = pages[`./Pages/${name}.jsx`];

        if (!page) {
            console.error(`Page not found: ./Pages/${name}.jsx`);
            console.log("Available pages:", Object.keys(pages));
        }

        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
});
