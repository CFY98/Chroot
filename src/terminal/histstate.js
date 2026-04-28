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
export const histIdx = {
  termHist: getHist,
  index: -1,
};

// TERMINAL HISTORY HANDLERS
export function pushHist(val, input) {
  const termHistory = histIdx.termHist();
  if (val.trim()) {
    termHistory.unshift(val);
    if (termHistory.length > 15) termHistory.pop();
    setHist(termHistory);
  }
  run(val);
  input.value = "";
  return histIdx.index;
}

export function lastHist(input) {
  const termHistory = histIdx.termHist();
  if (histIdx.index < termHistory.length - 1) histIdx.index++;
  input.value = termHistory[histIdx.index] ?? "";
  announce("Previous Input:");
}

export function nextHist(input) {
  const termHistory = histIdx.termHist();
  if (histIdx.index <= 0) {
    histIdx.index = -1;
    input.value = "";
    return;
  }
  histIdx.index--;
  input.value = termHistory[histIdx.index] ?? "";
  announce("Latest Input:");
}
