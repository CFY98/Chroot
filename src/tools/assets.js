// IMPORTS
import { announce } from "./announcer.js";
import { router, tuiMode } from "./routerSPA.js";

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

// LOCAL STORAGE OBJECTS AND ARRAYS
export const orderNumber = JSON.parse(
  localStorage.getItem("orderNumber") || "[]",
);

export const basketItems = JSON.parse(
  localStorage.getItem("basketItems") || "[]",
);
export const stagingArea = JSON.parse(
  localStorage.getItem("stagingArea") || "{}",
);

export const termHistory = JSON.parse(
  localStorage.getItem("termHistory") || "[]",
);

// STATE OBJECT
export let toAdd = {};

// FUNCTIONS
export function processOrder(orderNumber, basketItems, stagingArea) {
  localStorage.setItem("orderNumber", JSON.stringify(orderNumber));
  localStorage.setItem("product__purchased", JSON.stringify(basketItems));
  localStorage.setItem("committed", JSON.stringify(stagingArea));

  localStorage.removeItem("basketItems");
  basketItems.length = 0;
  localStorage.removeItem("stagingArea");
  for (let key in stagingArea) delete stagingArea[key];
  localStorage.setItem("itemCount", 0);
}
export function removeItem(stagingArea, basketItems, itemName, cartItem) {
  const itemQty = stagingArea[itemName] || 1;
  const prev = parseInt(localStorage.getItem("itemCount") || 0);

  announce(`${itemName} was completely removed from the basket`);

  delete stagingArea[itemName];
  const itemIndex = basketItems.findIndex((i) => i === itemName);
  if (itemIndex !== -1) basketItems.splice(itemIndex, 1);

  localStorage.setItem("itemCount", prev - itemQty);
  localStorage.setItem("basketItems", JSON.stringify(basketItems));
  localStorage.setItem("stagingArea", JSON.stringify(stagingArea));
  cartItem.remove();
}

export function tMode(tuiMode) {
  if (tuiMode) {
    history.pushState({}, "", "/tui");
    router("/tui");
  } else {
    history.pushState({}, "", "/");
    router("/");
  }
}
