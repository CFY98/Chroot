// IMPORTS
import { storage } from "../tools/storage.js";
import { productPrices } from "../tools/assets.js";
import { announce } from "../tools/announcer.js";
import { basketHandler } from "./editquants.js";

class Basket {
  constructor() {
    this.subtotal = 0;
  }
  stagArea() {
    return storage.get("stagingArea", {});
  }
  baskItems() {
    return storage.get("basketItems", []);
  }
  orderNo() {
    return storage.get("orderNumber", []);
  }
  updateBasket(product) {
    product.addEventListener("click", (e) => {
      const cartItem = e.target.closest(".cart-item");
      if (!cartItem) return;
      const itemName = cartItem.querySelector(".name").textContent;
      const amount = cartItem.querySelector(".amount");
      basketHandler(e, product, cartItem, itemName, amount);
    });
  }
  updateTotal() {
    const stagingArea = this.stagArea();
    const total = document.querySelector(".total-amount");
    document.querySelectorAll(".cart-item").forEach((cartItem) => {
      const name = cartItem.querySelector(".name").textContent;
      const amount = cartItem.querySelector(".amount");
      const count = cartItem.querySelector(".count");
      count.textContent = stagingArea[name] || 0;
      amount.textContent = `£${(stagingArea[name] * productPrices[name]).toFixed(2)}`;
    });

    this.subtotal = Object.entries(stagingArea).reduce((sum, [key, value]) => {
      return sum + value * productPrices[key];
    }, 0);

    total.textContent = this.subtotal > 0 ? `£${this.subtotal.toFixed(2)}` : "";
  }
  updateStage(delta, cartItem, itemName, amount) {
    const stagingArea = this.stagArea();
    const count = cartItem.querySelector(".count");
    const prev = parseInt(storage.get("itemCount", 0));
    storage.set("itemCount", prev + delta);
    count.textContent = parseInt(count.textContent || 0) + delta;

    stagingArea[itemName] = Math.max(0, (stagingArea[itemName] || 0) + delta);

    amount.textContent = `£${(stagingArea[itemName] * productPrices[itemName]).toFixed(2)}`;
    storage.set("stagingArea", stagingArea);
  }
  emptyBasket(product) {
    const basketItems = this.baskItems();
    if (Object.entries(basketItems).length === 0) {
      storage.set("itemCount", 0);
      product.innerHTML = `<div class="empty"><p>Basket is Empty</p></div>`;
    }
  }
  resetBasket(product) {
    storage.remove("basketItems");
    storage.remove("stagingArea");
    storage.set("itemCount", 0);
    if (product) product.innerHTML = "";
    announce("The basket is now empty");
  }
}
export const basket = new Basket();
