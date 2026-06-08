//IMPORTS
import styles from "../../css/basket/CartCard.module.css";
import { productPrices, toTitleCase } from "../../tools/assets.js";
import { basket } from "../../tools/baskstate.js";
import { decAmount, incAmount, remItem } from "../../tools/cartActions.js";

function CartCard({ itemName, onRemove, onUpdate }) {
	const stagingArea = basket.stagArea();
	const qtyTotal = stagingArea[itemName] * productPrices[itemName];

	function addAmount(itemName) {
		if (incAmount(itemName)) onUpdate();
	}

	function redAmount(itemName) {
		if (decAmount(itemName)) onUpdate();
	}

	function delItem(itemName) {
		if (remItem(itemName)) onRemove(itemName);
	}

	return (
		<div className={styles["cart-item"]}>
			<div className={styles["image-box"]}>
				<img src={`/Images/${itemName}.jpg`} alt={itemName} />
			</div>
			<div className={styles.about}>
				<div className={styles.name}>{toTitleCase(itemName)}</div>
			</div>
			<section className={styles.counter} aria-label="Displays the quantity of the selected item in basket">
				<button
					className={styles["plus-btn"]}
					type="button"
					onClick={() => addAmount(itemName)}
					aria-label="Increases quantity by one"
				>
					+
				</button>
				<div
					className={styles.count}
				>
					{stagingArea[itemName]}
				</div>
				<button
					className={styles["minus-btn"]}
					type="button"
					onClick={() => redAmount(itemName)}
					aria-label="Increases quantity by one"
				>
					-
				</button>
			</section>
			<div className={styles.cost}>
				<div className={styles.amount}>£{qtyTotal.toFixed(2)}</div>
				<button
					className={styles.remove}
					type="button"
					onClick={() => delItem(itemName)}
					aria-label="Removes item from basket"
				>
					<u>Remove</u>
				</button>
			</div>
		</div>
	);
}

export default CartCard;
