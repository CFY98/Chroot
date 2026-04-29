// IMPORTS
import { tMode, productPrices } from "../tools/assets.js";
import { tuiMode } from "../tools/routerSPA.js";
import { storage } from "../tools/storage.js";

// RECEIPT GENERATION FUNCTIONS
async function downloadPDF(orderNumber) {
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

function printReceipt(orderNumber, print, elements) {
  const { receipt, orderEl, messageEl, total } = elements;
  print.onclick = async function () {
    await downloadPDF(orderNumber);
    storage.remove("orderNumber");
    storage.remove("orderMessage");
    storage.remove("purchased");
    storage.remove("committed");
    if (receipt) receipt.innerHTML = "";
    if (orderEl) orderEl.textContent = "Order Number:";
    if (messageEl) messageEl.textContent = "";
    total.textContent = "";
    tMode(tuiMode);
  };
}

function genReceiptItem(key, committed) {
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
  return div;
}

function orderInfo(orderNumber, orderMessage, orderEl, messageEl) {
  if (orderEl) orderEl.textContent = `Order Number: ${orderNumber.at(-1)}`;
  if (messageEl)
    messageEl.textContent = orderMessage.at(-1)
      ? `Order Message: ${orderMessage.at(-1)}`
      : "";
}

function genReceipt(elements, data) {
  const { receipt, orderEl, messageEl, total } = elements;
  const { orderNumber, orderMessage, committed, purchased } = data;

  let subTotal = 0;
  receipt.innerHTML = "";

  orderInfo(orderNumber, orderMessage, orderEl, messageEl);

  purchased.forEach((key) => {
    receipt.appendChild(genReceiptItem(key, committed));
  });

  subTotal = Object.entries(committed).reduce((sum, [key, value]) => {
    return sum + value * productPrices[key];
  }, 0);

  total.textContent = subTotal > 0 ? `£${subTotal.toFixed(2)}` : "";
}

// MAIN INITIALISE RECEIPT FUNCTION
export function initReceipt() {
  const orderNumber = storage.get("orderNumber", []);
  const orderMessage = storage.get("orderMessage", []);
  const committed = storage.get("committed", []);
  const purchased = storage.get("purchased", []);

  // VALUES TO PRINT
  const print = document.getElementById("print");
  const receipt = document.querySelector(".receipt-items");
  const orderEl = document.getElementById("order");
  const messageEl = document.getElementById("message");
  const total = document.querySelector(".receipt-amount");

  if (!print) return;
  if (!receipt) return;
  if (!orderEl) return;
  if (!messageEl) return;

  const elements = { receipt, orderEl, messageEl, total };
  const data = { orderNumber, orderMessage, committed, purchased };

  printReceipt(orderNumber, print, elements);
  genReceipt(elements, data);
}
