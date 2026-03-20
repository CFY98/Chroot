// IMPORTS
import { initBasket } from "./basket.js";
import { initReceipt } from "./receipt.js";
import { initGUI } from "./slideshow.js";
import { initTerminal } from "./terminal.js";

// ROUTES
export const routes = {
  "/": { path: "./index.html", title: "home" },
  "/beans": { path: "./pages/beans.html", title: "beans" },
  "/equipment": { path: "./pages/equipment.html", title: "equipment" },
  "/basket": { path: "./pages/basket.html", title: "basket" },
  "/tui": { path: "./pages/tui.html", title: "tui" },
  "/receipt": { path: "./pages/receipt.html", title: "receipt" },
};

// ROUTER
let homeContent = null;
let changedPage = null;

export function router(page) {
  const screenContent = document.getElementById("app");
  const route = routes[page];

  if (changedPage) {
    changedPage();
    changedPage = null;
  }

  if (!homeContent) {
    homeContent = screenContent.innerHTML;
  }

  screenContent.replaceChildren();

  if (page === "/") {
    screenContent.innerHTML = homeContent;
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
      if (page === "/tui") initTerminal();
      else if (page === "/basket") initBasket();
      else if (page === "/receipt") initReceipt();
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
  sunshine: 13.99,
  summit: 19.99,
  filters: 9.99,
  dripper: 14.99,
  grinder: 29.99,
};

// INVOICE NUMBER

// LOCAL STORAGE
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

  delete stagingArea[itemName];
  const itemIndex = basketItems.findIndex((i) => i === itemName);
  if (itemIndex !== -1) basketItems.splice(itemIndex, 1);

  localStorage.setItem("itemCount", prev - itemQty);
  localStorage.setItem("basketItems", JSON.stringify(basketItems));
  localStorage.setItem("stagingArea", JSON.stringify(stagingArea));
  cartItem.remove();
}
