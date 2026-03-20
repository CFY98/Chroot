// IMPORTS
import { initTerminal } from "../terminal/terminal.js";
import { initBasket } from "../purchase/basket.js";
import { initReceipt } from "../purchase/receipt.js";
import { initBuy } from "../purchase/buy.js";

// ANNOUNCEMENTS
export function announce(message) {
  const announcer =
    document.getElementById("announcer") ||
    window.parent.document.getElementById("announcer");

  if (!announcer) return;
  announcer.textContent = "";
  announcer.textContent = message;
}

// PAGE ANNOUNCEMENTS
export function uiAnnounce(page) {
  if (page in routes) {
    announce(`The ${routes[page].title} page had loaded`);
    if (page === "/beans" || page === "/equipment") return;
    else if (page === "/tui") initTerminal();
    else if (page === "/basket") initBasket();
    else if (page === "/receipt") initReceipt();
    else initBuy(page);
  }
}
