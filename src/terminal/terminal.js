// IMPORTS
import { announce } from "../tools/announcer.js";
import { storage } from "../tools/storage.js";
import { blank, addLine, printBlock, createBlock } from "../tools/utilities.js";
import { termOptions } from "./options.js";
import { pageMap } from "./autocomplete.js";
import { pushHist, lastHist, nextHist } from "./histstate.js";

// INTERVALS
let storageHandler;
let keydownHandler;
let clickHandler;

// TERM HANDLER LOGIC
function termHandler({ command, arg, parts, verb, block, navigate }) {
  const handler = termOptions[verb];

  if (handler) {
    handler({ command, arg, parts, verb, block, navigate });
  } else {
    addLine(block, `bash: ${verb}: command not found`, "error");
    addLine(block, `Type 'help' for available commands`, "info");
    announce("If stuck, type 'help' for available commands");
  }
  addLine(block, `site@chroot ~ $ ${command}`, "prompt");
  printBlock(block);
}

// BOOT MESSAGE
function boot() {
  const block = createBlock();
  addLine(block, "chroot v0.2.1 - speciality coffee", "info");
  addLine(block, "Type 'help' for available commands", "info");
  blank(block);
  printBlock(block);
}

// COMMAND HANDLER
export function run(command, navigate) {
  const cmd = command.trim().toLowerCase();
  if (!cmd) return;

  const block = createBlock();
  const parts = cmd.split(/\s+/);
  const verb = parts[0];
  const arg = parts.slice(1).join(" ");

  termHandler({ command, arg, parts, verb, block, navigate });
}

// KEYPRESS HANDLERS
function pressEnter({ input, navigate }) {
  const val = input.value;
  pushHist(val, input, navigate);
}

function pressUp({ e, input }) {
  e.preventDefault();
  lastHist(input);
}

function pressDown({ e, input }) {
  e.preventDefault();
  nextHist(input);
}

function pressTab({ e, input }) {
  e.preventDefault();
  const parts = input.value.toLowerCase().split(/\s+/);
  const firstPart = parts[0];
  const inputOpts = pageMap[firstPart];
  if (inputOpts) inputOpts({ parts, input, firstPart });
}

// KEYPRESS HANDLERS MAP
const keyPress = {
  Enter: pressEnter,
  ArrowUp: pressUp,
  ArrowDown: pressDown,
  Tab: pressTab,
};

export function cleanupTerminal() {
  const input = document.querySelector("[data-component='cmd-input']");
  const terminalEl = document.querySelector("[data-component='terminal']");
  if (storageHandler) window.removeEventListener("storage", storageHandler);
  if (keydownHandler && input)
    input.removeEventListener("keydown", keydownHandler);
  if (clickHandler && terminalEl)
    terminalEl.removeEventListener("click", clickHandler);
}

// TERMINAL INTERFACE
export function initTerminal(navigate) {
  // TERMINAL DOM
  const input = document.querySelector("[data-component='cmd-input']");
  const terminalEl = document.querySelector("[data-component='terminal']");
  const stagingArea = storage.get("stagingArea", {});

  const storageHandler = (e) => {
    if (e.key === "stagingArea" && e.newValue === null) {
      Object.keys(stagingArea).forEach((key) => delete stagingArea[key]);
    }
  };
  window.addEventListener("storage", storageHandler);

  // CHECK IF INSTANCES EXIST
  if (!input || !terminalEl) return;

  // INPUT EVENTS
  const keydownHandler = (e) => {
    const pressed = keyPress[e.key];
    if (pressed) pressed({ e, input, navigate });
  };
  input.addEventListener("keydown", keydownHandler);

  // FOCUS INPUT
  const clickHandler = () => {
    input.focus();
  };
  terminalEl.addEventListener("click", clickHandler);

  // INIT
  boot();
  input.focus();
}
