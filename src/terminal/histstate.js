// IMPORTS
import { announce } from "../tools/announcer.js";
import { storage } from "../tools/storage.js";
import { run } from "./terminal.js";

// HISTORY INDEX
let index = -1;

// TERMINAL HISTORY HANDLERS
export function pushHist(val, input, navigate) {
  const termHistory = storage.get("termHistory", []);
  if (val.trim()) {
    termHistory.unshift(val);
    if (termHistory.length > 15) termHistory.pop();
    storage.set("termHistory", termHistory);
  }
  run(val, navigate);
  input.value = "";
  return index;
}

export function lastHist(input) {
  const termHistory = storage.get("termHistory", []);
  if (index < termHistory.length - 1) index++;
  input.value = termHistory[index] ?? "";
  announce("Previous Input:");
}

export function nextHist(input) {
  const termHistory = storage.get("termHistory", []);
  if (index <= 0) {
    index = -1;
    input.value = "";
    return;
  }
  index--;
  input.value = termHistory[index] ?? "";
  announce("Latest Input:");
}
