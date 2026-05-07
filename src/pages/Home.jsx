//IMPORTS
import "../css/gui.css";
import Slideshow from "../components/Slideshow";
import Story from "../components/Story";
import Hours from "../components/Hours";

function Home() {
  return (
    <div className="window-container">
      <Slideshow />
      <Story />
      <Hours />
    </div>
  );
}

export default Home;
