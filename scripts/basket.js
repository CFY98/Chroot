// IMPORTS
import { announce } from "./announcer.js";
import {
  basketItems,
  orderNumber,
  processOrder,
  removeItem,
  stagingArea,
  prices,
  router,
} from "./assets.js";

export function initBasket() {
  // COSTS
  let subTotal = 0;

  // BASKET SETTINGS
  const product = document.querySelector(".cart-items");

  // BASKET BUTTONS
  const eliminate = document.querySelector(".delete");
  const checkout = document.querySelector(".button");
  const total = document.querySelector(".total-amount");

  function updateTotal(stagingArea) {
    document.querySelectorAll(".cart-item").forEach((cartItem) => {
      const name = cartItem.querySelector(".name").textContent;
      const amount = cartItem.querySelector(".amount");
      const count = cartItem.querySelector(".count");
      count.textContent = stagingArea[name] || "0";
      amount.textContent = `£${(stagingArea[name] * prices[name]).toFixed(2)}`;
    });

    subTotal = Object.entries(stagingArea).reduce((sum, [key, value]) => {
      return sum + value * prices[key];
    }, 0);

    total.textContent = subTotal > 0 ? `£${subTotal.toFixed(2)}` : "";
  }

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

      function updateItems(delta) {
        const count = cartItem.querySelector(".count");
        const prev = parseInt(localStorage.getItem("itemCount") || "0");
        localStorage.setItem("itemCount", prev + delta);
        count.textContent = parseInt(count.textContent || "0") + delta;

        stagingArea[itemName] += delta;
        amount.textContent = `£${(stagingArea[itemName] * prices[itemName]).toFixed(2)}`;
        localStorage.setItem("stagingArea", JSON.stringify(stagingArea));
      }

      if (e.target.classList.contains("plus-btn")) {
        updateItems(1);
        announce(`${itemName} quantity increased to ${stagingArea[itemName]}`);
        updateTotal(stagingArea);
      }

      if (e.target.classList.contains("minus-btn")) {
        updateItems(-1);
        announce(`${itemName} quantity decreased to ${stagingArea[itemName]}`);
        if (stagingArea[itemName] === 0) {
          removeItem(stagingArea, basketItems, itemName, cartItem);
          announce(` ${itemName} was completely removed from the basket`);
        }
        updateTotal(stagingArea);
      }
      if (e.target.closest(".remove")) {
        removeItem(stagingArea, basketItems, itemName, cartItem);
        announce(` ${itemName} was completely removed from the basket`);
        updateTotal(stagingArea);
      }
    });
  }

  // RESET ALL
  if (eliminate) {
    eliminate.onclick = function () {
      localStorage.removeItem("basketItems");
      basketItems.length = 0;
      localStorage.removeItem("stagingArea");
      for (let key in stagingArea) delete stagingArea[key];
      localStorage.setItem("itemCount", "0");
      if (product) product.innerHTML = "";
      announce("All items were completely removed from the basket");
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
      processOrder(orderNumber, basketItems, stagingArea);

      if (product) product.innerHTML = "";
      announce(`The receipt for order ${hash} is now available to print`);
      updateTotal(stagingArea);
      history.pushState({}, "", "/receipt");
      router("/receipt");
    };
  }

  // ITEMS IN BASKET
  if (product) {
    let prevBasketItems = "";
    let prevStagingArea = "";

    setInterval(() => {
      const currentItems = localStorage.getItem("basketItems") || "[]";
      const currentStaging = localStorage.getItem("stagingArea") || "{}";

      if (
        currentItems === prevBasketItems &&
        currentStaging === prevStagingArea
      )
        return;

      prevBasketItems = currentItems;
      prevStagingArea = currentStaging;

      const basketItems = JSON.parse(currentItems);
      const stagingArea = JSON.parse(currentStaging);

      product.innerHTML = "";
      basketItems.forEach((key) => {
        const qtyTotal = stagingArea[key] * prices[key];
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
      <div class="image-box">
        <img src="../Images/${key}.jpg" alt="${key}" />
      </div>
      <div class="about">
        <h4 class="name">${key}</h4>
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
      }, 300);
      updateTotal(stagingArea);
    });
  }
}
