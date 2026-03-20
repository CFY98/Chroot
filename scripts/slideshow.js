export function initSlideshow() {
  const slideshow = document.getElementById("slideshow");
  if (!slideshow) return;
  const list = slideshow.querySelector(".list");
  let items = slideshow.querySelectorAll(".list figure");
  const dots = document.querySelectorAll(".dots li");
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");

  let active = 1;
  let autoSlideInterval;
  let slideWidth;

  const firstClone = items[0].cloneNode(true);
  const lastClone = items[items.length - 1].cloneNode(true);

  list.appendChild(firstClone);
  list.insertBefore(lastClone, items[0]);

  items = document.querySelectorAll("#slideshow .list figure");

  function setInitialPosition() {
    slideWidth = items[0].offsetWidth;
    list.style.transition = "none";
    list.style.transform = `translateX(-${active * slideWidth}px)`;
  }
  setInitialPosition();

  window.addEventListener("resize", setInitialPosition);

  next.onclick = () => moveToSlide(active + 1);
  prev.onclick = () => moveToSlide(active - 1);

  function moveToSlide(index) {
    active = index;
    slideWidth = items[0].offsetWidth;
    list.style.transition = "transform 0.4s ease-in-out";
    list.style.transform = `translateX(-${active * slideWidth}px)`;

    let realIndex = (active - 1 + dots.length) % dots.length;

    updateDots(realIndex);

    resetAutoSlide();
  }

  list.addEventListener("transitionend", () => {
    if (!items[active]) return;
    if (items[active].isSameNode(firstClone)) {
      list.style.transition = "none";
      active = 1;
      list.style.transform = `translateX(-${active * slideWidth}px)`;
    } else if (items[active].isSameNode(lastClone)) {
      list.style.transition = "none";
      active = items.length - 2;
      list.style.transform = `translateX(-${active * slideWidth}px)`;
    }
  });

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      moveToSlide(active + 1);
    }, 3000);
  }
  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }
  startAutoSlide();

  dots.forEach((li, key) => {
    li.addEventListener("click", function () {
      moveToSlide(key + 1);
    });
  });

  function updateDots(index) {
    if (!dots.length) return;
    index = (index + dots.length) % dots.length;

    slideshow.querySelector(".dots li.active")?.classList.remove("active");
    dots[index].classList.add("active");
  }

  updateDots(0);
}
