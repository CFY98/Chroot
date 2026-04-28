// IMPORTS
import { announce } from "../tools/announcer.js";
import { storage } from "../tools/storage.js";
import { run } from "./terminal.js";

class HistIdx {
  constructor() {
    this.index = -1;
  }
  getHist() {
    return storage.get("termHistory", []);
  }
  setHist(termhistory) {
    return storage.set("termhistory", termhistory);
  }
  pushHist(val, input) {
    const termHistory = this.getHist();
    if (val.trim()) {
      termHistory.unshift(val);
      if (termHistory.length > 15) termHistory.pop();
      this.setHist(termHistory);
    }
    run(val);
    input.value = "";
    return this.index;
  }

  lastHist(input) {
    const termHistory = this.termHist();
    if (this.index < termHistory.length - 1) this.index++;
    input.value = termHistory[this.index] ?? "";
    announce("Previous Input:");
  }
  nextHist(input) {
    const termHistory = this.termHist();
    if (this.index <= 0) {
      this.index = -1;
      input.value = "";
      return;
    }
    this.index--;
    input.value = termHistory[this.index] ?? "";
    announce("Latest Input:");
  }
}

export const histIdx = new HistIdx();
