//IMPORTS

import { useEffect } from "react";
import ProductCard from "../components/product/ProductCard";
import Subtitle from "../components/ui/Subtitle";
import Title from "../components/ui/Title";
import styles from "../css/product/Catalogue.module.css";
import { announce } from "../tools/announcer.js";

function Beans() {
	useEffect(() => {
		announce("The Beans page has loaded");
	}, []);

	return (
		<>
			<Title title="Coffee Beans" />
			<div className={styles["product-wrapper"]}>
				<Subtitle subtitle="Please browse our selection of coffee beans" />
				<div className={styles.products}>
					<ProductCard
						src="/Images/blaze.jpg"
						alt="Coffee beans called Blaze."
						arialabel="More information on Blaze."
						path="/blaze"
						itemName="Blaze (200g)"
						itemPrice="£11.99"
					/>
					<ProductCard
						src="/Images/sunshine.jpg"
						alt="Coffee beans called Sunshine."
						arialabel="More information on Sunshine."
						path="/sunshine"
						itemName="Sunshine (200g)"
						itemPrice="£14.99"
					/>
					<ProductCard
						src="/Images/summit.jpg"
						alt="Coffee beans called Summit."
						arialabel="More information on Summit."
						path="/summit"
						itemName="Summit (150g)"
						itemPrice="£19.99"
					/>
				</div>
			</div>
		</>
	);
}

export default Beans;
