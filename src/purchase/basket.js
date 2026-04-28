// IMPORTS
import { announce } from "../tools/announcer.js";
import { productPrices } from "../tools/assets.js";
import { router } from "../tools/routerSPA.js";
import service, { storage } from "../tools/storage.js";

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

// BASKET STATE OBJECT MANAGER
const basket = {
  stagArea: getStage,
  baskItem: getBasket,
  orderNo: getOrderNo,
  subtotal: 0,
};

function emptyState(product) {
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

function incAmount({ cartItem, itemName, amount }) {
  const stagingArea = basket.stagArea();
  updateItems(1, cartItem, itemName, amount);
  announce(`${itemName} quantity increased to ${stagingArea[itemName]}`);
  updateTotal();
}

function decAmount({ product, cartItem, itemName, amount }) {
  const stagingArea = basket.stagArea();
  const basketItems = basket.baskItem();
  updateItems(-1, cartItem, itemName, amount);
  if (stagingArea[itemName] === 0) {
    service.removeItem(cartItem, itemName);
    announce(` ${itemName} was completely removed from the basket`);
    if (basketItems.length === 0) {
      announce("the basket is now empty");
      emptyState(product);
    }
    updateTotal();
  } else {
    announce(`${itemName} quantity decreased to ${stagingArea[itemName]}`);
    updateTotal();
  }
}

function remItem({ product, cartItem, itemName }) {
  service.removeItem(cartItem, itemName);
  announce(` ${itemName} was completely removed from the basket`);
  updateTotal();
  emptyState(product);
}
const basketDom = {
  "plus-btn": incAmount,
  "minus-btn": decAmount,
};

function genOrderNo(product) {
  const hash = Math.random().toString(16).slice(2, 9);
  const orderNumber = basket.orderNo();
  orderNumber.push(hash);
  storage.set("orderNumber", orderNumber);
  service.processOrder();
  if (product) product.innerHTML = "";
  announce(`The receipt for order ${hash} is now available to print`);
  updateTotal();
}

function exitBasket() {
  const activeBtn = document.getElementById("basket-btn");
  if (activeBtn) activeBtn.classList.remove("active");
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
function basketHandler(e, product, cartItem, itemName, amount) {
  const editBasket = basketDom[e.target.className];
  if (editBasket) editBasket({ product, cartItem, itemName, amount });
  if (e.target.closest(".remove")) remItem({ product, cartItem, itemName });
}
export function initBasket() {
  const stagingArea = basket.stagArea();
  const basketItems = basket.baskItem();

  // DOM ELEMENTS
  const product = document.querySelector(".cart-items");
  if (!product) return;
  const eliminate = document.querySelector(".delete");
  if (!eliminate) return;
  const checkout = document.querySelector(".button");
  if (!checkout) return;

  window.addEventListener("message", (event) => {
    if (event.data.action === "updateBasket") {
      updateTotal();
    }
  });

  // UPDATE BASKET DOM
  product.addEventListener("click", (e) => {
    const cartItem = e.target.closest(".cart-item");
    if (!cartItem) return;
    const itemName = cartItem.querySelector(".name").textContent;
    const amount = cartItem.querySelector(".amount");
    basketHandler(e, product, cartItem, itemName, amount);
  });

  // RESET ALL
  eliminate.onclick = function () {
    if (Object.keys(stagingArea).length === 0) {
      announce("The basket was empty to begin with");
      return;
    }
    storage.remove("basketItems");
    storage.remove("stagingArea");
    storage.set("itemCount", 0);
    if (product) product.innerHTML = "";
    announce("The basket is now empty");
    updateTotal();
    emptyState(product);
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
    emptyState(product);
    basketItems.forEach((key) => {
      product.appendChild(genCartItem(key));
    });
    updateTotal();
  }
  renderBasket();
}
