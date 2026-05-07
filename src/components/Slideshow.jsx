//IMPORTS
import styles from "../css/Slideshow.module.css";
import SlideCards from "./SlideCards";
import Arrows from "./Arrows";
import Dots from "./Dots";

function Slideshow() {
  return (
    <div className={styles["slideshow-container"]}>
      <p className={styles.tagline}>
        Change the root of your trajectory with coffee
        <br />
      </p>
      <div className={`${styles.slideshow} fadein`}>
        <div className={styles.list}>
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
    </div>
  );
}

export default Slideshow;
