// IMPORTS
import { announce } from "../tools/announcer.js";
import { storage } from "../tools/storage.js";
import { blank, addLine, printBlock, createBlock } from "../tools/utilities.js";
import { termOptions } from "./options.js";

// HELPER FUNCTONS
function getHist() {
  return storage.get("termHistory", []);
}
function setHist(termHistory) {
  return storage.set("termHistory", termHistory);
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

export function initTerminal() {
  // TERMINAL HISTORY TOGGLE
  let histIdx = -1;

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
  if (input) {
    const termHistory = getHist();
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const val = input.value;
        if (val.trim()) {
          termHistory.unshift(val);
          if (termHistory.length > 15) termHistory.pop();
          setHist(termHistory);
          histIdx = -1;
        }
        run(val);
        input.value = "";
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (histIdx < termHistory.length - 1) histIdx++;
        input.value = termHistory[histIdx] ?? "";
        announce("Previous Input:");
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (histIdx > 0) histIdx--;
        else {
          histIdx = -1;
          input.value = "";
          return;
        }
        input.value = termHistory[histIdx] ?? "";
        announce("Latest Input:");
      } else if (e.key === "Tab") {
        e.preventDefault();
        const val = input.value.toLowerCase();
        const pages = ["beans", "gear", "basket"];
        const match = pages.find((p) =>
          val.endsWith(p.slice(0, val.split(" ").at(-1).length)),
        );
        if (match) {
          const parts = input.value.split(" ");
          parts[parts.length - 1] = match;
          input.value = parts.join(" ");
          announce(`Autocompleted to ${input.value}`);
        }
      }
    });
  }
  // FOCUS INPUT
  terminalEl.addEventListener("click", () => {
    input.focus();
  });

  // INIT
  boot();
  input.focus();
}
