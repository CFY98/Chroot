// IMPORTS
import { productPrices } from "../tools/assets.js";
import { announce } from "../tools/announcer.js";
import { gitCmds } from "./git.js";
import { cdPages } from "./cd.js";
import { blank, addLine, printBlock, createBlock } from "../tools/utilities.js";
import storage from "../tools/storage.js";

export function initTerminal() {
  // TERMINAL HISTORY TOGGLE
  let histIdx = -1;

  // TERMINAL DOM
  const output = document.getElementById("terminal-output");
  const input = document.getElementById("cmd-input");
  const terminalEl = document.querySelector(".terminal");

  window.addEventListener("storage", (e) => {
    if (e.key === "stagingArea" && e.newValue === null) {
      Object.keys(stagingArea).forEach((key) => delete stagingArea[key]);
    }
  });

  // PRINT LINES AS BLOCKS
  if (terminalEl) {
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
      const { stagingArea, basketItems, orderNumber, orderMessage, committed } = storage;

      switch (verb) {
        case "help":
          announce(
            "Type 'git', then add followed by the item name to add it to the basket. Git, then reset followed by the item name to removes it from the basket. To place orders, type 'git' followed by commit. To navigate, type 'cd' followed by the page name or use the buttons in the navigation bar. For more information, type about",
          );
          addLine(block, `site@chroot ~/${command} $`, "success");
          blank(block);
          addLine(block, "Available commands:", "info");
          addLine(block, "  ls           lists all pages", "info");
          addLine(block, "  git          tracks changes in order", "info");
          addLine(block, "  cd           navigate to a page", "info");
          addLine(block, "  about        about Chroot", "info");
          addLine(block, "  hours        opening hours", "info");
          addLine(block, "  clear        clear the terminal", "info");
          blank(block);
          break;

        case "ls":
          announce(
            "The product pages are 'beans' which houses our selection of coffee beans and 'gear' which encompasses our coffee gear selection. For the shopping cart, go to the 'basket' page. For more information on our selected products, type 'cd' followed by the item name or click 'more info' on the image of the desired product",
          );
          addLine(block, `site@chroot ~/${command} $`, "success");
          blank(block);
          addLine(block, "  drwxr-xr-x        gui", "info");
          addLine(block, "  drwxr-xr-x        beans", "info");
          addLine(block, "  drwxr-xr-x        equipment", "info");
          addLine(block, "  drwxr-xr-x        basket", "info");
          addLine(block, "  dr-xr-xr--x       blaze", "info");
          addLine(block, "  dr-xr-xr--x       sunshine", "info");
          addLine(block, "  dr-xr-xr--x       summit", "info");
          addLine(block, "  dr-xr-xr--x       filters", "info");
          addLine(block, "  dr-xr-xr--x       dripper", "info");
          addLine(block, "  dr-xr-xr--x       grinder", "info");
          blank(block);
          break;

        case "cd": {
          if (!arg) {
            addLine(block, "hint: type 'ls' for all available pages", "warn");
            break;
          }
          const target = cdPages[arg];
          if (!target) {
            announce(
              "That page doesn't exist, please type 'ls' in the terminal for available pages",
            );
            addLine(block, `bash: ${verb}: ${arg}: No such page`, "error");
            addLine(block, `hint: type 'ls' to see available pages`, "warn");
          } else {
            addLine(block, `site@chroot ~/${command} $`, "success");
            cdPages[arg](block);
          }
          break;
        }

        case "about":
          announce(
            "Chroot is a coffee roastery inspired by the Unix command line. For our opening-hours, type 'hours', 'ls' for a list of pages, and 'clear' to empty the terminal. Use the up and down arrow keys to toggle through the input history for efficiency",
          );
          addLine(block, `site@chroot ~/${command} $`, "success");
          blank(block);
          addLine(block, "  Change the root of your trajectory", "info");
          addLine(block, "  with coffee.", "info");
          blank(block);
          addLine(block, "  Chroot is a specialty coffee roastery", "info");
          addLine(block, "  inspired by the Unix command line", "info");
          addLine(block, "  where you commit to every cup of", "info");
          addLine(block, "  coffee.", "info");
          blank(block);
          break;

        case "hours":
          announce(
            "  Chroot is open from Monday to Friday between 7am to 6pm and 8am to 4pm on the weekends",
          );
          addLine(block, `site@chroot ~/${command} $`, "success");
          blank(block);
          addLine(block, "  Mon–Fri   07:00 → 18:00", "info");
          addLine(block, "  Sat–Sun   08:00 → 16:00", "info");
          blank(block);
          break;

        case "git": {
          const action = parts[1];
          const items = parts.slice(2);

          if (action in gitCmds) {
            gitCmds[action]({
              items,
              stagingArea,
              basketItems,
              productPrices,
              block,
              orderNumber,
              orderMessage,
              committed,
            });
          } else {
            addLine(block, `Usage: ${verb} [ add ][ reset ][ status ]`, "warn");
            addLine(block, "           [ commit ][ log ]", "warn");
            blank(block);
            addLine(block, "Available Git commands:", "info");
            addLine(block, "  add [item]        adds [item]", "info");
            addLine(block, "                    to basket", "info");
            addLine(block, "      [--all | -A]  adds 1 of each item", "info");
            addLine(block, "                    to the basket", "info");
            blank(block);
            addLine(block, "  reset [item]      removes [item]", "info");
            addLine(block, "                    from basket", "info");
            addLine(block, "        [--hard]    empties the basket", "info");
            blank(block);
            addLine(block, "  status            shows status", "info");
            addLine(block, "                    of basket", "info");
            blank(block);
            addLine(block, "  commit [-m][msg]  proccesses order", "info");
            addLine(block, "                    with a message", "info");
            addLine(block, "                    [msg] is optional", "info");
            blank(block);
            addLine(block, "  log               shows receipt", "info");
            blank(block);
            break;
          }
          break;
        }

        case "clear":
          output.innerHTML = "";
          announce("The terminal window contents have been cleared");
          return;

        // Easter Eggs
        case "sudo":
          addLine(block, "Our coffee only comes in wholebean", "warn");
          break;

        case "rm":
          addLine(block, "Permission denied. Admins only.", "error");
          break;

        case "exit":
        case "quit":
          addLine(block, "There is no escaping good coffee.", "warn");
          break;

        default:
          addLine(block, `bash: ${verb}: command not found`, "error");
          addLine(block, `Type 'help' for available commands`, "info");
      }
      addLine(block, `site@chroot ~ $ ${command}`, "prompt");
      printBlock(block);
    }

    // INPUT EVENTS
    if (input) {
      const { termHistory } = storage;
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const val = input.value;
          if (val.trim()) {
            termHistory.unshift(val);
            if (termHistory.length > 15) termHistory.pop();
            storage.saveTermHistory(termHistory);
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
    if (terminalEl) {
      terminalEl.addEventListener("click", () => {
        input.focus();
      });
    }

    // INIT
    boot();
    input.focus();
  }
}
