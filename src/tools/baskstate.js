// IMPORTS
import { storage } from "./storage.js";
import { announce } from "./announcer.js";
import { productPrices } from "./assets.js";

// HELPER FUNCTIONS
function getStage() {
  return storage.get("stagingArea", {});
}

function getOrderNo() {
  return storage.get("orderNumber", []);
}

function resetBasket() {
  storage.remove("stagingArea");
  storage.remove("itemCount");
  announce("The basket is now empty");
}

function getSubtotal() {
  const stagingArea = getStage();
  return Object.entries(stagingArea).reduce((sum, [key, value]) => {
      return sum + value * (productPrices[key] || 0);
    }, 0);
}

// BASKET STATE OBJECT MAP
export const basket = {
  stagArea: getStage,
  orderNo: getOrderNo,
  resetBasket: resetBasket,
  subtotal: getSubtotal,
};
