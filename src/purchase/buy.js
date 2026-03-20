// IMPORTS
import { products, stagingArea, basketItems, toAdd } from "../tools/assets.js";
import { announce } from "../tools/announcer.js";

export function initBuy() {
  const buy = document.querySelector(".buy");
  const toBuy = document.getElementById("purchase");
  const itemName = window.location.pathname.split("/").pop();
  toAdd[itemName] = toAdd[itemName] || 1;

  if (toBuy) {
    toBuy.addEventListener("click", (e) => {
      const itemQuantity = e.target.closest(".counter");
      if (!itemQuantity) return;

      function updateItems(delta) {
        const count = itemQuantity.querySelector(".count");
        count.textContent = parseInt(count.textContent || 0) + delta;

        toAdd[itemName] += delta;
      }

      if (e.target.classList.contains("plus-btn")) {
        updateItems(1);
        announce(`${itemName} quantity increased to ${toAdd[itemName]}`);
      }

      if (e.target.classList.contains("minus-btn")) {
        if (toAdd[itemName] <= 1) return;
        updateItems(-1);
        announce(`${itemName} quantity decreased to ${toAdd[itemName]}`);
      }
    });
  }

  if (buy) {
    buy.onclick = function () {
      if (products.includes(itemName)) {
        localStorage.setItem("stagingArea", JSON.stringify(toAdd));

        Object.entries(toAdd).forEach(([_, value]) => {
          const prev = parseInt(localStorage.getItem("itemCount") || 0);
          localStorage.setItem("itemCount", prev + value);
        });
        localStorage.setItem("stagingArea", JSON.stringify(toAdd));
        for (let key in toAdd) delete toAdd[key];

        if (!basketItems.includes(itemName)) {
          basketItems.push(itemName);
          localStorage.setItem("basketItems", JSON.stringify(basketItems));
        }
      }
      announce(
        `${stagingArea[itemName]} ${itemName}${stagingArea[itemName] === 1 ? "" : "s"} ${stagingArea[itemName] > 1 ? "are" : "is"} in the basket`,
      );
    };
  }
}
