// IMPORTS
import { gitAdd } from "../git/gitadd.js";
import { gitCommit } from "../git/gitcommit.js";
import { gitReset } from "../git/gitreset.js";
import { gitStatus } from "../git/gitstatus.js";
import { announce } from "../tools/announcer.js";
import { storage } from "../tools/storage.js";
import { addLine } from "../tools/utilities.js";

// GIT LOG HELPER
function commitFirst(block) {
	announce("No order was placed since there were no items in the basket");
	addLine(block, "fatal: there are no commits yet", "error");
	addLine(block, "hint: use 'git commit' first", "warn");
}

// GIT LOG (RECIEPT GENERATION)
function gitLog({ block, navigate }) {
	const committed = storage.get("committed", {});
	if (Object.keys(committed).length === 0) {
		commitFirst(block);
		return;
	}
	setTimeout(() => {
		navigate("/receipt");
	}, 100);
}

// GIT COMMANDS
export const gitCmds = {
	add: gitAdd,
	reset: gitReset,
	status: gitStatus,
	commit: gitCommit,
	log: gitLog,
};
