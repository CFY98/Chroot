// IMPORTS
import { initTerminal } from "../terminal/terminal.js";
import { initBasket } from "../purchase/basket.js";
import { initReceipt } from "../purchase/receipt.js";
import { initBuy } from "../purchase/buy.js";
import { routes } from "./assets.js";
import { toAdd } from "./storage.js";

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
    announce(`The ${routes[page].title} page has loaded`);
    for (let key in toAdd) delete toAdd[key];
    if (page === ("/beans" || page === "/equipment")) return;
    else if (page === "/terminal") initTerminal();
    else if (page === "/basket") initBasket();
    else if (page === "/receipt") initReceipt();
    else initBuy(page);
}
