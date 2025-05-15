// Export Ziggy route configuration
export const Ziggy = {
    url: window.location.origin,
    port: null,
    defaults: {},
    routes: {}
};

// If Ziggy is defined in the Inertia page props, update the routes
if (window.Inertia && window.Inertia.page && window.Inertia.page.props.ziggy) {
    Object.assign(Ziggy, window.Inertia.page.props.ziggy);
} 