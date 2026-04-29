// IMPORTS
import { announce } from "../tools/announcer.js";
import { storage } from "../tools/storage.js";
import { run } from "./terminal.js";

// HISTORY INDEX
let index = -1;

// TERMINAL HISTORY FUNCTONS
function getHist() {
  return storage.get("termHistory", []);
}
function setHist(termHistory) {
  return storage.set("termhistory", termHistory);
}

// TERMINAL HISTORY HANDLERS
export function pushHist(val, input) {
  const termHistory = getHist();
  if (val.trim()) {
    termHistory.unshift(val);
    if (termHistory.length > 15) termHistory.pop();
    setHist(termHistory);
  }
  run(val);
  input.value = "";
  return index;
}

export function lastHist(input) {
  const termHistory = getHist();
  if (index < termHistory.length - 1) index++;
  input.value = termHistory[index] ?? "";
  announce("Previous Input:");
}

export function nextHist(input) {
  const termHistory = getHist();
  if (index <= 0) {
    index = -1;
    input.value = "";
    return;
  }
  index--;
  input.value = termHistory[index] ?? "";
  announce("Latest Input:");
}
