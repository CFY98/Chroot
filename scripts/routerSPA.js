// IMPORTS
import { routesAnnouncements } from "./announcer.js";
import { initSlideshow } from "./slideshow.js";
import { routes } from "./assets.js";
import { announce } from "./announcer.js";

// ROUTER FUNCTION
let homeContent = null;

export function router(page) {
  const screenContent = document.getElementById("app");
  const route = routes[page];

  if (!homeContent) {
    homeContent = screenContent.innerHTML;
  }

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
