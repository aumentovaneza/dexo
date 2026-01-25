import "./bootstrap";
import "../css/app.css";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

// Getting app name from document title
const appName =
    window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

// Note: We no longer need to define window.route here as it's imported from ziggy-js in bootstrap.js

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
