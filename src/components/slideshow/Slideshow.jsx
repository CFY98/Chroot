//IMPORTS
import { useEffect, useRef } from "react";
import styles from "../../css/Slideshow.module.css";
import SlideCards from "./SlideCards";
import Arrows from "./Arrows";
import Dots from "./Dots";
import { cleanupSlideshow, initSlideshow } from "../../tools/slideshow";

function Slideshow() {
  const initialised = useRef(false);
  useEffect(() => {
    if (initialised.current) return () => cleanupSlideshow();
    initialised.current = true;
    initSlideshow();
  }, []);

  return (
    <div className={styles["slideshow-container"]}>
      <p className={styles.tagline}>
        Change the root of your trajectory with coffee
        <br />
      </p>
      <div data-component="slideshow" className={`${styles.slideshow} fadein`}>
        <div data-component="list" className={styles.list}>
          <SlideCards
            src="/Images/coffee-roastery.jpg"
            alt="State-of-the-Art Roastery"
            caption="State-of-the-Art Roastery"
          />
          <SlideCards
            src="/Images/coffee-cherries.jpg"
            alt="Fresh Coffee Cherries from Source"
            caption="Producer-Led Partnerships"
          />
          <SlideCards
            src="/Images/cafebar.jpg"
            alt="Professionally trained barista preparing taster"
            caption="Taste-Tests Available"
          />
        </div>
        <Arrows />
        <Dots />
      </div>
      <p className={`${styles.info} fadein`}>
        Our drinks are made with some of the finest, single-origin coffees the
        world has to offer.
      </p>
    </div>
  );
}

export default Slideshow;
