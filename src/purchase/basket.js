// IMPORTS
import { announce } from "../tools/announcer.js";
import { productPrices } from "../tools/assets.js";
import { router } from "../tools/routerSPA.js";
import service, { storage } from "../tools/storage.js";
import { basket } from "./baskstate.js";
import { remItem, basketDom, basketHandler } from "./editquants.js";

// PROCESS ORDER FUNCTIONS
function genOrderNo(product) {
  const hash = Math.random().toString(16).slice(2, 9);
  const orderNumber = basket.orderNo();
  orderNumber.push(hash);
  storage.set("orderNumber", orderNumber);
  service.processOrder();
  if (product) product.innerHTML = "";
  announce(`The receipt for order ${hash} is now available to print`);
  basket.updateTotal();
}

function genCartItem(key) {
  const stagingArea = basket.stagArea();
  const qtyTotal = stagingArea[key] * productPrices[key];
  const div = document.createElement("div");
  div.classList.add("cart-item");
  div.innerHTML = `
      <div class="image-box">
        <img src="/Images/${key}.jpg" alt="${key}" />
      </div>
      <div class="about">
        <div class="name">${key}</div>
      </div>
      <div class="counter">
        <div class="plus-btn" role="button" aria-label="Increases quantity by one">+</div>
        <div class="count" aria-label="Displays number of selected item in basket">${stagingArea[key]}</div>
        <div class="minus-btn" role="button" aria-label="Increases quantity by one">-</div>
      </div>
      <div class="cost">
        <div class="amount">£${qtyTotal.toFixed(2)}</div>
        <div class="remove" role="button" aria-label="Removes item from basket"><u>Remove</u></div>
      </div>
    `;
  return div;
}

function exitBasket() {
  const activeBtn = document.getElementById("basket-btn");
  if (activeBtn) activeBtn.classList.remove("active");
}

// UPDATE BASKET DOM
function updateBasket(product) {
  product.addEventListener("click", (e) => {
    const cartItem = e.target.closest(".cart-item");
    if (!cartItem) return;
    const itemName = cartItem.querySelector(".name").textContent;
    const amount = cartItem.querySelector(".amount");
    basketHandler(e, product, cartItem, itemName, amount);
  });
}

export function initBasket() {
  const stagingArea = basket.stagArea();
  const basketItems = basket.baskItems();

  // DOM ELEMENTS
  const product = document.querySelector(".cart-items");
  if (!product) return;
  updateBasket(product);

  const eliminate = document.querySelector(".delete");
  if (!eliminate) return;
  const checkout = document.querySelector(".button");
  if (!checkout) return;

  window.addEventListener("message", (event) => {
    if (event.data.action === "updateBasket") {
      basket.updateTotal();
    }
  });

  // RESET BASKET
  eliminate.onclick = function () {
    if (Object.keys(stagingArea).length === 0) {
      announce("The basket was empty to begin with");
      return;
    }
    basket.resetBasket(product);
    basket.updateTotal();
    basket.emptyBasket(product);
  };

  // PROCESS ORDER
  checkout.onclick = function () {
    if (Object.keys(stagingArea).length === 0) {
      announce("No order was placed since there were no items in the basket");
      return;
    }
    genOrderNo(product);
    exitBasket();
    history.pushState({}, "", "/receipt");
    router("/receipt");
  };

  // ITEMS IN BASKET
  function renderBasket() {
    product.innerHTML = "";
    basket.emptyBasket(product);
    basketItems.forEach((key) => {
      product.appendChild(genCartItem(key));
    });
    basket.updateTotal();
  }
  renderBasket();
}
