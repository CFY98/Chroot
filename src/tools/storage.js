// IMPORTS
import { announce } from "./announcer.js";

// QUANTIFIER STATE OBJECT
export let toAdd = {};

// LOCAL STORAGE OBJECTS AND ARRAYS
export class storageService {
  constructor() {
    this.cache = {};
  }
  get(key, fallback) {
    if (!(key in this.cache)) {
      const raw = localStorage.getItem(key);
      this.cache[key] = raw ? JSON.parse(raw) : fallback;
    }
    return this.cache[key];
  }
  set(key, value) {
    this.cache[key] = value;
    localStorage.setItem(key, JSON.stringify(value));
  }
  remove(key) {
    delete this.cache[key];
    localStorage.removeItem(key);
  }
}

export class orderService {
  constructor(storage) {
    this.storage = storage;
  }
  updItemCount(delta) {
    const prev = parseInt(this.storage.get("itemCount", 0));
    storage.set("itemCount", prev + delta);
  }
  processOrder() {
    const basketItems = this.storage.get("basketItems", []);
    const stagingArea = this.storage.get("stagingArea", {});

    const committed = this.storage.get("committed", {});
    Object.assign(committed, stagingArea);
    const purchased = this.storage.get("purchased", []).concat(basketItems);

    this.storage.set("purchased", purchased);
    this.storage.set("committed", committed);

    this.storage.remove("basketItems");
    this.storage.remove("stagingArea");
    this.storage.set("itemCount", 0);
  }
  removeItem(cartItem, itemName) {
    const stagingArea = this.storage.get("stagingArea", {});
    const itemQty = stagingArea[itemName] || 1;
    const count = parseInt(this.storage.get("itemCount", 0));
    announce(`${itemName} was completely removed from the basket`);

    delete stagingArea[itemName];
    const basketItems = this.storage.get("basketItems", []);
    const itemIndex = basketItems.findIndex((i) => i === itemName);

    if (itemIndex !== -1) basketItems.splice(itemIndex, 1);
    this.storage.set("basketItems", basketItems);
    this.storage.set("stagingArea", stagingArea);
    this.storage.set("itemCount", count - itemQty);
    cartItem.remove();
  }
}

export const storage = new storageService();
export default new orderService(storage);
