export function initGUI() {
  const list = document.querySelector("#slideshow .list");
  let items = document.querySelectorAll("#slideshow .list figure");
  const dots = document.querySelectorAll("#slideshow .dots li");
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");

  const totalSlides = items.length;
  let active = 0;

  let refreshSlider = setInterval(() => {
    next.click();
  }, 3000);

  function resetSliderInterval() {
    clearInterval(refreshSlider);
    refreshSlider = setInterval(() => {
      next.click();
    }, 3000);
  }

  prev.onclick = function () {
    if (active - 1 < 0) {
      active = totalSlides - 1;
    } else {
      active--;
    }
    currentSlide();
    resetSliderInterval();
  };

  next.onclick = function () {
    if (active + 1 >= totalSlides) {
      active = 0;
    } else {
      active++;
    }
    currentSlide();
    resetSliderInterval();
  };

  function currentSlide() {
    let checkLeft = items[active].offsetLeft;
    list.style.transform = `translateX(-${checkLeft}px)`;
    list.style.transition = "transform 0.5s ease-in-out";

    let activeDot = document.querySelector("#slideshow .dots li.active");
    if (activeDot) activeDot.classList.remove("active");
    dots[active].classList.add("active");
  }

  dots.forEach((li, key) => {
    li.addEventListener("click", function () {
      active = key;
      currentSlide();
      resetSliderInterval();
    });
  });

  currentSlide();
}
