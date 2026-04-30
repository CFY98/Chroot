// GLOBAL VARIABLES
let active = 1;
let autoSlideInterval;
let slideWidth;
let isTransitioning = false;

// SLIDESHOW HELPERS
// SLIDESHOW START POSITION
function setInitialPosition(slides, list) {
  slideWidth = slides[0].offsetWidth;
  list.style.transition = "none";
  list.style.transform = `translateX(-${active * slideWidth}px)`;
}

// CAPTIONS
function showCaption(slides) {
  slides.forEach((slide, i) => {
    const caption = slide.querySelector(".slidecaption");
    if (!caption) return;
    if (i === active) caption.classList.add("show");
  });
}

// DOTS LOGIC
function updateDots(dots, index) {
  if (!dots.length) return;
  index = (index + dots.length) % dots.length;

  document.querySelector(".dots li.active")?.classList.remove("active");
  dots[index].classList.add("active");
}

function clickDots(list, slides, dots) {
  dots.forEach((li, key) => {
    li.addEventListener("click", function () {
      moveToSlide(key + 1, list, slides, dots);
      resetAutoSlide(list, slides, dots);
    });
  });
}

// AUTOSLIDE LOGIC
function autoSlideTimer(list, slides, dots) {
  autoSlideInterval = setInterval(() => {
    moveToSlide(active + 1, list, slides, dots);
  }, 3000);
}

function updateSlide(slides, realIndex) {
  slides.forEach((slide, i) => {
    const caption = slide.querySelector(".slidecaption");
    if (!caption) return;
    if (i === realIndex + 1) {
      caption.classList.add("show");
    } else {
      setTimeout(() => {
        caption.classList.remove("show");
      }, 300);
    }
  });
}

function moveToSlide(index, list, slides, dots) {
  active = index;
  slideWidth = slides[0].offsetWidth;
  list.style.transition = "transform 0.4s ease-in-out";
  list.style.transform = `translateX(-${active * slideWidth}px)`;

  let realIndex = (active - 1 + dots.length) % dots.length;

  updateDots(dots, realIndex);
  updateSlide(slides, realIndex);
}

// INTERVAL RESETTER
function resetAutoSlide(list, slides, dots) {
  clearInterval(autoSlideInterval);
  autoSlideTimer(list, slides, dots);
}

// SLIDESHOW CLONE CHECKER
function checkIndex(list, slides, dots) {
  list.addEventListener("transitionend", (e) => {
    if (e.propertyName !== "transform") return;
    if (active >= slides.length - 1) {
      list.style.transition = "none";
      active = 1;
      list.style.transform = `translateX(-${active * slideWidth}px)`;
      updateDots(dots, 0);
    } else if (active <= 0) {
      list.style.transition = "none";
      active = slides.length - 2;
      list.style.transform = `translateX(-${active * slideWidth}px)`;
      updateDots(dots, slides.length - 3);
    }
  });
}

// NAVIGATION HANDLERS
function nextButton(list, slides, dots, next) {
  next.onclick = () => {
    moveToSlide(active + 1, list, slides, dots);
    resetAutoSlide(list, slides, dots);
  };
}
function prevButton(list, slides, dots, prev) {
  prev.onclick = () => {
    moveToSlide(active - 1, list, slides, dots);
    resetAutoSlide(list, slides, dots);
  };
}

// MAIN SLIDESHOW
export function initSlideshow() {
  const slideshow = document.getElementById("slideshow");
  if (!slideshow) return;
  const list = slideshow.querySelector(".list");
  let slides = slideshow.querySelectorAll(".list figure");
  const dots = document.querySelectorAll(".dots li");
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");

  // CLONES
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);

  list.appendChild(firstClone);
  list.insertBefore(lastClone, slides[0]);

  slides = slideshow.querySelectorAll(".list figure");

  // SLIDE STARTING POSITION
  setInitialPosition(slides, list);

  // FIRST CAPTION
  showCaption(slides);

  window.addEventListener("resize", setInitialPosition);

  // ARROW BUTTONS
  nextButton(list, slides, dots, next);
  prevButton(list, slides, dots, prev);

  // INITIAL AUTOSLIDE RENDER
  moveToSlide(active, list, slides, dots);

  // SLIDE INDEX RELATIVE TO CLONES
  checkIndex(list, slides, dots);

  // TIMER FOR AUTOSLIDE
  autoSlideTimer(list, slides, dots);

  clickDots(list, slides, dots);
  updateDots(dots, 0);
}
