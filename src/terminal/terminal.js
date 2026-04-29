// IMPORTS
import { announce } from "../tools/announcer.js";
import { storage } from "../tools/storage.js";
import { blank, addLine, printBlock, createBlock } from "../tools/utilities.js";
import { termOptions } from "./options.js";
import { pageMap } from "./autocomplete.js";
import { pushHist, lastHist, nextHist } from "./histstate.js";


// TERM HANDLER LOGIC 
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

// BOOT MESSAGE
function boot() {
  const block = createBlock();
  addLine(block, "chroot v3.0.0 - speciality coffee", "info");
  addLine(block, "Type 'help' for available commands", "info");
  blank(block);
  printBlock(block);
}

// COMMAND HANDLER
export function run(command) {
  const cmd = command.trim().toLowerCase();
  if (!cmd) return;

  const block = createBlock();
  const parts = cmd.split(/\s+/);
  const verb = parts[0];
  const arg = parts.slice(1).join(" ");

  termHandler(command, arg, parts, verb, block);
}

// KEYPRESS HANDLERS
function pressEnter({ input }) {
  const val = input.value;
  pushHist(val, input);
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
  if (inputOpts) inputOpts( { parts, input, firstPart });
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
  const stagingArea = storage.get("stagingArea", {});
  
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
    if (pressed) pressed({ e, input });
  });

  // FOCUS INPUT
  terminalEl.addEventListener("click", () => {
    input.focus();
  });

  // INIT
  boot();
  input.focus();
}
