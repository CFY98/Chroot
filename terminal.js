// CONFIG
const PAGES = {
  beans: { path: "./beans.html", label: "beans" },
  equipment: { path: "./equipment.html", label: "equipment" },
  home: { path: "./home.html", label: "home" },
};

const QUICK_CMDS = [
  "help",
  "ls",
  "cd beans",
  "cd equipment",
  "about",
  "hours",
  "clear",
];

// HISTORY
const history = [];
let histIdx = -1;

// STAGING AREA
let stagingArea = [];

// ITEMS

const BEANS = ["arabica", "robusta", "liberica", "excelsa"];
const EQUIPMENT = ["filters", "dripper", "grinder"];

// DOM
const output = document.getElementById("terminal-output");
const input = document.getElementById("cmd-input");
const flash = document.getElementById("flash");
const chipsE1 = document.getElementById("suggestions");

// PRINT LINES AS BLOCKS
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

function navigate(block, page, delay = 600) {
  addLine(block, `→ Loading ${PAGES[page].label}…`, "info");
  //   flash.classList.add("active");
  setTimeout(() => {
    // flash.classList.remove("active");
    const frame = document.getElementById("item");
    frame.src = PAGES[page].path;
    // window.location.href = PAGES[page].path;
    addLine(block, `site@chroot ~/${PAGES[page].label} $`, "prompt");
  }, delay);
}

// BOOT MESSAGE
function boot() {
  const block = createBlock();
  addLine(block, "chroot v1.0.0 - speciality coffee, terminal style", "info");
  addLine(block, "Type help for available commands.", "info");
  blank(block);
  printBlock(block);
}

// COMMAND HANDLER
function run(command) {
  const cmd = command.trim().toLowerCase();
  if (!cmd) return;

  const block = createBlock();

  addLine(block, `site@chroot ~ $ ${command}`, "prompt");

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
      addLine(block, "Pages:  home  beans  equipment", "info");
      addLine(block, "Tools:  'add'  'reset'  'commit -m'", "info");
      addLine(block, "'-m' stands for 'message'", "info");
      blank(block);
      break;

    case "ls":
      addLine(block, "drwxr-xr-x        home/", "success");
      addLine(block, "drwxr-xr-x        beans/", "success");
      addLine(block, "drwxr-xr-x        equipment/", "success");
      addLine(block, "drwxr--r--r       help/", "success");
      addLine(block, "drwxr--r--r       about/", "success");
      addLine(block, "drwxr--r--r       hours/", "success");
      blank(block);
      break;

    case "cd": {
      if (!arg) {
        addLine(
          block,
          `Usage: ${verb} <page> (home | beans | equipment)`,
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
        addLine(block, `site@chroot ~/${command} $`, "success");
      }
      break;
    }

    case "about":
      addLine(block, `site@chroot ~/${command} $`, "success");
      blank(block);
      addLine(
        block,
        "Change the root of your trajectory with coffee.",
        "success",
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
      addLine(block, "Mon–Fri   07:00 → 18:00", "success");
      addLine(block, "Sat–Sun   08:00 → 16:00", "success");
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
            if (!stagingArea.includes(item)) {
              stagingArea.push(item);
              addLine(block, `${item} staged for commit`, "info");
            }
          } else {
            addLine(block, `fatal: '${item}' not found`, "error");
          }
        });

        break;
      } else if (action === "commit" && parts[2] === "-m") {
        const message = parts.slice(3).join(" ").replace(/"/g, "");
        if (stagingArea.length === 0) {
          addLine(block, "No changes added to commit", "warn");
          break;
        }
        const hash = Math.random().toString(16).slice(2, 9);
        addLine(block, `[main ${hash}] ${message}`, "success");
        addLine(
          block,
          `${stagingArea.length} file${stagingArea.length > 1 ? "s" : ""} changed, ${stagingArea.length} insertions${stagingArea.length > 1 ? "s" : ""}(+)`,
          "info",
        );
        stagingArea.forEach((item) => {
          addLine(block, `create mode 100644 ${item}`, "info");
        });
        stagingArea = [];
        break;
      } else if (action === "reset") {
        const items = parts.slice(2);

        items.forEach((item) => {
          const index = stagingArea.indexOf(item);
          if (index !== -1) {
            stagingArea.splice(index, 1);
            addLine(block, `${item} unstaged`, "info");
          } else {
            addLine(block, `'${item}' not staged`, "error");
          }
        });

        break;
      } else {
        addLine(
          block,
          `Usage: ${verb} <tool> (add | reset | commit -m)`,
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
  printBlock(block);
}

// INPUT EVENTS
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
    const pages = ["home", "beans", "equipment"];
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

// FOCUS INPUT
document
  .querySelector(".terminal")
  .addEventListener("click", () => input.focus());

// SUGGESTION BUTTONS
QUICK_CMDS.forEach((cmd) => {
  const suggestion = document.createElement("button");
  suggestion.className = "suggestion";
  suggestion.textContent = cmd;
  suggestion.addEventListener("click", () => {
    input.value = cmd;
    run(cmd);
    input.value = "";
    input.focus();
  });
  chipsE1.appendChild(suggestion);
});

// INIT
boot();
input.focus();
