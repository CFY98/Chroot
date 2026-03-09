// IMPORTS
import { BEANS, GEAR, PAGES, QUICK_CMDS } from "./assets.js";
import { announce } from "./announcer.js";

// TERMINAL HISTORY
const history = [];
let histIdx = -1;

// STAGING AREA
let stagingArea = {};

// RECEIPT NUMBER
let orderNumber = [];

window.addEventListener("storage", (e) => {
  if (e.key === "stagingArea" && e.newValue === null) {
    stagingArea = {};
  }
});

// DOM
const output = document.getElementById("terminal-output");
const input = document.getElementById("cmd-input");
const NAVIGATION = document.getElementById("suggestions");
const terminalEl = document.querySelector(".terminal");

// PRINT LINES AS BLOCKS
if (terminalEl) {
  const basket = document.querySelector(".webpage-link");

  function createBlock() {
    const block = document.createElement("div");
    return block;
  }

  function addLine(block, text, cls = "") {
    const el = document.createElement("div");
    el.className = "line" + (cls ? " " + cls : "");
    el.textContent = text;
    block.append(el);
  }

  function printBlock(block) {
    output.prepend(block);
    output.scrollTop = 0;
  }

  function blank(block) {
    addLine(block, "", "blank");
  }

  function navigate(block, page) {
    addLine(block, `site@chroot ~/${PAGES[page].label} $`, "prompt");
    const frame = document.getElementById("page");
    frame.src = PAGES[page].path;
  }

  // BOOT MESSAGE
  function boot() {
    const block = createBlock();
    addLine(block, "chroot v2.0.0 - speciality coffee; go Git it!", "info");
    addLine(block, "Type 'help' for available commands.", "info");
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

    switch (verb) {
      case "help":
        announce(
          "Type 'git', then add followed by the item name to add it to the basket. Git, then reset followed by the item name to removes it from the basket. To place orders, type 'git' followed by commit. To navigate, type 'cd' followed by the page name or use the buttons in the navigation bar. For more information, type about",
        );
        addLine(block, `site@chroot ~/${command} $`, "success");
        addLine(block, "Commands:", "info");
        addLine(block, "  ls           lists all pages", "info");
        addLine(block, "  git [tool]   tracks changes in order", "info");
        addLine(block, "  cd [tool]    navigate to a page", "info");
        addLine(block, "  about        about Chroot", "info");
        addLine(block, "  hours        opening hours", "info");
        addLine(block, "  clear        clear the terminal", "info");
        blank(block);
        addLine(block, "cd tools:", "info");
        addLine(block, "  beans        loads coffee catalogue", "info");
        addLine(block, "  gear         loads gear catalogue", "info");
        addLine(block, "  basket       loads the shopping cart", "info");
        blank(block);
        addLine(block, "git tools:", "info");
        addLine(block, "  add [item]     adds item to basket", "info");
        addLine(block, "  reset [item]   removes item from basket", "info");
        addLine(block, "  commit         proccesses orders", "info");
        blank(block);
        addLine(block, "Items:", "info");
        addLine(block, "  beans     [ blaze | sunshine | summit ]", "info");
        addLine(block, "  gear      [ filters | dripper | grinder ]", "info");
        blank(block);
        break;

      case "ls":
        announce(
          "The product pages are 'beans' which houses our selection of coffee beans and 'gear' which encompasses our coffee gear selection. For the shopping cart, go to the 'basket' page. For more information on our selected products, type 'cd' followed by the item name or click 'more info' on the image of the desired product",
        );
        addLine(block, `site@chroot ~/${command} $`, "success");
        addLine(block, "drwxr-xr-x        home", "info");
        addLine(block, "drwxr-xr-x        beans", "info");
        addLine(block, "drwxr-xr-x        gear", "info");
        addLine(block, "drwxr-xr-x        basket", "info");
        addLine(block, "dr-xr-xr--x       blaze", "info");
        addLine(block, "dr-xr-xr--x       sunshine", "info");
        addLine(block, "dr-xr-xr--x       summit", "info");
        addLine(block, "dr-xr-xr--x       filters", "info");
        addLine(block, "dr-xr-xr--x       dripper", "info");
        addLine(block, "dr-xr-xr--x       grinder", "info");
        blank(block);
        break;

      case "cd": {
        if (!arg) {
          announce(
            "A page wasn't specified. Type  'ls' for all available pages",
          );
          addLine(block, `Usage: ${verb} [ beans | gear | basket ]`, "warn");
          break;
        }
        const target = PAGES[arg];
        if (!target) {
          announce(
            "That page doesn't exist, please type 'ls' in the terminal for available pages",
          );
          addLine(block, `bash: ${verb}: ${arg}: No such page`, "error");
          addLine(block, `Hint: type 'ls' to see available pages`, "warn");
        } else {
          navigate(block, arg);
          announce(`${arg} has finished loading`);
        }
        break;
      }

      case "about":
        announce(
          "Chroot is a coffee roastery inspired by the Unix command line. For our opening-hours, type 'hours', 'ls' for a list of pages, and 'clear' to empty the terminal. Use the up and down arrow keys to toggle through the input history for efficiency",
        );
        addLine(block, `site@chroot ~/${command} $`, "success");
        addLine(
          block,
          "Change the root of your trajectory with coffee.",
          "info",
        );
        blank(block);
        addLine(
          block,
          "Chroot is a specialty coffee roastery inspired by the Unix command line",
          "info",
        );
        addLine(block, "where you commit to every cup of coffee.", "info");
        blank(block);
        break;

      case "hours":
        announce(
          "Chroot is open from Monday to Friday between 7am to 6pm and 8am to 4pm on the weekends",
        );
        addLine(block, `site@chroot ~/${command} $`, "success");
        addLine(block, "Mon–Fri   07:00 → 18:00", "info");
        addLine(block, "Sat–Sun   08:00 → 16:00", "info");
        blank(block);
        break;

      case "git":
        const action = parts[1];

        if (action === "add") {
          const items = parts.slice(2);

          if (items.length === 0) {
            addLine(block, "Nothing specified, nothing added", "warn");
            announce(
              "No item was specified, so nothing was added to the basket",
            );
            break;
          }

          items.forEach((item) => {
            if (BEANS.includes(item) || GEAR.includes(item)) {
              stagingArea[item] = (stagingArea[item] || 0) + 1;
              localStorage.setItem("stagingArea", JSON.stringify(stagingArea));

              const prev = parseInt(localStorage.getItem("itemCount") || "0");
              localStorage.setItem("itemCount", prev + 1);

              const basketItems = JSON.parse(
                localStorage.getItem("basketItems") || "[]",
              );
              if (!basketItems.includes(item)) {
                basketItems.push(item);
                localStorage.setItem(
                  "basketItems",
                  JSON.stringify(basketItems),
                );
              }

              if (basket && basket.contentWindow) {
                basket.contentWindow.postMessage(
                  { action: "updateBasket", item: item },
                  "*",
                );
              }
              addLine(block, `${item} staged for commit`, "info");
              announce(
                `${stagingArea[item]} ${item}${stagingArea[item] === 1 ? "" : "s"} ${stagingArea[item] > 1 ? "are" : "is"} in the basket`,
              );
            } else {
              addLine(block, `fatal: '${item}' not found`, "error");
              announce(
                ` ${item} does not exist so it was not added to the basket`,
              );
            }
          });

          break;
        } else if (action === "commit") {
          const message = parts.slice(3).join(" ").replace(/"/g, "");
          const stagedItems = Object.keys(stagingArea);
          const basketItems = JSON.parse(
            localStorage.getItem("basketItems") || "[]",
          );

          if (stagedItems.length === 0) {
            addLine(block, "No changes added to commit", "warn");
            announce(
              "No order was placed since there were no items in the basket",
            );
            break;
          }
          const hash = Math.random().toString(16).slice(2, 9);
          const totalItems = Object.values(stagingArea).reduce(
            (sum, qty) => sum + qty,
            0,
          );
          addLine(block, `[main ${hash}] ${message}`, "success");
          addLine(
            block,
            `${totalItems} file${totalItems > 1 ? "s" : ""} changed, ${totalItems} insertion${totalItems > 1 ? "s" : ""}(+)`,
            "info",
          );
          stagedItems.forEach((item) => {
            addLine(
              block,
              `create mode 100644 ${item} x${stagingArea[item]}`,
              "info",
            );
          });
          orderNumber.push(hash);
          localStorage.setItem("orderNumber", JSON.stringify(orderNumber));
          localStorage.setItem("purchased", JSON.stringify(basketItems));
          localStorage.setItem("committed", JSON.stringify(stagingArea));

          localStorage.removeItem("basketItems");
          localStorage.removeItem("stagingArea");
          localStorage.setItem("itemCount", "0");
          stagingArea = {};

          const frame = document.getElementById("page");
          frame.src = "../pages/receipt.html";
          frame.onload = () =>
            announce(`The receipt for order ${hash} is now available to print`);
          if (basket && basket.contentWindow) {
            basket.contentWindow.postMessage(
              { action: "updateBasket", item: item },
              "*",
            );
          }
          break;
        } else if (action === "reset") {
          const items = parts.slice(2);

          items.forEach((item) => {
            if (stagingArea[item]) {
              stagingArea[item] -= 1;

              const prev = parseInt(localStorage.getItem("itemCount") || "0");
              localStorage.setItem("itemCount", prev - 1);

              if (stagingArea[item] === 0) {
                delete stagingArea[item];
                const basketItems = JSON.parse(
                  localStorage.getItem("basketItems") || "[]",
                );
                const itemIndex = basketItems.findIndex((i) => i === item);
                if (itemIndex !== -1) basketItems.splice(itemIndex, 1);
                localStorage.setItem(
                  "basketItems",
                  JSON.stringify(basketItems),
                );
              }

              localStorage.setItem("stagingArea", JSON.stringify(stagingArea));
              if (basket && basket.contentWindow) {
                basket.contentWindow.postMessage(
                  { action: "updateBasket", item: item },
                  "*",
                );
              }
              addLine(block, `${item} unstaged`, "info");
              announce(
                `${stagingArea[item] > 0 ? stagingArea[item] : "no"} ${item}${stagingArea[item] > 1 ? "s" : ""} ${stagingArea[item] > 1 ? "are" : "is"} in the basket`,
              );
            } else {
              addLine(block, `'${item}' not staged`, "error");
              announce(`${item} was not in the basket so nothing was removed`);
            }
          });

          break;
        } else {
          addLine(block, `Usage: ${verb} [ add | reset | commit ]`, "warn");
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
        addLine(block, `Type  help  for available commands.`, "info");
    }
    addLine(block, `site@chroot ~ $ ${command}`, "prompt");
    printBlock(block);
  }

  // INPUT EVENTS
  if (input) {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const val = input.value;
        if (val.trim()) {
          history.unshift(val);
          histIdx = -1;
        }
        run(val);
        input.value = "";
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (histIdx < history.length - 1) histIdx++;
        input.value = history[histIdx] ?? "";
        announce(`History: ${input.value}`);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (histIdx > 0) histIdx--;
        else {
          histIdx = -1;
          input.value = "";
          return;
        }
        input.value = history[histIdx] ?? "";
        announce(`History: ${input.value}`);
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
  const terminal = document.querySelector(".terminal");

  if (terminal) {
    terminal.addEventListener("click", () => {
      input.focus();
    });
  }
  // SUGGESTION BUTTONS
  if (QUICK_CMDS && NAVIGATION) {
    QUICK_CMDS.forEach((cmd) => {
      const suggestion = document.createElement("button");
      suggestion.className = "suggestion";
      suggestion.textContent = cmd;
      suggestion.addEventListener("click", (e) => {
        e.stopPropagation();
        const fullCmd = PAGES[cmd] ? `cd ${cmd}` : cmd;
        input.value = fullCmd;
        run(fullCmd);
        input.value = "";
      });
      NAVIGATION.appendChild(suggestion);
    });
  }

  // INIT
  boot();
  input.focus();
}
