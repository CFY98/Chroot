//IMPORTS
import { useEffect } from "react";
import { announce } from "../tools/announcer.js";
import Slideshow from "../components/slideshow/Slideshow";
import Story from "../components/landing/Story";
import Hours from "../components/landing/Hours";

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
