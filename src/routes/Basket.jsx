// IMPORTS
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartCard from "../components/basket/CartCard";
import Title from "../components/ui/Title";
import styles from "../css/basket/Basket.module.css";
import { announce } from "../tools/announcer.js";
import {
	clearBasket,
	processOrder,
	removeCard,
} from "../tools/basketActions.js";
import { basket } from "../tools/baskstate.js";

// PROCESS ORDER FUNCTIONS
function Basket() {
	useEffect(() => {
		announce("The Basket page has loaded");
	}, []);

	const [stagingArea, setStagingArea] = useState(basket.stagArea());
	const basketItems = Object.keys(stagingArea);
	const [subtotal, setSubtotal] = useState(basket.subtotal());
	const navigate = useNavigate();

	function updateBasketState() {
		setStagingArea(basket.stagArea());
		setSubtotal(basket.subtotal());
	}

	function handleOrder() {
		if (processOrder()) {
			updateBasketState();
			navigate("/receipt");
		}
	}

	function basketReset() {
		if (clearBasket()) {
			updateBasketState();
		}
	}

	function removeItem(itemName) {
		if (removeCard(itemName)) {
			updateBasketState();
		}
	}

	return (
		<>
			<Title title="Shopping Basket" />
			<div className={styles["cart-container"]}>
				<div className={styles.header}>
					<button
						type="button"
						className={styles.delete}
						aria-label="Click to clear the basket"
						onClick={basketReset}
					>
						Reset All
					</button>
				</div>
				<hr />
				<div className={styles["cart-items"]}>
					{basketItems.length === 0 ? (
						<div className={styles.empty}>
							<p>Basket is Empty</p>
						</div>
					) : (
						basketItems.map((key) => (
							<CartCard
								key={key}
								itemName={key}
								stagingArea={stagingArea}
								onUpdate={updateBasketState}
								onRemove={removeItem}
							/>
						))
					)}
				</div>
				<hr />
				<div className={styles.checkout}>
					<div className={styles.total}>Total</div>
					<div className={styles["total-amount"]}>
						{subtotal > 0 ? `£${subtotal.toFixed(2)}` : ""}
					</div>
					<button
						type="button"
						className={styles.button}
						aria-label="Click to confirm order"
						onClick={handleOrder}
					>
						Checkout
					</button>
				</div>
			</div>
		</>
	);
}

export default Basket;
