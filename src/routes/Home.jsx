//IMPORTS
import { useEffect } from "react";
import Hours from "../components/landing/Hours";
import Story from "../components/landing/Story";
import Slideshow from "../components/slideshow/Slideshow";
import { announce } from "../tools/announcer.js";

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
