// IMPORTS
import { announce } from "../tools/announcer.js";
import {
  basketItems,
  orderNumber,
  processOrder,
  removeItem,
  stagingArea,
  productPrices,
  orderMessage,
} from "../tools/assets.js";
import { router } from "../tools/routerSPA.js";

export function initBasket() {
  // COSTS
  let subTotal = 0;

  // BASKET SETTINGS
  const product = document.querySelector(".cart-items");

  // BASKET BUTTONS
  const eliminate = document.querySelector(".delete");
  const checkout = document.querySelector(".button");
  const total = document.querySelector(".total-amount");

  function emptyState(basketItems) {
    if (Object.entries(basketItems).length === 0) {
      product.innerHTML = `<div class="empty"><p>Basket is Empty</p></div>`;
    }
  }

  function updateTotal(stagingArea) {
    document.querySelectorAll(".cart-item").forEach((cartItem) => {
      const name = cartItem.querySelector(".name").textContent;
      const amount = cartItem.querySelector(".amount");
      const count = cartItem.querySelector(".count");
      count.textContent = stagingArea[name] || 0;
      amount.textContent = `£${(stagingArea[name] * productPrices[name]).toFixed(2)}`;
    });

    subTotal = Object.entries(stagingArea).reduce((sum, [key, value]) => {
      return sum + value * productPrices[key];
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

        const prev = parseInt(localStorage.getItem("itemCount") || 0);
        localStorage.setItem("itemCount", prev + delta);
        count.textContent = parseInt(count.textContent || 0) + delta;

        stagingArea[itemName] = (stagingArea[itemName] || 0) + delta;

        amount.textContent = `£${(stagingArea[itemName] * productPrices[itemName]).toFixed(2)}`;
        localStorage.setItem("stagingArea", JSON.stringify(stagingArea));
      }

      if (e.target.classList.contains("plus-btn")) {
        updateItems(1);
        announce(`${itemName} quantity increased to ${stagingArea[itemName]}`);
        updateTotal(stagingArea);
      }

      if (e.target.classList.contains("minus-btn")) {
        updateItems(-1);
        if (stagingArea[itemName] === 0) {
          removeItem(stagingArea, basketItems, itemName, cartItem);
          announce(` ${itemName} was completely removed from the basket`);
          if (basketItems.length === 0) {
            announce("the basket is now empty");
            emptyState(basketItems);
          }
          updateTotal(stagingArea);
        } else {
          announce(
            `${itemName} quantity decreased to ${stagingArea[itemName]}`,
          );
          updateTotal(stagingArea);
        }
      }
      if (e.target.closest(".remove")) {
        removeItem(stagingArea, basketItems, itemName, cartItem);
        announce(` ${itemName} was completely removed from the basket`);
        updateTotal(stagingArea);
        emptyState(basketItems);
      }
    });
  }

  // RESET ALL
  if (eliminate) {
    eliminate.onclick = function () {
      if (Object.keys(stagingArea).length === 0) {
        announce("The basket was empty to begin with");
        return;
      }
      localStorage.removeItem("basketItems");
      basketItems.length = 0;
      localStorage.removeItem("stagingArea");
      for (let key in stagingArea) delete stagingArea[key];
      localStorage.setItem("itemCount", "0");
      if (product) product.innerHTML = "";
      announce("The basket is now empty");
      updateTotal(stagingArea);
      emptyState(basketItems);
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
      processOrder(orderNumber, orderMessage, basketItems, stagingArea);

      const activeBtn = document.getElementById("nav-btn");
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
      const renderItems = JSON.parse(
        localStorage.getItem("basketItems") || "[]",
      );
      const renderStaging = JSON.parse(
        localStorage.getItem("stagingArea") || "{}",
      );

      product.innerHTML = "";

      emptyState(basketItems);

      renderItems.forEach((key) => {
        const qtyTotal = renderStaging[key] * productPrices[key];
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
        <div class="count" aria-label="Displays number of selected item in basket">${renderStaging[key]}</div>
        <div class="minus-btn" role="button" aria-label="Increases quantity by one">-</div>
      </div>
      <div class="cost">
        <div class="amount">£${qtyTotal.toFixed(2)}</div>
        <div class="remove" role="button" aria-label="Removes item from basket"><u>Remove</u></div>
      </div>
    `;
        product.appendChild(div);
      });
      updateTotal(renderStaging);
    }
    renderBasket();
  }
}
