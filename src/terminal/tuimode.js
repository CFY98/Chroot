// IMPORTS
import { router } from "../tools/routerSPA.js";

// TUI MODE VARIABLE
export let tuiMode = false;

// TOGGLE BUTTON
const toggle = document.querySelector(".titlebar-text");
toggle.addEventListener("click", (e) => {
  e.preventDefault();
  toggle.classList.toggle("active");

  if (toggle.classList.contains("active")) {
    toggle.dataset.text = "Terminal Mode";
    toggle.dataset.hover = "Change: Visual Mode";
  } else {
    toggle.dataset.text = "Visual Mode";
    toggle.dataset.hover = "Change: Terminal Mode";
  }

  tuiMode = !tuiMode;
  tMode(tuiMode);
  document.querySelector(".nav-btn.active")?.classList.remove("active");
});

export function tMode(tuiMode) {
  if (!tuiMode) {
    history.pushState({}, "", "/");
    router("/");
  } else {
    history.pushState({}, "", "/terminal");
    router("/terminal");
  }
}
