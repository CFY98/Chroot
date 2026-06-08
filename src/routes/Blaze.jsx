//IMPORTS

import { useState } from "react";
import Counter from "../components/basket/Counter";
import BeanStats from "../components/product/BeanStats";
import Title from "../components/ui/Title";
import Toastbox from "../components/ui/Toastbox";
import styles from "../css/product/CatWrapper.module.css";

function Blaze() {
	const [toast, setToast] = useState(null);
	return (
		<>
			<Title title="Blaze" />
			<div className={`${styles["catalogue-wrapper"]} fadein`}>
				<div className={styles["catalogue-container"]}>
					<div className={styles["catalogue-item"]}>
						<img
							src="/Images/blaze.jpg"
							alt="Picture of the coffee beans called Blaze."
						/>
					</div>
					<BeanStats
						origin="Huila, Columbia"
						varietal="Pink Bourbon"
						altitude="1,600 — 1,900m"
						process="Washed"
						roast="Light"
						harvest="March — June"
						notes="Melon, Lemonade, Peach"
						quantity="200g"
						price="£11.99"
					/>
				</div>
				<Counter itemName="blaze" setToast={setToast} />
				{toast && (
					<Toastbox
						itemName={toast.itemName}
						count={toast.count}
						clearToast={() => setToast(null)}
					/>
				)}
			</div>
		</>
	);
}
export default Blaze;
