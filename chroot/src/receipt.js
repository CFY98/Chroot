// IMPORTS
import {
  prices,
  processOrder,
  orderNumber,
  basketItems,
  stagingArea,
} from "./assets.js";
import { router } from "./routerSPA.js";

export function initReceipt() {
  // VALUES TO PRINT
  const print = document.getElementById("print");
  const purchased = JSON.parse(localStorage.getItem("purchased") || "[]");
  const committed = JSON.parse(localStorage.getItem("committed") || "{}");
  const receipt = document.querySelector(".receipt-items");
  const orderEl = document.getElementById("order");
  const total = document.querySelector(".receipt-amount");

  // PRINT BUTTON
  if (print) {
    print.onclick = function () {
      window.print();
      processOrder(orderNumber, basketItems, stagingArea);
      localStorage.removeItem("orderNumber");
      orderNumber.length = 0;
      if (receipt) receipt.innerHTML = "";
      if (orderEl) orderEl.textContent = "Order Number:";
      total.textContent = "";

      if (window.location.pathname === "/tui") {
        history.pushState({}, "", "/");
        router("/");
      } else {
        history.pushState({}, "", "/tui");
        router("/tui");
      }
    };
  }
  // RECEIPT GENERATION
  if (receipt) {
    let subTotal = 0;
    receipt.innerHTML = "";
    if (orderEl)
      orderEl.textContent = `Order Number: ${orderNumber[orderNumber.length - 1]}`;

    purchased.forEach((key) => {
      const qtyTotal = committed[key] * prices[key];
      const div = document.createElement("div");
      div.classList.add("receipt-item");
      div.innerHTML = `
      <div class="image-box">
        <img src="../Images/${key}.jpg" alt="${key}" />
      </div>
      <div class="about">
        <h4 class="item-name">${key}</h4>
      </div>
        <div class="item-count">${committed[key]}</div>
      <div class="cost">
        <div class="item-amount">£${qtyTotal.toFixed(2)}</div>
      </div>
    `;
      receipt.appendChild(div);
    });
    subTotal = Object.entries(committed).reduce((sum, [key, value]) => {
      return sum + value * prices[key];
    }, 0);

    total.textContent = subTotal > 0 ? `£${subTotal.toFixed(2)}` : "";
  }
}
