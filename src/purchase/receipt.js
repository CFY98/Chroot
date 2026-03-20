// IMPORTS
import {
  orderNumber,
  orderMessage,
  tMode,
  productPrices,
} from "../tools/assets.js";
import { tuiMode } from "../tools/routerSPA.js";

export function initReceipt() {
  // VALUES TO PRINT
  const print = document.getElementById("print");
  const purchased = JSON.parse(localStorage.getItem("purchased") || "[]");
  const committed = JSON.parse(localStorage.getItem("committed") || "{}");
  const receipt = document.querySelector(".receipt-items");
  const orderEl = document.getElementById("order");
  const messageEl = document.getElementById("message");
  const total = document.querySelector(".receipt-amount");

  async function downloadPDF() {
    const html2pdf = (await import("html2pdf.js")).default;
    const element = document.getElementById("invoice");
    const clone = element.cloneNode(true);
    clone.classList.add("printing");

    const opt = {
      filename: `chroot_receipt_${orderNumber}.pdf`,
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    try {
      await html2pdf().set(opt).from(clone).save();
    } finally {
      clone.classList.remove("printing");
    }
  }
  // PRINT BUTTON
  if (print) {
    print.onclick = async function () {
      await downloadPDF();
      localStorage.removeItem("orderNumber");
      localStorage.removeItem("orderMessage");
      localStorage.removeItem("purchased");
      localStorage.removeItem("committed");
      orderNumber.length = 0;
      orderMessage.length = 0;
      if (receipt) receipt.innerHTML = "";
      if (orderEl) orderEl.textContent = "Order Number:";
      if (messageEl) messageEl.textContent = "";
      total.textContent = "";
      tMode(tuiMode);
    };
  }
  // RECEIPT GENERATION
  if (receipt) {
    let subTotal = 0;
    receipt.innerHTML = "";
    if (orderEl) orderEl.textContent = `Order Number: ${orderNumber.at(-1)}`;
    if (messageEl)
      messageEl.textContent = /[\w\d\s.]/.test(orderMessage.at(-1))
        ? `Order Message: ${orderMessage.at(-1)}`
        : null;

    purchased.forEach((key) => {
      const qtyTotal = committed[key] * productPrices[key];
      const div = document.createElement("div");
      div.classList.add("receipt-item");
      div.innerHTML = `
      <div class="image-box">
        <img src="/Images/${key}.jpg" alt="${key}" />
      </div>
      <div class="about">
        <div class="item-name">${key}</div>
      </div>
        <div class="item-count">${committed[key]}</div>
      <div class="receipt-cost">
        <div class="item-amount">£${qtyTotal.toFixed(2)}</div>
      </div>
    `;
      receipt.appendChild(div);
    });
    subTotal = Object.entries(committed).reduce((sum, [key, value]) => {
      return sum + value * productPrices[key];
    }, 0);

    total.textContent = subTotal > 0 ? `£${subTotal.toFixed(2)}` : "";
  }
}
