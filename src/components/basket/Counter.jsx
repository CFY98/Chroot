//IMPORTS

import { useState } from "react";
import styles from "../../css/basket/Counter.module.css";
import { announce } from "../../tools/announcer.js";
import { productPrices } from "../../tools/assets.js";
import service, { storage } from "../../tools/storage.js";

function Counter({ itemName, setToast }) {
	const [count, setCount] = useState(1);

	function increase() {
		setCount((prev) => {
			const newCount = prev + 1;
			announce(`${itemName} quantity increased to ${newCount}`);
			return newCount;
		});
	}

	function decrease() {
		setCount((prev) => {
			const newCount = Math.max(1, prev - 1);
			announce(`${itemName} quantity decreased to ${newCount}`);
			return newCount;
		});
	}

	function setStage(productPrices, itemName) {
		const stagingArea = storage.get("stagingArea", {});
		if (Object.hasOwn(productPrices, itemName)) {
			stagingArea[itemName] = (stagingArea[itemName] || 0) + count;
			service.updItemCount(count);
			storage.set("stagingArea", stagingArea);
			announce(
				`${stagingArea[itemName]} ${itemName}${stagingArea[itemName] === 1 ? "" : "s"} ${stagingArea[itemName] > 1 ? "are" : "is"} in the basket`,
			);
		}
	}

	function addToBasket() {
		setStage(productPrices, itemName);
		setToast({ itemName, count });
	}

	return (
		<section className={styles.purchase} aria-label="Number of items to add to basket"
>
			<div className={styles["qty-counter"]}>
				<button
					className={styles["btn-plus"]}
					type="button"
					onClick={increase}
					aria-label="Increases quantity by one"
				>
					+
				</button>
				<div
					className={styles.counting}
				>
					{count}
				</div>
				<button
					className={styles["btn-minus"]}
					type="button"
					onClick={decrease}
					aria-label="Increases quantity by one"
				>
					-
				</button>
			</div>
			<button
				className={styles.buy}
				type="button"
				onClick={addToBasket}
				aria-label="click to add to basket"
			>
				Add to Basket
			</button>
		</section>
	);
}

export default Counter;
