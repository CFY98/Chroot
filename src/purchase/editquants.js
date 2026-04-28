// IMPORTS
import { announce } from "../tools/announcer.js";
import { router } from "../tools/routerSPA.js";
import service  from "../tools/storage.js";
import { basket } from "./baskstate.js";

// INCREASE, DECREASE, AND REMOVE CART ITEM
function incAmount({ cartItem, itemName, amount }) {
  const stagingArea = basket.stagArea();
  basket.updateItems(1, cartItem, itemName, amount);
  announce(`${itemName} quantity increased to ${stagingArea[itemName]}`);
  basket.updateTotal();
}

function decAmount({ product, cartItem, itemName, amount }) {
  const stagingArea = basket.stagArea();
  const basketItems = basket.baskItems();
  basket.updateItems(-1, cartItem, itemName, amount);
  if (stagingArea[itemName] === 0) {
    service.removeItem(cartItem, itemName);
    announce(` ${itemName} was completely removed from the basket`);
    if (basketItems.length === 0) {
      announce("the basket is now empty");
      basket.emptyBasket(product);
    }
    basket.updateTotal();
  } else {
    announce(`${itemName} quantity decreased to ${stagingArea[itemName]}`);
    basket.updateTotal();
  }
}

export function remItem({ product, cartItem, itemName }) {
  service.removeItem(cartItem, itemName);
  announce(` ${itemName} was completely removed from the basket`);
  basket.updateTotal();
  basket.emptyBasket(product);
}
export const basketDom = {
  "plus-btn": incAmount,
  "minus-btn": decAmount,
};
