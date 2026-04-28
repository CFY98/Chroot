// IMPORTS
import { announce } from "../tools/announcer.js";
import { storage } from "../tools/storage.js";
import { run } from "./terminal.js";

// TERMINAL HISTORY FUNCTONS
function getHist() {
  return storage.get("termHistory", []);
}
function setHist(termhistory) {
  return storage.set("termhistory", termhistory);
}

// HISTORY INDEX
export const history = {
  termHist: getHist,
  index: -1,
};

// TERMINAL HISTORY HANDLERS
export function pushHist(val, input) {
  const termHistory = history.termHist();
  if (val.trim()) {
    termHistory.unshift(val);
    if (termHistory.length > 15) termHistory.pop();
    setHist(termHistory);
  }
  run(val);
  input.value = "";
  return history.index;
}

export function lastHist(input) {
  const termHistory = history.termHist();
  if (history.index < termHistory.length - 1) history.index++;
  input.value = termHistory[history.index] ?? "";
  announce("Previous Input:");
}

export function nextHist(input) {
  const termHistory = history.termHist();
  if (history.index <= 0) {
    history.index = -1;
    input.value = "";
    return;
  }
  history.index--;
  input.value = termHistory[history.index] ?? "";
  announce("Latest Input:");
}
