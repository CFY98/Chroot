// IMPORTS
import { addLine, blank } from "../tools/utilities.js";
import { announce } from "../tools/announcer.js";
import { router } from "../tools/routerSPA.js";
import service, { storage } from "../tools/storage.js";
import { gitAdd } from "../git/gitadd.js";


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
