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

function emptyState(basketItems, product) {
  if (Object.entries(basketItems).length === 0) {
    storage.set("itemCount", 0);
    product.innerHTML = `<div class="empty"><p>Basket is Empty</p></div>`;
  }
}

function updateTotal(stagingArea) {
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

function updateItems(delta, stagingArea, cartItem, itemName, amount) {
  const count = cartItem.querySelector(".count");
  const prev = parseInt(storage.get("itemCount", 0));
  storage.set("itemCount", prev + delta);
  count.textContent = parseInt(count.textContent || 0) + delta;

  stagingArea[itemName] = Math.max(0, (stagingArea[itemName] || 0) + delta);

  amount.textContent = `£${(stagingArea[itemName] * productPrices[itemName]).toFixed(2)}`;
  storage.set("stagingArea", stagingArea);
}

function incAmount(stagingArea, cartItem, itemName, amount) {
  updateItems(1, stagingArea, cartItem, itemName, amount);
  announce(`${itemName} quantity increased to ${stagingArea[itemName]}`);
  updateTotal(stagingArea);
}

function decAmount(stagingArea, basketItems, product, cartItem, itemName, amount) {
  updateItems(-1, stagingArea, cartItem, itemName, amount);
  if (stagingArea[itemName] === 0) {
    service.removeItem(itemName, cartItem);
    announce(` ${itemName} was completely removed from the basket`);
    if (basketItems.length === 0) {
      announce("the basket is now empty");
      emptyState(basketItems, product);
    }
    updateTotal(stagingArea);
  } else {
    announce(`${itemName} quantity decreased to ${stagingArea[itemName]}`);
    updateTotal(stagingArea);
  }
}

function remItem(product, cartItem, itemName, amount) {
  service.removeItem(cartItem, itemName);
  const updatedBasketItems = basket.baskItem();
  const updatedStagingArea = basket.stagArea();
  announce(` ${itemName} was completely removed from the basket`);
  updateTotal(updatedStagingArea);
  emptyState(updatedBasketItems, product);
}

export function initBasket() {
  const stagingArea = basket.stagArea();
  const basketItems = basket.baskItem();
  const orderNumber = basket.orderNo();

  // BASKET SETTINGS
  const product = document.querySelector(".cart-items");
  if (!product) return;

  // BASKET BUTTONS
  const eliminate = document.querySelector(".delete");
  if (!eliminate) return;
  const checkout = document.querySelector(".button");

  window.addEventListener("message", (event) => {
    if (event.data.action === "updateBasket") {
      updateTotal(stagingArea);
    }
  });

  if (product) {
    product.addEventListener("click", (e) => {
      const cartItem = e.target.closest(".cart-item");
      if (!cartItem) return;
      const itemName = cartItem.querySelector(".name").textContent;
      const amount = cartItem.querySelector(".amount");

      if (e.target.classList.contains("plus-btn"))
        incAmount(stagingArea, cartItem, itemName, amount);
      if (e.target.classList.contains("minus-btn"))
        decAmount(stagingArea, basketItems, product, cartItem, itemName, amount);
      if (e.target.closest(".remove")) remItem(product, cartItem, itemName, amount);
    });
  }

  // RESET ALL
  if (eliminate) {
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
      updateTotal(stagingArea);
      emptyState(basketItems, product);
    };
  }

  // PROCESS ORDER
  if (checkout) {
    checkout.onclick = function () {
      if (Object.keys(stagingArea).length === 0) {
        announce("No order was placed since there were no items in the basket");
        return;
      }
      const hash = Math.random().toString(16).slice(2, 9);
      orderNumber.push(hash);
      storage.set("orderNumber", orderNumber);
      service.processOrder();

      const activeBtn = document.getElementById("basket-btn");
      if (activeBtn) activeBtn.classList.remove("active");

      if (product) product.innerHTML = "";
      announce(`The receipt for order ${hash} is now available to print`);
      updateTotal(stagingArea);
      history.pushState({}, "", "/receipt");
      router("/receipt");
    };
  }

  // ITEMS IN BASKET
  if (product) {
    function renderBasket() {
      product.innerHTML = "";

      emptyState(basketItems, product);

      basketItems.forEach((key) => {
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
        product.appendChild(div);
      });
      updateTotal(stagingArea);
    }
    renderBasket();
  }
}
