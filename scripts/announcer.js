// IMPORTS
import { initTerminal } from "./terminal.js";
import { initBasket } from "./basket.js";
import { initReceipt } from "./receipt.js";

// ANNOUNCEMENTS
export function announce(message) {
  const announcer =
    document.getElementById("announcer") ||
    window.parent.document.getElementById("announcer");

  console.log("announcer found:", announcer);
  console.log("message:", message);

  if (!announcer) return;
  announcer.textContent = "";
  announcer.textContent = message;
}

// PAGE ANNOUNCEMENTS
export function tuiAnnounce() {
  announce("The terminal interface has loaded");
  initTerminal();
}
export function basketAnnounce() {
  announce("The basket page has loaded");
  initBasket();
}
export function receiptAnnounce() {
  announce("The receipt page has loaded");
  initReceipt();
}
export function equipmentAnnounce() {
  announce("The equipment page has loaded");
}
export function beansAnnounce() {
  announce("The beans page has loaded");
}
export const routesAnnouncements = {
  "/tui": tuiAnnounce,
  "/basket": basketAnnounce,
  "/receipt": receiptAnnounce,
  "/beans": beansAnnounce,
  "/equipment": equipmentAnnounce,
};
