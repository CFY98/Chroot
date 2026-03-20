// get elements from the css file.
const list = document.querySelector("#slideshow .list");
let items = document.querySelectorAll("#slideshow .list figure");
const dots = document.querySelectorAll("#slideshow .dots li");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

// slideshow has 3 slies total.
const totalSlides = items.length;
// define the present slide with the class active from css.
let active = 0;

// autoslide right every 3 seconds.
let refreshSlider = setInterval(() => {
  next.click();
}, 3000);

function resetSliderInterval() {
  clearInterval(refreshSlider);
  refreshSlider = setInterval(() => {
    next.click();
  }, 3000);
}

// define what happens when you press the prev button.
prev.onclick = function () {
  if (active - 1 < 0) {
    active = totalSlides - 1;
  } else {
    active--;
  }
  currentSlide();
  resetSliderInterval();
};

// define what happens when you press the next button.
next.onclick = function () {
  if (active + 1 >= totalSlides) {
    active = 0;
  } else {
    active++;
  }
  currentSlide();
  resetSliderInterval();
};

// define current slide.
function currentSlide() {
  let checkLeft = items[active].offsetLeft;
  list.style.transform = `translateX(-${checkLeft}px)`;
  list.style.transition = "transform 0.5s ease-in-out";

  // make the dots correspond with the 'active' class in css for the width transition.
  let activeDot = document.querySelector("#slideshow .dots li.active");
  if (activeDot) activeDot.classList.remove("active");
  dots[active].classList.add("active");
}

// define what happens when the dots are pressed. Key being the index of the element.
dots.forEach((li, key) => {
  li.addEventListener("click", function () {
    active = key;
    currentSlide();
    resetSliderInterval();
  });
});

//get the current slide working.
currentSlide();
