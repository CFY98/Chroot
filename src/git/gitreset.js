// IMPORTS
import { addLine } from "../tools/utilities.js";
import { announce } from "../tools/announcer.js";
import service, { storage } from "../tools/storage.js";

// GIT RESET HELPERS
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

function itemGone(item, block) {
  const stagingArea = storage.get("stagingArea", {});
  const basketItems = storage.get("basketItems", []);
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
    itemGone(item, block);
  } else {
    addLine(block, `${item} unstaged`, "info");
    announce(
      `${stagingArea[item] > 0 ? stagingArea[item] : "no"} ${item}${stagingArea[item] > 1 ? "s" : ""} ${stagingArea[item] > 1 ? "are" : "is"} in the basket`,
    );
  }
}

function stageReset(block) {
  storage.remove("basketItems");
  storage.remove("stagingArea");
  storage.set("itemCount", 0);
  addLine(block, "All items unstaged", "info");
  announce("The basket is now empty");
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
    stageReset(block);
    return;
  }
  itemFromStage(items, block);
  storage.set("stagingArea", stagingArea);
}
