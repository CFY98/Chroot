//IMPORTS
import styles from "../css/Slideshow.module.css";
import SlideCards from "./SlideCards";
import Arrows from "./Arrows";
import Dots from "./Dots";

function Slideshow() {
  return (
    <div className={styles.container}>
      <p id="tagline" className="fadein">
        Change the root of your trajectory with coffee
        <br />
      </p>
      <div id={styles.slideshow} className="fadein">
        <div className="list">
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
            src="/Images/cafebarjpg"
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
