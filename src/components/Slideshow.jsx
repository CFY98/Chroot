//IMPORTS
import SlideCards from "./SlideCards";
import ArrowButtons from "./ArrowButtons";
import Dots from "./Dots";

function Slideshow() {
  return (
    <div className="slideshow-container">
      <p id="tagline" className="fadein">
        Change the root of your trajectory with coffee
        <br />
      </p>
      <div id="slideshow" className="fadein">
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
        <ArrowButtons />
        <Dots />
      </div>
    </div>
  );
}

export default Slideshow;
