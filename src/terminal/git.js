// IMPORTS
import { addLine } from "../tools/utilities.js";
import { announce } from "../tools/announcer.js";
import { router } from "../tools/routerSPA.js";
import service, { storage } from "../tools/storage.js";
import { gitAdd } from "../git/gitadd.js";
import { gitReset } from "../git/gitreset.js";
import { gitStatus } from "../git/gitstatus.js";

function noLog(block) {
  const stagingArea = storage.get("stagingArea", {});
  const stagedItems = Object.keys(stagingArea);
  addLine(block, "fatal: nothing added to commit", "error");
  addLine(block, "hint: use 'git status' to track changes", "warn");
  announce("No order was placed since there were no items in the basket");
}

function logMessage(elements, data) {
  const { items, block } = elements;
  const { message, hash } = data;
  const stagingArea = storage.get("stagingArea", {});
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
}

function pushOrder(data) {
  const { message, hash } = data;
  const orderNumber = storage.get("orderNumber", []);
  const orderMessage = storage.get("orderMessage", []);
  orderNumber.push(hash);
  storage.set("orderNumber", orderNumber);
  orderMessage.push(message);
  storage.set("orderMessage", orderMessage);
  service.processOrder();
}

function itemToLog(block) {
  const stagingArea = storage.get("stagingArea", {});
  const stagedItems = Object.keys(stagingArea);
  stagedItems.forEach((item) => {
    addLine(
      block,
      `create mode 100644 ${item} ${stagingArea[item] > 1 ? `x${stagingArea[item]}` : ""}`,
      "info",
    );
  });
}

// GIT COMMIT (CHECKOUT ORDER)
export function gitCommit({ items, block }) {
  const message = items.slice(1).join(" ").replace(/"/g, "");
  const stagingArea = storage.get("stagingArea", {});
  const stagedItems = Object.keys(stagingArea);
  const hash = Math.random().toString(16).slice(2, 9);

  if (stagedItems.length === 0) {
    noLog(block);
    return;
  }
  const elements = { items, block };
  const data = { message, hash };

  logMessage(elements, data);
  itemToLog(block);
  pushOrder(data);
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
