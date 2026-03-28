// IMPORTS
import { announce } from "./announcer.js";

// LOCAL STORAGE OBJECTS AND ARRAYS
export class storageService {
    get(key, fallback) {
        return JSON.parse(
            localStorage.getItem(key) || JSON.stringify(fallback),
        );
    }
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
    remove(key) {
        localStorage.removeItem(key);
    }
}

export class orderService {
    constructor(storage) {
        this.storage = storage;
    }
    processOrder() {
        const basketItems = this.storage.get("basketItems", []);
        const stagingArea = this.storage.get("stagingArea", {});

        this.storage.set("purchased", basketItems);
        this.storage.set("committed", stagingArea);

        this.storage.remove("basketItems");
        basketItems.length = 0;
        this.storage.remove("stagingArea");
        for (let key in stagingArea) delete stagingArea[key];
        this.storage.set("itemCount", 0);
    }
    removeItem(itemName, cartItem) {
        const stagingArea = this.storage.get("stagingArea", {});
        const itemQty = stagingArea[itemName] || 1;
        const count = parseInt(this.storage.get("itemCount") || 0);
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
