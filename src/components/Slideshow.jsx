//IMPORTS
import SlideCards from "./SlideCards";

function Slideshow() {
  return (
    <div className="slideshow-container">
      <p id="tagline" className="fadein">
        Change the root of your trajectory with coffee
        <br />
      </p>
      <div id="slideshow" class="fadein">
        <div class="list">
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
      </div>
    </div>
  );
}

export default Slideshow;
