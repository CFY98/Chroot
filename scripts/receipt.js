// IMPORTS
import { prices } from "./basket.js";
console.log("prices:", prices);

// RECEIPT VARIABLE
const receipt = document.querySelector(".receipt-items");

// INVOICE NUMBER
const orderEl = document.getElementById("order");

// VALUES TO PRINT
const orderNumber = JSON.parse(localStorage.getItem("orderNumber") || "[]");
const purchased = JSON.parse(localStorage.getItem("purchased") || "[]");
const committed = JSON.parse(localStorage.getItem("committed") || "{}");
const print = document.getElementById("print");
const iframe = window.parent.document.getElementById("page");

// PRINT BUTTON
if (print) {
  const total = document.querySelector(".receipt-amount");
  print.onclick = function () {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    if (receipt) receipt.innerHTML = "";
    localStorage.removeItem("orderNumber");
    localStorage.removeItem("purchased");
    localStorage.removeItem("committed");
    if (orderEl) orderEl.textContent = "Order Number:";
    total.textContent = "";
    iframe.src = "../pages/basket.html";
  };
}
// RECEIPT GENERATION
if (receipt) {
  let subTotal = 0;
  const total = document.querySelector(".receipt-amount");
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
