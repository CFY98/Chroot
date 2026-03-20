// IMPORTS
import { initTerminal } from "./terminal.js";
import { initBasket } from "./basket.js";
import { initReceipt } from "./receipt.js";
import { initBuy } from "./buy.js";

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
export function tuiAnnounce() {
  announce("The Terminal User Interface has loaded");
  initTerminal();
}
export function basketAnnounce() {
  announce("The Basket page has loaded");
  initBasket();
}
export function receiptAnnounce() {
  announce("The Receipt page has loaded");
  initReceipt();
}
export function equipmentAnnounce() {
  announce("The Equipment page has loaded");
}
export function beansAnnounce() {
  announce("The Beans page has loaded");
}
export function blazeAnnounce() {
  announce("The Blaze coffee page had loaded");
  initBuy();
}
export function sunshineAnnounce() {
  announce("The Sunshine coffee page had loaded");
  initBuy();
}
export function summitAnnounce() {
  announce("The Summit coffee page had loaded");
  initBuy();
}
export function filtersAnnounce() {
  announce("The Chroot Filters page had loaded");
  initBuy();
}
export function dripperAnnounce() {
  announce("The Chroot Dripper page had loaded");
  initBuy();
}
export function grinderAnnounce() {
  announce("The Chroot Grinder page had loaded");
  initBuy();
}
export const routesAnnouncements = {
  "/tui": tuiAnnounce,
  "/basket": basketAnnounce,
  "/receipt": receiptAnnounce,
  "/beans": beansAnnounce,
  "/equipment": equipmentAnnounce,
  "/blaze": blazeAnnounce,
  "/sunshine": sunshineAnnounce,
  "/summit": summitAnnounce,
  "/filters": filtersAnnounce,
  "/dripper": dripperAnnounce,
  "/grinder": grinderAnnounce,
};
