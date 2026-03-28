// IMPORTS
import { announce } from "./announcer.js";

// LOCAL STORAGE OBJECTS AND ARRAYS
export class Storage {
	constructor() {
		this.orderNumber = JSON.parse(
  localStorage.getItem("orderNumber") || "[]",
);
		this.orderMessage = JSON.parse(
  localStorage.getItem("orderMessage") || "[]",
);
		this.basketItems = JSON.parse(
  localStorage.getItem("basketItems") || "[]",
);
		this.stagingArea = JSON.parse(
  localStorage.getItem("stagingArea") || "{}",
);
		this.termHistory = JSON.parse(
  localStorage.getItem("termHistory") || "[]",
);
		this.purchased = JSON.parse(
  localStorage.getItem("purchased") || "[]",
);
		this.committed = JSON.parse(
  localStorage.getItem("committed") || "{}",
);
	}
	saveOrderNumber() {
		localStorage.setItem("orderNumber", JSON.stringify(this.orderNumber));
	}
	saveOrderMessage() {
		localStorage.setItem("orderMessage", JSON.stringify(this.orderMessage));
	}
	saveBasketItems() {
		localStorage.setItem("basketItems", JSON.stringify(this.basketItems));
	}
	saveStagingArea() {
		localStorage.setItem("stagingArea", JSON.stringify(this.stagingArea));
	}
	saveTermHistory(History) {
		localStorage.setItem("termHistory", JSON.stringify(History));
		this.termHistory = History;
	}
	savePurchased() {
		localStorage.setItem("purchased", JSON.stringify(this.basketItems));
	}
	saveCommitted() {
		localStorage.setItem("committed", JSON.stringify(this.stagingArea));
	}
	removeOrderNumber() {
		localStorage.removeItem("orderNumber");
		this.orderNumber.length = 0;
	}
	removeOrderMessage() {
		localStorage.removeItem("orderMessage");
		this.orderMessage.length = 0;
	}
	removeBasketItems() {
		localStorage.removeItem("basketItems");
		this.basketItems.length = 0;
	}
	removeStagingArea() {
		localStorage.removeItem("stagingArea");
		for (let key in this.stagingArea) delete this.stagingArea[key];
	}
	removePurchased() {
		localStorage.removeItem("purchased");
	}
	removeCommitted() {
		localStorage.removeItem("committed");
	}
	processOrder() {
		this.saveOrderNumber();
		this.saveOrderMessage();
		this.savePurchased();
		this.saveCommitted();

		this.removeBasketItems();
		this.removeStagingArea();
		localStorage.setItem("itemCount", 0);
 	}
 	removeItem(itemName, cartItem) {
		const itemQty = this.stagingArea[itemName] || 1;
		const prev = parseInt(localStorage.getItem("itemCount") || 0);
		announce(`${itemName} was completely removed from the basket`);

		delete this.stagingArea[itemName];
		const itemIndex = this.basketItems.findIndex((i) => i === itemName);
		if (itemIndex !== -1) this.basketItems.splice(itemIndex, 1);

		localStorage.setItem("itemCount", prev - itemQty);
		this.saveBasketItems();
		this.saveStagingArea();
		cartItem.remove();
 	}
}

export default new Storage();
