// IMPORTS
import { productPrices } from "../tools/assets.js";
import { addLine } from "../tools/utilities.js";
import { announce } from "../tools/announcer.js";
import service, { storage } from "../tools/storage.js";

// GIT ADD HELPERS
function emptyAdd(items, block) {
  if (items.length === 0) {
    addLine(block, "Nothing specified, nothing added", "info");
    addLine(block, "hint: try specifying the item you want to add ", "warn");
    announce("No item was specified, so nothing was added to the basket");
    return;
  }
}

function checkBasket(item) {
  const basketItems = storage.get("basketItems", []);
  if (!basketItems.includes(item)) basketItems.push(item);
  storage.set("basketItems", basketItems);
}

function addAll(products, block) {
  const stagingArea = storage.get("stagingArea", {});
  products.forEach((item) => {
    stagingArea[item] = (stagingArea[item] || 0) + 1;
    storage.set("stagingArea", stagingArea);

    checkBasket(item);
    service.updItemCount(1);

    addLine(block, `${item} staged for commit`, "info");
    announce("One of every item was added to the basket");
  });
  return;
}

function itemToStage(items, products, block) {
  const stagingArea = storage.get("stagingArea", {});
  items.forEach((item) => {
    if (products.includes(item)) {
      stagingArea[item] = (stagingArea[item] || 0) + 1;
      storage.set("stagingArea", stagingArea);

      checkBasket(item);
      service.updItemCount(1);

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

// GIT ADD (ITEMS TO BASKET)
export function gitAdd({ items, block }) {
  const all = items[0]?.replace(/^-+/, "");
  const products = Object.keys(productPrices);

  if (!all) {
    emptyAdd(items, block);
    return;
  }
  if (all.toLowerCase() === "all" || all.toUpperCase() === "A") {
    addAll(products, block);
    return;
  }
  itemToStage(items, products, block);
}
