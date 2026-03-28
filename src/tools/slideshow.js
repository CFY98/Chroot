export function initSlideshow() {
    const slideshow = document.getElementById("slideshow");
    if (!slideshow) return;
    const list = slideshow.querySelector(".list");
    let slides = slideshow.querySelectorAll(".list figure");
    const dots = document.querySelectorAll(".dots li");
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");

    let active = 1;
    let autoSlideInterval;
    let slideWidth;

    // CLONES
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    list.appendChild(firstClone);
    list.insertBefore(lastClone, slides[0]);

    slides = slideshow.querySelectorAll(".list figure");

    // SLIDE STARTING POSITION
    function setInitialPosition() {
        slideWidth = slides[0].offsetWidth;
        list.style.transition = "none";
        list.style.transform = `translateX(-${active * slideWidth}px)`;
    }
    setInitialPosition();

    // FIRST CAPTION
    slides.forEach((slide, i) => {
        const caption = slide.querySelector(".slidecaption");
        if (!caption) return;
        if (i === active) caption.classList.add("show");
    });

    window.addEventListener("resize", setInitialPosition);

    // ARROW BUTTONS
    next.onclick = () => moveToSlide(active + 1);
    prev.onclick = () => moveToSlide(active - 1);

    // SLIDE TRANSITIONS AND DOTS MATCH
    function moveToSlide(index) {
        active = index;
        slideWidth = slides[0].offsetWidth;
        list.style.transition = "transform 0.4s ease-in-out";
        list.style.transform = `translateX(-${active * slideWidth}px)`;

        let realIndex = (active - 1 + dots.length) % dots.length;

        updateDots(realIndex);

        resetAutoSlide();

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

    // SLIDE INDEX RELATIVE TO CLONES
    list.addEventListener("transitionend", (e) => {
        if (e.propertyName !== "transform") return;
        if (active >= slides.length - 1) {
            list.style.transition = "none";
            active = 1;
            list.style.transform = `translateX(-${active * slideWidth}px)`;
            updateDots(0);
        } else if (active <= 0) {
            list.style.transition = "none";
            active = slides.length - 2;
            list.style.transform = `translateX(-${active * slideWidth}px)`;
            updateDots(slides.length - 3);
        }
    });

    // AUTOMATIC FUNCTIONS FOR SLIDES AND DOTS
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
