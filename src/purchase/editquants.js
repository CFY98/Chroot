// IMPORTS
import { announce } from "../tools/announcer.js";
import service  from "../tools/storage.js";
import { basket } from "./baskstate.js";

// INCREASE, DECREASE, AND REMOVE CART ITEM
function incAmount({ cartItem, itemName, amount }) {
  const stagingArea = basket.stagArea();
  basket.updateStage(1, cartItem, itemName, amount);
  announce(`${itemName} quantity increased to ${stagingArea[itemName]}`);
  basket.updateTotal();
}

function decAmount({ product, cartItem, itemName, amount }) {
  const stagingArea = basket.stagArea();
  const basketItems = basket.baskItems();
  basket.updateStage(-1, cartItem, itemName, amount);
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

function remItem({ product, cartItem, itemName }) {
  service.removeItem(cartItem, itemName);
  announce(` ${itemName} was completely removed from the basket`);
  basket.updateTotal();
  basket.emptyBasket(product);
}

const basketDom = {
  "plus-btn": incAmount,
  "minus-btn": decAmount,
};

export function basketHandler(e, product, cartItem, itemName, amount) {
  const editBasket = basketDom[e.target.className];
  if (editBasket) editBasket({ product, cartItem, itemName, amount });
  if (e.target.closest(".remove")) remItem({ product, cartItem, itemName });
}
