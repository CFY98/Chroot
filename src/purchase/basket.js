// IMPORTS
import { announce } from "../tools/announcer.js";
import { productPrices } from "../tools/assets.js";
import { router } from "../tools/routerSPA.js";
import service, { storage } from "../tools/storage.js";

export function initBasket() {
  const stagingArea = storage.get("stagingArea", {});
  const basketItems = storage.get("basketItems", []);
  const orderNumber = storage.get("orderNumber", []);
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

        const prev = parseInt(storage.get("itemCount", 0));
        storage.set("itemCount", prev + delta);
        count.textContent = parseInt(count.textContent || 0) + delta;

        stagingArea[itemName] = Math.max(
          0,
          (stagingArea[itemName] || 0) + delta,
        );

        amount.textContent = `£${(stagingArea[itemName] * productPrices[itemName]).toFixed(2)}`;
        storage.set("stagingArea", stagingArea);
      }

      if (e.target.classList.contains("plus-btn")) {
        updateItems(1);
        announce(`${itemName} quantity increased to ${stagingArea[itemName]}`);
        updateTotal(stagingArea);
      }

      if (e.target.classList.contains("minus-btn")) {
        updateItems(-1);
        if (stagingArea[itemName] === 0) {
          storage.removeItem(itemName, cartItem);
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
        service.removeItem(itemName, cartItem);
        const updatedBasketItems = storage.get("basketItems", []);
        const updatedStagingArea = storage.get("stagingArea", {});
        announce(` ${itemName} was completely removed from the basket`);
        updateTotal(updatedStagingArea);
        emptyState(updatedBasketItems);
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
      storage.remove("basketItems");
      storage.remove("stagingArea");
      storage.set("itemCount", 0);
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

      emptyState(basketItems);

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
