//IMPORTS

import { announce } from "../tools/announcer.js";
import { basket } from "../tools/baskstate.js";
import service, { storage } from "../tools/storage.js";

export function incAmount(itemName) {
	const stagingArea = basket.stagArea();
	stagingArea[itemName] += 1;
	service.updItemCount(1);
	storage.set("stagingArea", stagingArea);
	announce(`${itemName} quantity increased to ${stagingArea[itemName]}`);
	return true;
}

export function decAmount(itemName) {
	const stagingArea = basket.stagArea();
	stagingArea[itemName] -= 1;
	service.updItemCount(-1);
	if (stagingArea[itemName] === 0) {
		if (Object.keys(stagingArea).length === 0) {
			announce("the basket is now empty");
			basket.resetBasket();
		}
		service.removeItem(itemName);
		announce(`${itemName} was completely removed from the basket`);
	} else {
		announce(`${itemName} quantity decreased to ${stagingArea[itemName]}`);
	}
	storage.set("stagingArea", stagingArea);
	return true;
}

export function remItem(itemName) {
	service.removeItem(itemName);
	announce(`${itemName} was completely removed from the basket`);
	return true;
}
