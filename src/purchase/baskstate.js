// IMPORTS
import { storage } from "../tools/storage.js";
import { announce } from "../tools/announcer.js";

// HELPER FUNCTIONS
function getStage() {
  return storage.get("stagingArea", {});
}

function getBasket() {
  return storage.get("basketItems", []);
}

function getOrderNo() {
  return storage.get("orderNumber", []);
}

function resetBasket() {
  storage.remove("basketItems");
  storage.remove("stagingArea");
  storage.set("itemCount", 0);
  announce("The basket is now empty");
}

// BASKET STATE OBJECT MAP
export const basket = {
  stagArea: getStage,
  baskItems: getBasket,
  orderNo: getOrderNo,
  resetBasket: resetBasket,
  subtotal: 0,
};
