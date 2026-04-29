// IMPORTS
import { addLine } from "../tools/utilities.js";
import { announce } from "../tools/announcer.js";
import { router } from "../tools/routerSPA.js";
import { gitAdd } from "../git/gitadd.js";
import { gitReset } from "../git/gitreset.js";
import { gitStatus } from "../git/gitstatus.js";
import { gitCommit } from "../git/gitcommit.js";


// GIT LOG (RECIEPT GENERATION)
export function gitLog({ block, committed }) {
  if (Object.keys(committed).length === 0) {
    announce("No order was placed since there were no items in the basket");
    addLine(block, "fatal: there are no commits yet", "error");
    addLine(block, "hint: use 'git commit' first", "warn");
    return;
  }
  setTimeout(() => {
    window.history.pushState({}, "", "/receipt");
    router("/receipt");
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
