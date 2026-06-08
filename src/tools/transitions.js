// SCROLL EFFECTS
document.addEventListener("DOMContentLoaded", handleScroll);
document.addEventListener("scroll", handleScroll);
document.addEventListener("routeChange", handleScroll);

const observer = new MutationObserver(handleScroll);
observer.observe(document.body, { childList: true, subtree: true });

export function handleScroll() {
	const targets = document.querySelectorAll(".fadein");

	targets.forEach((target) => {
		if (target.getBoundingClientRect().top < window.innerHeight) {
			target.classList.add("visible");
		} else {
			target.classList.remove("visible");
		}
	});
}
