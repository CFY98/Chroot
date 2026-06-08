// IMPORTS

import { announce } from "../tools/announcer.js";
import service, { storage } from "../tools/storage.js";
import { addLine } from "../tools/utilities.js";

// GIT COMMIT HELPERS
function noLog(block) {
	addLine(block, "fatal: nothing added to commit", "error");
	addLine(block, "hint: use 'git status' to track changes", "warn");
	announce("No order was placed since there were no items in the basket");
}

function logMessage(message, hash, block) {
	const stagingArea = storage.get("stagingArea", {});
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
}

function pushOrder(message, hash) {
	const orderNumber = storage.get("orderNumber", []);
	const orderMessage = storage.get("orderMessage", []);
	orderNumber.push(hash);
	storage.set("orderNumber", orderNumber);
	orderMessage.push(message);
	storage.set("orderMessage", orderMessage);
	service.processOrder();
}

function itemToLog(block) {
	const stagingArea = storage.get("stagingArea", {});
	const stagedItems = Object.keys(stagingArea);
	stagedItems.forEach((item) => {
		addLine(
			block,
			`create mode 100644 ${item} ${stagingArea[item] > 1 ? `x${stagingArea[item]}` : ""}`,
			"info",
		);
	});
}

// GIT COMMIT (CHECKOUT ORDER)
export function gitCommit({ items, block }) {
	const message = items.slice(1).join(" ").replace(/"/g, "");
	const stagingArea = storage.get("stagingArea", {});
	const stagedItems = Object.keys(stagingArea);
	const hash = Math.random().toString(16).slice(2, 9);

	if (stagedItems.length === 0) {
		noLog(block);
		return;
	}

	logMessage(message, hash, block);
	itemToLog(block);
	pushOrder(message, hash);
}
