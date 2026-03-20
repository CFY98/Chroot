// IMPORTS
import { routesAnnouncements, announce } from "./announcer.js";
import { initSlideshow } from "./slideshow.js";
import { routes, tMode } from "./assets.js";

// ROUTER FUNCTION
const homeContent = document.getElementById("app").innerHTML;

export function router(page) {
  const screenContent = document.getElementById("app");
  const route = routes[page];

  screenContent.replaceChildren();

  if (page === "/") {
    screenContent.innerHTML = homeContent;
    announce("The home page has loaded");
    initSlideshow();
    return;
  }

  if (!route) {
    screenContent.innerHTML = "<p>404 - Page not found.</p>";
    return;
  }

  fetch(route.path)
    .then((res) => res.text())
    .then((html) => {
      screenContent.innerHTML = html;
      if (page in routesAnnouncements) routesAnnouncements[page]();
    })
    .catch(() => {
      screenContent.innerHTML = "<p>404 - Page not found.</p>";
    });
}

// NAV BUTTONS
let activeBtn = null;

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

// TUI MODE VARIABLE
export let tuiMode = false;

// TOGGLE
const toggle = document.querySelector(".titlebar-text");
toggle.addEventListener("click", (e) => {
  e.preventDefault();
  toggle.classList.toggle("active");

  if (toggle.classList.contains("active")) {
    toggle.dataset.text = "Mode: TUI";
    toggle.dataset.hover = "Change: GUI";
  } else {
    toggle.dataset.text = "Mode: GUI";
    toggle.dataset.hover = "Change: TUI";
  }

  tuiMode = !tuiMode;
  tMode(tuiMode);
  document.querySelector(".nav-btn.active")?.classList.remove("active");
});

// TITLE BUTTON
const title = document.getElementById("title");
title.addEventListener("click", (e) => {
  e.preventDefault();

  tMode(tuiMode);
});

// PRODUCT PAGES
document.addEventListener("click", (e) => {
  if (e.target.matches(".more [data-link]")) {
    e.preventDefault();
    const page = e.target.getAttribute("href");
    history.pushState({}, "", page);
    announce(`the ${page} has loaded`);
    router(page);
  }
});

// POPSTATE
window.addEventListener("popstate", () => router(window.location.pathname));

// INIT
router(window.location.pathname);
