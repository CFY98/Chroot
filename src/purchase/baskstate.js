// IMPORTS
import { storage } from "../tools/storage.js";
import { productPrices } from "../tools/assets.js";

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

function emptyBasket(product) {
  const basketItems = basket.baskItem();
  if (Object.entries(basketItems).length === 0) {
    storage.set("itemCount", 0);
    product.innerHTML = `<div class="empty"><p>Basket is Empty</p></div>`;
  }
}

function updateTotal() {
  const stagingArea = basket.stagArea();
  const total = document.querySelector(".total-amount");
  document.querySelectorAll(".cart-item").forEach((cartItem) => {
    const name = cartItem.querySelector(".name").textContent;
    const amount = cartItem.querySelector(".amount");
    const count = cartItem.querySelector(".count");
    count.textContent = stagingArea[name] || 0;
    amount.textContent = `£${(stagingArea[name] * productPrices[name]).toFixed(2)}`;
  });

  basket.subtotal = Object.entries(stagingArea).reduce((sum, [key, value]) => {
    return sum + value * productPrices[key];
  }, 0);

  total.textContent =
    basket.subtotal > 0 ? `£${basket.subtotal.toFixed(2)}` : "";
}

function updateItems(delta, cartItem, itemName, amount) {
  const stagingArea = basket.stagArea();
  const count = cartItem.querySelector(".count");
  const prev = parseInt(storage.get("itemCount", 0));
  storage.set("itemCount", prev + delta);
  count.textContent = parseInt(count.textContent || 0) + delta;

  stagingArea[itemName] = Math.max(0, (stagingArea[itemName] || 0) + delta);

  amount.textContent = `£${(stagingArea[itemName] * productPrices[itemName]).toFixed(2)}`;
  storage.set("stagingArea", stagingArea);
}
// BASKET STATE OBJECT MANAGER
export const basket = {
  stagArea: getStage,
  baskItem: getBasket,
  orderNo: getOrderNo,
  empBask: emptyBasket,
  updTot: updateTotal,
  updItms: updateItems,
  subtotal: 0,
};
