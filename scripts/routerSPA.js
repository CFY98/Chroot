// IMPORTS
import { router } from "./assets.js";

let activeBtn = null;

// NAV BUTTONS
document.querySelectorAll(".nav-btn").forEach((navBtn) => {
  navBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const page = `/${e.target.textContent.trim().toLowerCase()}`;
    history.pushState({}, "", page);
    router(page);

    if (activeBtn) activeBtn.classList.remove("active");
    navBtn.classList.add("active");
    activeBtn = navBtn;
  });
});

// TITLE BUTTON
const title = document.querySelector(".title");
title.addEventListener("click", (e) => {
  e.preventDefault();
  history.pushState({}, "", "/");
  router("/");
  document.querySelector(".nav-btn.active")?.classList.remove("active");
});

// TOGGLE
const toggle = document.querySelector(".titlebar-text");
toggle.addEventListener("click", (e) => {
  e.preventDefault();
  toggle.classList.toggle("active");

  if (toggle.classList.contains("active")) {
    toggle.dataset.text = "Toggle - TUI";
    toggle.dataset.hover = "Toggle - GUI";
  } else {
    toggle.dataset.text = "Toggle - GUI";
    toggle.dataset.hover = "Toggle - TUI";
  }

  document.querySelector(".nav-btn.active")?.classList.remove("active");

  if (window.location.pathname === "/tui") {
    history.pushState({}, "", "/");
    router("/");
  } else {
    history.pushState({}, "", "/tui");
    router("/tui");
  }
});

// POPSTATE
window.addEventListener("popstate", () => router(window.location.pathname));

// INIT
router(window.location.pathname);
