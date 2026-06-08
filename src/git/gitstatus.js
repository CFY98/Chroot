// IMPORTS

import { announce } from "../tools/announcer.js";
import { productPrices } from "../tools/assets.js";
import { storage } from "../tools/storage.js";
import { addLine, blank } from "../tools/utilities.js";

// GIT STATUS HELPERS
function stageEmpty(block) {
	addLine(block, "fatal: no items have been staged", "error");
	addLine(block, "hint: use 'git add <item>' to stage items ", "warn");
	announce("The basket is empty, try adding items to it");
}
function statusHeader(block) {
	addLine(block, "Items to be commited:", "info");
	blank(block);
	addLine(block, "  name         quantity       cost", "info");
	addLine(block, "  -------------------------------------", "info");
}

function showStage(block) {
	const stagingArea = storage.get("stagingArea", {});
	const stagedItems = Object.entries(stagingArea);
	const subTotal = stagedItems.reduce((sum, [key, value]) => {
		return sum + value * productPrices[key];
	}, 0);

	stagedItems.forEach(([item, quantity]) => {
		const price = productPrices[item] ?? "Out of Stock";
		addLine(
			block,
			`  ${item.padEnd(16)}${String(quantity).padEnd(12)}£${(quantity * price).toFixed(2)}`,
			"info",
		);
	});
	addLine(block, "  -------------------------------------", "info");
	addLine(
		block,
		`  total                       £${subTotal.toFixed(2)}`,
		"info",
	);
}

// GIT STATUS (CHECKS BASKET)
export function gitStatus({ block }) {
	const stagingArea = storage.get("stagingArea", {});
	const stagedItems = Object.entries(stagingArea);

	if (stagedItems.length === 0) {
		stageEmpty(block);
		return;
	}
	statusHeader(block);
	showStage(block);
	blank(block);
}
