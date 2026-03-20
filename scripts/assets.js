// IMPORTS
import { announce, routesAnnouncements } from "./announcer.js";
import { initGUI } from "./slideshow.js";

// ROUTES OBJECT
export const routes = {
  "/": { path: "./index.html", title: "home" },
  "/beans": { path: "./pages/beans.html", title: "beans" },
  "/equipment": { path: "./pages/equipment.html", title: "equipment" },
  "/basket": { path: "./pages/basket.html", title: "basket" },
  "/tui": { path: "./pages/tui.html", title: "tui" },
  "/receipt": { path: "./pages/receipt.html", title: "receipt" },
};

// ROUTER FUNCTION
let homeContent = null;

export function router(page) {
  const screenContent = document.getElementById("app");
  const route = routes[page];

  if (!homeContent) {
    homeContent = screenContent.innerHTML;
  }

  screenContent.replaceChildren();

  if (page === "/") {
    screenContent.innerHTML = homeContent;
    announce("The home page has loaded");
    initGUI();
    return;
  }

  if (!route) {
    screenContent.innerHTML = "<p>404 - Page not found.</p>";
    return;
  }

  fetch(route.path)
    .then((res) => res.text())
    .then((html) => {
      screenContent.innerHTML = html;
      if (page in routesAnnouncements) routesAnnouncements[page]();
    })
    .catch(() => {
      screenContent.innerHTML = "<p>404 - Page not found.</p>";
    });
}

// ITEMS
export const coffeeBeans = ["blaze", "sunshine", "summit"];
export const brewGear = ["filters", "dripper", "grinder"];

export const prices = {
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

// FUNCTIONS
export function processOrder(orderNumber, basketItems, stagingArea) {
  localStorage.setItem("orderNumber", JSON.stringify(orderNumber));
  localStorage.setItem("purchased", JSON.stringify(basketItems));
  localStorage.setItem("committed", JSON.stringify(stagingArea));

  localStorage.removeItem("basketItems");
  basketItems.length = 0;
  localStorage.removeItem("stagingArea");
  for (let key in stagingArea) delete stagingArea[key];
  localStorage.setItem("itemCount", "0");
}
export function removeItem(stagingArea, basketItems, itemName, cartItem) {
  const itemQty = stagingArea[itemName] || 1;
  const prev = parseInt(localStorage.getItem("itemCount") || "0");

  announce(`${itemName} was completely removed from the basket`);

  delete stagingArea[itemName];
  const itemIndex = basketItems.findIndex((i) => i === itemName);
  if (itemIndex !== -1) basketItems.splice(itemIndex, 1);

  localStorage.setItem("itemCount", prev - itemQty);
  localStorage.setItem("basketItems", JSON.stringify(basketItems));
  localStorage.setItem("stagingArea", JSON.stringify(stagingArea));
  cartItem.remove();
}
