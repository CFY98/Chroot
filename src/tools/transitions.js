// SCROLL EFFECTS
document.addEventListener("scroll", function () {
  const pageTop = window.scrollY;
  const pageBottom = pageTop + window.innerHeight;
  const targets = document.querySelectorAll(".fadein");

  for (let i = 0; i < targets.length; i++) {
    const target = targets[i];
    if (target.getBoundingClientRect().top + window.scrollY < pageBottom) {
      target.classList.add("visible");
    } else {
      target.classList.remove("visible");
    }
  }
});
