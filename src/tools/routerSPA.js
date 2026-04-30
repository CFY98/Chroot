// IMPORTS
import { announce, uiAnnounce } from "./announcer.js";
import { initSlideshow } from "./slideshow.js";
import { routes } from "./assets.js";
import { tuiMode, tMode } from "../terminal/tuimode.js";

// ROUTER FUNCTION
const homeContent = document.getElementById("app").innerHTML;

function homePage(page, screenContent) {
  screenContent.innerHTML = homeContent;
  announce(`The ${routes[page].title} page has loaded`);
  initSlideshow();
}

function errorPage(screenContent) {
  screenContent.innerHTML = "<p>404 - Page not found.</p>";
  announce("404 error, page not found");
}

function renderPage(page, screenContent, route) {
  fetch(route.path)
    .then((res) => res.text())
    .then((html) => {
      screenContent.innerHTML = html;
      uiAnnounce(page);
    })
    .catch(() => {
      screenContent.innerHTML = "<p>404 - Page not found.</p>";
      announce("404 error, page not found");
    });
}

export function router(page) {
  const screenContent = document.getElementById("app");
  const route = routes[page];

  screenContent.replaceChildren();

  if (!route) {
    errorPage(screenContent);
    return;
  }

  if (page === "/") {
    homePage(page, screenContent);
    return;
  }
  renderPage(page, screenContent, route);
}

// NAV BUTTONS
let activeBtn = null;

document.querySelectorAll(".nav-btn").forEach((navBtn) => {
  navBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (navBtn.id === "title") return;
    const page = `/${e.target.textContent.trim().toLowerCase()}`;
    history.pushState({}, "", page);
    router(page);

    if (activeBtn) activeBtn.classList.remove("active");
    navBtn.classList.add("active");
    activeBtn = navBtn;
  });
});

// TITLE BUTTON
const title = document.getElementById("title");
title.addEventListener("click", (e) => {
  e.preventDefault();
  
  tMode(tuiMode);

  if (activeBtn) activeBtn.classList.remove("active");
  title.classList.add("active");
  activeBtn = title;
});

// PRODUCT PAGES
document.addEventListener("click", (e) => {
  if (e.target.matches("a[data-link]")) {
    e.preventDefault();
    const page = e.target.getAttribute("href");
    history.pushState({}, "", page);
    router(page);
  }
});

// POPSTATE
window.addEventListener("popstate", () => router(window.location.pathname));

// INIT
router(window.location.pathname);
