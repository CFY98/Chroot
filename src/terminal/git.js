// IMPORTS
import { addLine, blank } from "../tools/utilities.js";
import { announce } from "../tools/announcer.js";
import { router } from "../tools/routerSPA.js";
import service, { storage } from "../tools/storage.js";
import { gitAdd } from "../git/gitadd.js";

function emptyDel(items, block) {
  if (items.length === 0) {
    addLine(block, "Nothing specified, nothing removed", "info");
    addLine(block, "hint: specifiy the item you want to remove", "warn");
    announce("specify the items you want to remove from the basket");
    return;
  }
}

function itemToZero(item) {
  const basketItems = storage.get("basketItems", []);
  const itemIndex = basketItems.findIndex((i) => i === item);
  if (itemIndex !== -1) basketItems.splice(itemIndex, 1);
}

function emptyStage(item) {
  const stagingArea = storage.get("stagingArea", {});
  const itemQty = stagingArea[item] || 1;
  delete stagingArea[item];

  itemToZero(item);

  service.updItemCount(itemQty);

  storage.set("basketItems", basketItems);
  storage.set("stagingArea", stagingArea);
  addLine(block, `${item} was unstaged`, "info");
  announce(`${item} was completely removed from the basket`);
}

function noneStaged(item, block) {
  const stagingArea = storage.get("stagingArea", {});

  if (stagingArea[item] === 0) {
    empytStage(item);
  } else {
    addLine(block, `${item} unstaged`, "info");
    announce(
      `${stagingArea[item] > 0 ? stagingArea[item] : "no"} ${item}${stagingArea[item] > 1 ? "s" : ""} ${stagingArea[item] > 1 ? "are" : "is"} in the basket`,
    );
  }
}

function itemFromStage(items, block) {
  const stagingArea = storage.get("stagingArea", {});
  items.forEach((item) => {
    if (stagingArea[item]) {
      stagingArea[item] -= 1;

      service.updItemCount(-1);
      noneStaged(item, block);
    } else {
      addLine(block, `'${item}' not staged`, "error");
      announce(`${item} was not in the basket so nothing was removed`);
    }
  });
}

// GIT RESET (REMOVE ITEMS FROM BASKET)
export function gitReset({ items, block }) {
  const stagingArea = storage.get("stagingArea", {});
  const reset = items[0]?.replace(/^-+/, "");
  if (!reset) {
    emptyDel(items, block);
    return;
  }
  if (reset === "hard") {
    storage.remove("basketItems");
    storage.remove("stagingArea");
    storage.set("itemCount", 0);
    addLine(block, "All items unstaged", "info");
    announce("The basket is now empty");
    return;
  }
  itemFromStage(items, block);
  storage.set("stagingArea", stagingArea);
}

// GIT STATUS (CHECKS BASKET)
export function gitStatus({ stagingArea, productPrices, block }) {
  const stagedItems = Object.entries(stagingArea);
  let subTotal = stagedItems.reduce((sum, [key, value]) => {
    return sum + value * productPrices[key];
  }, 0);

  if (stagedItems.length === 0) {
    addLine(block, "fatal: no items have been staged", "error");
    addLine(block, "hint: use 'git add <item>' to stage items ", "warn");
    announce("The basket is empty, try adding items to it");
    return;
  }
  addLine(block, "Items to be commited:", "info");
  blank(block);
  addLine(block, "  name         quantity       cost", "info");
  addLine(block, "  -------------------------------------", "info");
  stagedItems.forEach(([item, quantity]) => {
    const price = productPrices[item] ?? "Out of Stock";
    addLine(
      block,
      `  ${item.padEnd(16)}${String(quantity).padEnd(12)}£${(quantity * price).toFixed(2)}`,
      "info",
    );
  });
  addLine(block, "  -------------------------------------", "info");
  addLine(
    block,
    `  total                       £${subTotal.toFixed(2)}`,
    "info",
  );
  blank(block);
}

// GIT COMMIT (CHECKOUT ORDER)
export function gitCommit({
  items,
  stagingArea,
  orderNumber,
  orderMessage,
  block,
}) {
  const message = items.slice(1).join(" ").replace(/"/g, "");
  const stagedItems = Object.keys(stagingArea);

  if (stagedItems.length === 0) {
    addLine(block, "fatal: nothing added to commit", "error");
    addLine(block, "hint: use 'git add' to track changes", "warn");
    announce("No order was placed since there were no items in the basket");
    return;
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
      `create mode 100644 ${item} ${stagingArea[item] > 1 ? `x${stagingArea[item]}` : ""}`,
      "info",
    );
  });
  orderNumber.push(hash);
  storage.set("orderNumber", orderNumber);
  orderMessage.push(message);
  storage.set("orderMessage", orderMessage);
  service.processOrder();
}

// GIT LOG (RECIEPT GENERATION)
export function gitLog({ block, committed }) {
  if (Object.keys(committed).length === 0) {
    announce("No order was placed since there were no items in the basket");
    addLine(block, "fatal: there are no commits yet", "error");
    addLine(block, "hint: use 'git commit' first", "warn");
    return;
  }
  setTimeout(() => {
    window.history.pushState({}, "", "/receipt");
    router("/receipt");
  }, 100);
}

// GIT COMMANDS
export const gitCmds = {
  add: gitAdd,
  reset: gitReset,
  status: gitStatus,
  commit: gitCommit,
  log: gitLog,
};
