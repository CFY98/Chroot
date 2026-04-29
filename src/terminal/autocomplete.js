// IMPORTS
import { announce } from "../tools/announcer.js";

// PRESSTAB HELPERS
function autoComp(pages, parts, input, index) {
  const query = parts[index];
  if (!query) return;

  const match = pages.find((p) => p.startsWith(query));
  if (!match) return;

  parts[index] = match;
  input.value = parts.join(" ");
  announce(`Autocompleted to ${input.value}`);
}
function cdComp({ parts, input, firstPart }) {
  const pages = [
    "beans",
    "equipment",
    "dripper",
    "filters",
    "grinder",
    "blaze",
    "sunshine",
    "summit",
  ];
  if (firstPart !== "cd") return;
  autoComp(pages, parts, input, 1);
}

function gitComp({ parts, input }) {
  const actionWords = ["add", "reset"];
  const productPages = [
    "dripper",
    "filters",
    "grinder",
    "blaze",
    "sunshine",
    "summit",
  ];
  const action = parts[1];
  const product = parts[2];
  if (action && !product) {
    autoComp(actionWords, parts, input, 1);
    return;
  }

  if (action === "add" || action === "reset") {
    if (parts.length >= 3) {
      autoComp(productPages, parts, input, parts.length - 1);
      return;
    }
    autoComp(productPages, parts, input, 2);
    return;
  }
}

export const pageMap = {
  cd: cdComp,
  git: gitComp,
};
