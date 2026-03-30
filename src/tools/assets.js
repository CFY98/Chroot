// IMPORTS
import { router } from "./routerSPA.js";

// ROUTES OBJECT
export const routes = {
    "/": { path: "/index.html", title: "home" },
    "/beans": { path: "/pages/tabs/beans.html", title: "beans" },
    "/equipment": {
        path: "/pages/tabs/equipment.html",
        title: "equipment",
    },
    "/basket": { path: "/pages/tabs/basket.html", title: "basket" },
    "/tui": { path: "/pages/ui/tui.html", title: "tui" },
    "/receipt": { path: "/pages/ui/receipt.html", title: "receipt" },
    "/blaze": { path: "/pages/coffee/blaze.html", title: "blaze" },
    "/sunshine": { path: "/pages/coffee/sunshine.html", title: "sunshine" },
    "/summit": { path: "/pages/coffee/summit.html", title: "summit" },
    "/filters": { path: "/pages/gear/filters.html", title: "filters" },
    "/dripper": { path: "/pages/gear/dripper.html", title: "dripper" },
    "/grinder": { path: "/pages/gear/grinder.html", title: "grinder" },
};

// PRODUCTS
export const productPrices = {
    blaze: 11.99,
    sunshine: 14.99,
    summit: 19.99,
    filters: 9.99,
    dripper: 14.99,
    grinder: 129.99,
};

// FUNCTIONS
export function tMode(tuiMode) {
    if (tuiMode) {
        history.pushState({}, "", "/tui");
        router("/tui");
    } else {
        history.pushState({}, "", "/");
        router("/");
    }
}
