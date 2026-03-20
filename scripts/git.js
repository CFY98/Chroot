// IMPORTS
import {
  coffeeBeans,
  brewGear,
  stagingArea,
  basketItems,
  orderNumber,
  processOrder,
  prices,
  removeItem,
} from "./assets.js";
import { addLine, blank } from "./utilities.js";
import { announce } from "./announcer.js";
import { router } from "./routerSPA.js";

// GIT ADD (ADD ITEMS TO BASKET)
export function gitAdd({ items, stagingArea, basketItems, block }) {
  if (items.length === 0) {
    addLine(block, "hint: try specifying the item you want to add ", "warn");
    announce("No item was specified, so nothing was added to the basket");
    return;
  }

  items.forEach((item) => {
    if (coffeeBeans.includes(item) || brewGear.includes(item)) {
      stagingArea[item] = (stagingArea[item] || 0) + 1;
      localStorage.setItem("stagingArea", JSON.stringify(stagingArea));

      const prev = parseInt(localStorage.getItem("itemCount") || "0");
      localStorage.setItem("itemCount", prev + 1);

      if (!basketItems.includes(item)) {
        basketItems.push(item);
        localStorage.setItem("basketItems", JSON.stringify(basketItems));
      }

      addLine(block, `${item} staged for commit`, "info");
      announce(
        `${stagingArea[item]} ${item}${stagingArea[item] === 1 ? "" : "s"} ${stagingArea[item] > 1 ? "are" : "is"} in the basket`,
      );
    } else {
      addLine(block, `fatal: '${item}' not found`, "error");
      announce(` ${item} does not exist so it was not added to the basket`);
    }
  });
}

// GIT RESET (REMOVE ITEMS FROM BASKET)
export function gitReset({ items, stagingArea, basketItems, block }) {
  if (items[0]?.replace(/^-+/, "") === "hard") {
    localStorage.removeItem("basketItems");
    basketItems.length = 0;
    localStorage.removeItem("stagingArea");
    for (let key in stagingArea) delete stagingArea[key];
    localStorage.setItem("itemCount", "0");
    addLine(block, "All items unstaged", "info");
    return;
  }
  if (items.length === 0) {
    addLine(block, "hint: specifiy the item you want to remove", "warn");
    return;
  }

  items.forEach((item) => {
    if (stagingArea[item]) {
      stagingArea[item] -= 1;

      const prev = parseInt(localStorage.getItem("itemCount") || 0);
      localStorage.setItem("itemCount", prev - 1);

      if (stagingArea[item] === 0) {
        const itemQty = stagingArea[item] || 1;
        delete stagingArea[item];

        const itemIndex = basketItems.findIndex((i) => i === item);
        if (itemIndex !== -1) basketItems.splice(itemIndex, 1);

        localStorage.setItem("itemCount", prev - itemQty);
        localStorage.setItem("basketItems", JSON.stringify(basketItems));
        localStorage.setItem("stagingArea", JSON.stringify(stagingArea));
        addLine(block, `${item} was unstaged`, "info");
        announce(`${item} was completely removed from the basket`);
      }

      addLine(block, `${item} unstaged`, "info");
      announce(
        `${stagingArea[item] > 0 ? stagingArea[item] : "no"} ${item}${stagingArea[item] > 1 ? "s" : ""} ${stagingArea[item] > 1 ? "are" : "is"} in the basket`,
      );
    } else {
      addLine(block, `'${item}' not staged`, "error");
      announce(`${item} was not in the basket so nothing was removed`);
    }
    localStorage.setItem("stagingArea", JSON.stringify(stagingArea));
  });
}

// GIT STATUS (CHECKS BASKET)
export function gitStatus({ stagingArea, prices, block }) {
  const stagedItems = Object.entries(stagingArea);
  let subTotal = stagedItems.reduce((sum, [key, value]) => {
    return sum + value * prices[key];
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
    const price = prices[item] ?? "Out of Stock";
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
  basketItems,
  orderNumber,
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
    addLine(block, `create mode 100644 ${item} x${stagingArea[item]}`, "info");
  });
  orderNumber.push(hash);
  processOrder(orderNumber, basketItems, stagingArea);
}

// GIT LOG (RECIEPT GENERATION)
export function gitLog({ block }) {
  const committed = JSON.parse(localStorage.getItem("committed") || "{}");
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
