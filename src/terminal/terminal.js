// IMPORTS
import { announce } from "../tools/announcer.js";
import { storage } from "../tools/storage.js";
import { blank, addLine, printBlock, createBlock } from "../tools/utilities.js";
import { termOptions } from "./options.js";
import { pageMap } from "./autocomplete.js";

let histIdx = -1;

// TERMINAL HISTORY FUNCTONS
function getHist() {
  return storage.get("termHistory", []);
}
function setHist(termhistory) {
  return storage.set("termhistory", termhistory);
}

// HISTORY INDEX
const termHistIdx = {
  termHist: getHist,
  index: -1,
};

// HELPER FUNCTIONS
function termHandler(command, arg, parts, verb, block) {
  const handler = termOptions[verb];

  if (handler) {
    handler({ command, arg, parts, verb, block });
  } else {
    addLine(block, `bash: ${verb}: command not found`, "error");
    addLine(block, `Type 'help' for available commands`, "info");
    announce("If stuck, type 'help' for available commands");
  }
  addLine(block, `site@chroot ~ $ ${command}`, "prompt");
  printBlock(block);
}

function pushHist(val, input) {
  const termHistory = termHistIdx.termHist();
  if (val.trim()) {
    termHistory.unshift(val);
    if (termHistory.length > 15) termHistory.pop();
    setHist(termHistory);
  }
  run(val);
  input.value = "";
  return termHistIdx.index;
}

// BOOT MESSAGE
function boot() {
  const block = createBlock();
  addLine(block, "chroot v3.0.0 - speciality coffee", "info");
  addLine(block, "Type 'help' for available commands", "info");
  blank(block);
  printBlock(block);
}

// COMMAND HANDLER
function run(command) {
  const cmd = command.trim().toLowerCase();
  if (!cmd) return;

  const block = createBlock();
  const parts = cmd.split(/\s+/);
  const verb = parts[0];
  const arg = parts.slice(1).join(" ");

  termHandler(command, arg, parts, verb, block);
}

// KEYPRESS HANDLERS
function pressEnter(e, input) {
  const val = input.value;
  pushHist(val, input);
}

function pressUp(e, input) {
  const termHistory = getHist();

  e.preventDefault();
  if (histIdx < termHistory.length - 1) histIdx++;
  input.value = termHistory[histIdx] ?? "";
  announce("Previous Input:");
}

function pressDown(e, input) {
  const termHistory = getHist();

  e.preventDefault();
  if (histIdx <= 0) {
    histIdx = -1;
    input.value = "";
    return;
  }
  histIdx--;
  input.value = termHistory[histIdx] ?? "";
  announce("Latest Input:");
}

function pressTab(e, input) {
  e.preventDefault();
  const parts = input.value.toLowerCase().split(/\s+/);
  const firstPart = parts[0];
  const inputOpts = pageMap[firstPart];
  if (inputOpts) inputOpts(parts, input, firstPart);
}

// KEYPRESS HANDLERS MAP
const keyPress = {
  Enter: pressEnter,
  ArrowUp: pressUp,
  ArrowDown: pressDown,
  Tab: pressTab,
};

// TERMINAL INTERFACE
export function initTerminal() {
  // TERMINAL DOM
  const input = document.getElementById("cmd-input");
  const terminalEl = document.querySelector(".terminal");

  window.addEventListener("storage", (e) => {
    if (e.key === "stagingArea" && e.newValue === null) {
      Object.keys(stagingArea).forEach((key) => delete stagingArea[key]);
    }
  });

  // CHECK IF INSTANCES EXIST
  if (!input || !terminalEl) return;

  // INPUT EVENTS
  input.addEventListener("keydown", (e) => {
    const pressed = keyPress[e.key];
    if (pressed) pressed(e, input);
  });

  // FOCUS INPUT
  terminalEl.addEventListener("click", () => {
    input.focus();
  });

  // INIT
  boot();
  input.focus();
}
