// IMPORTS
import { products, stagingArea, basketItems } from "../tools/assets.js";
import { announce } from "../tools/announcer.js";

export function initBuy() {
  const buy = document.querySelector(".buy");
  if (buy) {
    buy.onclick = function () {
      const item = window.location.pathname.split("/").pop();

      if (products.includes(item)) {
        stagingArea[item] = (stagingArea[item] || 0) + 1;
        localStorage.setItem("stagingArea", JSON.stringify(stagingArea));

        const prev = parseInt(localStorage.getItem("itemCount") || 0);
        localStorage.setItem("itemCount", prev + 1);

        if (!basketItems.includes(item)) {
          basketItems.push(item);
          localStorage.setItem("basketItems", JSON.stringify(basketItems));
        }
      }
      announce(
        `${stagingArea[item]} ${item}${stagingArea[item] === 1 ? "" : "s"} ${stagingArea[item] > 1 ? "are" : "is"} in the basket`,
      );
    };
  }
}
