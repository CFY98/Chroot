// IMPORTS
import { storage } from "./storage.js";
import { announce } from "./announcer.js";

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

// BASKET STATE OBJECT MAP
export const basket = {
  stagArea: getStage,
  orderNo: getOrderNo,
  resetBasket: resetBasket,
  subtotal: 0,
};
