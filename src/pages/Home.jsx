//IMPORTS
import { useEffect } from "react";
import { announce } from "../tools/announcer.js";
import Slideshow from "../components/Slideshow";
import Story from "../components/Story";
import Hours from "../components/Hours";

function Home() {
  useEffect(() => {
    announce("The Home page has loaded");
  }, []);

  return (
    <div className="window-container">
      <Slideshow />
      <Story />
      <Hours />
    </div>
  );
}

export default Home;
