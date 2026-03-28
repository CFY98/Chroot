export function createBlock() {
    const block = document.createElement("div");
    return block;
}

export function addLine(block, text, cls = "") {
    const el = document.createElement("div");
    el.className = "line" + (cls ? " " + cls : "");
    el.textContent = text;
    block.append(el);
}

export function printBlock(block) {
    const output = document.getElementById("terminal-output");
    output.prepend(block);
    output.scrollTop = 0;
}

export function blank(block) {
    addLine(block, "", "blank");
}
