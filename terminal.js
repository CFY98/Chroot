// LINK TO BASKET IFRAME
const basket = document.querySelector(".webpage-link");

// IMPORTS
import { BEANS, EQUIPMENT, PAGES, QUICK_CMDS } from "./assets.js";

// TERMINAL HISTORY
const history = [];
let histIdx = -1;

// STAGING AREA
let stagingArea = {};

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
        addLine(block, `site@chroot ~/${command} $`, "success");
        addLine(block, "Available commands:", "info");
        addLine(block, "  ls              list all pages", "info");
        addLine(block, "  git <tool>      tracks changes in order", "info");
        addLine(block, "  cd <page>       navigate to a page", "info");
        addLine(block, "  about           about Chroot", "info");
        addLine(block, "  hours           opening hours", "info");
        addLine(block, "  clear           clear the terminal", "info");
        blank(block);
        addLine(block, "Pages:", "info");
        addLine(block, "  beans  equipment  basket", "info");
        addLine(block, "  blaze  sunshine  summit", "info");
        addLine(block, "  filters  dripper  grinder", "info");
        blank(block);
        addLine(block, "Tools:", "info");
        addLine(block, "  add  reset  commit", "info");
        blank(block);
        break;

      case "ls":
        addLine(block, `site@chroot ~/${command} $`, "success");
        addLine(block, "drwxr-xr-x        home/", "info");
        addLine(block, "drwxr-xr-x        beans/", "info");
        addLine(block, "drwxr-xr-x        equipment/", "info");
        addLine(block, "drwxr-xr-x        basket/", "info");
        addLine(block, "drwxr--r--r       help/", "info");
        addLine(block, "drwxr--r--r       about/", "info");
        addLine(block, "drwxr--r--r       hours/", "info");
        blank(block);
        break;

      case "cd": {
        if (!arg) {
          addLine(
            block,
            `Usage: ${verb} <page> (beans | equipment | basket | blaze | sunshine | summit | filters | dripper | grinder)`,
            "warn",
          );
          break;
        }
        const target = PAGES[arg];
        if (!target) {
          addLine(block, `bash: ${verb}: ${arg}: No such page`, "error");
          addLine(block, `Hint: try 'ls' to see available pages`, "warn");
        } else {
          navigate(block, arg);
        }
        break;
      }

      case "about":
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
            break;
          }

          items.forEach((item) => {
            if (BEANS.includes(item) || EQUIPMENT.includes(item)) {
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

              basket.contentWindow.postMessage(
                { action: "updateBasket", item: item },
                "*",
              );
              addLine(block, `${item} staged for commit`, "info");
            } else {
              addLine(block, `fatal: '${item}' not found`, "error");
            }
          });

          break;
        } else if (action === "commit") {
          const message = parts.slice(3).join(" ").replace(/"/g, "");
          const stagedItems = Object.keys(stagingArea);
          if (stagedItems.length === 0) {
            addLine(block, "No changes added to commit", "warn");
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
          localStorage.removeItem("basketItems");
          localStorage.removeItem("stagingArea");
          localStorage.setItem("itemCount", "0");
          stagingArea = {};
          basket.contentWindow.postMessage({ action: "updateBasket" }, "*");
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
              basket.contentWindow.postMessage(
                { action: "updateBasket", item: item },
                "*",
              );
              addLine(block, `${item} unstaged`, "info");
            } else {
              addLine(block, `'${item}' not staged`, "error");
            }
          });

          break;
        } else {
          addLine(
            block,
            `Usage: ${verb} <tool> (add | reset | commit)`,
            "warn",
          );
          break;
        }

      case "clear":
        output.innerHTML = "";
        return;

      // Easter Eggs
      case "sudo":
        addLine(block, "Coffee only come in wholebean", "warn");
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
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (histIdx > 0) histIdx--;
        else {
          histIdx = -1;
          input.value = "";
          return;
        }
        input.value = history[histIdx] ?? "";
      } else if (e.key === "Tab") {
        e.preventDefault();
        const val = input.value.toLowerCase();
        const pages = ["beans", "equipment", "basket"];
        const match = pages.find((p) =>
          val.endsWith(p.slice(0, val.split(" ").at(-1).length)),
        );
        if (match) {
          const parts = input.value.split(" ");
          parts[parts.length - 1] = match;
          input.value = parts.join(" ");
        }
      }
    });
  }

  // SUGGESTION BUTTONS

  if (QUICK_CMDS && NAVIGATION) {
    QUICK_CMDS.forEach((cmd) => {
      const suggestion = document.createElement("button");
      // suggestion.style.width = "8rem";
      suggestion.className = "suggestion";
      suggestion.textContent = cmd;
      suggestion.addEventListener("click", () => {
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
}
