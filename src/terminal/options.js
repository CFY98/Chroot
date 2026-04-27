// IMPORTS
import { blank, addLine, printBlock } from "../tools/utilities.js";
import { productPrices} from "../tools/assets.js";
import { announce } from "../tools/announcer.js";
import { storage } from "../tools/storage.js";
import { gitCmds } from "./git.js";
import { cdPages } from "./cd.js";

// TERMINAL OPTIONS
export function ls({ command, block }) {
  announce(
    "Type 'git', then add, followed by the item name to add it to the basket. Git, then reset, followed by the item name to removes it from the basket. To place orders, type 'git' followed by commit. To navigate, type 'cd' followed by the page name or use the buttons in the navigation bar. For more information, type about",
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
}

export function help({ command, block }) {
  announce(
    "Type 'git', then add, followed by the item name to add it to the basket. Git, then reset, followed by the item name to removes it from the basket. To place orders, type 'git' followed by commit. To navigate, type 'cd' followed by the page name or use the buttons in the navigation bar. For more information, type about",
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
}

export function cd({ command, verb, arg, block }) {
  if (!arg) {
    announce("Type 'ls' for all available pages");
    addLine(block, "hint: type 'ls' for all available pages", "warn");
    return;
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
}

export function about({ command, block }) {
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
}

export function hours({ command, block }) {
  announce(
    "  Chroot is open from Monday to Friday between 7am to 6pm and 8am to 4pm on the weekends",
  );
  addLine(block, `site@chroot ~/${command} $`, "success");
  blank(block);
  addLine(block, "  Mon–Fri   07:00 → 18:00", "info");
  addLine(block, "  Sat–Sun   08:00 → 16:00", "info");
  blank(block);
}

export function git({ command, parts, verb, block }) {
  const action = parts[1];
  const items = parts.slice(2);

  const stagingArea = storage.get("stagingArea", {});
  const basketItems = storage.get("basketItems", []);
  const orderNumber = storage.get("orderNumber", []);
  const orderMessage = storage.get("orderMessage", []);
  const committed = storage.get("committed", {});

  if (action in gitCmds) {
    gitCmds[action]({
      items,
      block,
      stagingArea,
      basketItems,
      productPrices,
      orderNumber,
      orderMessage,
      committed,
    });
  } else {
    announce(
      "Type git, then add, followed by the item name to add it or ,'--all', or ,'-A', to add one of each item to the basket. Git, then reset, followed by the item name to remove it or type ,'--hard', to remove everything from the basket. To check the basket, type git followed by 'status'. To checkout, type git followed by 'commit' and should you want a note, type '-m' afterwards followed by a note of choice. To see the receipt, type git followed by 'log'.",
    );
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
  }
}

export function exit({ block }) {
  addLine(block, "There is no escaping good coffee", "warn");
  announcer("There is no escaping good coffee");
}

export function clear({ block }) {
  output.innerHTML = "";
  announce("The terminal window contents have been cleared");
  return;
}

export function sudo({ block }) {
  addLine(block, "Our coffee only comes in wholebean", "warn");
  announce("Out coffee only comes in wholebean");
}

export function rm({ block }) {
  addLine(block, "Permission denied. Admins only.", "error");
  announce("Permission denied, admins only");
}

// TERMINAL OPTIONS MAP
export const termOptions = {
  help: help,
  ls: ls,
  cd: cd,
  about: about,
  hours: hours,
  git: git,
  exit: exit,
  clear: clear,
  sudo: sudo,
  rm: rm,
};
