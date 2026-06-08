// IMPORTS
import { announce } from "../tools/announcer.js";
import { basket } from "../tools/baskstate.js";
import service, { storage } from "../tools/storage.js";

function genOrderNo() {
	const hash = Math.random().toString(16).slice(2, 9);
	const orderNumber = basket.orderNo();
	orderNumber.push(hash);
	storage.set("orderNumber", orderNumber);
	service.processOrder();
	announce(`The receipt for order ${hash} is now available to print`);
}

export function processOrder() {
	const stagingArea = basket.stagArea();
	if (Object.keys(stagingArea).length === 0) {
		announce("Add items to the basket to place an order");
		return false;
	}
	genOrderNo();
	return true;
}

export function clearBasket() {
	const stagingArea = basket.stagArea();
	if (Object.keys(stagingArea).length === 0) {
		announce("The basket is already empty");
		return false;
	}
	basket.resetBasket();
	announce("The basket has been cleared");
	return true;
}

export function removeCard(itemName) {
	const stagingArea = basket.stagArea();
	delete stagingArea[itemName];
	storage.set("stagingArea", stagingArea);
	announce(`${itemName} has been removed from the basket`);
	return true;
}
