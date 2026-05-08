//IMPORTS
import styles from "../css/CartCard.module.css";
import { basket } from "../purchase/baskstate.js";
import { productPrices } from "../tools/assests.js";

function CartCard({ itemName }) {
  const stagingArea = basket.stagArea();
  const qtyTotal = stagingArea[itemName] * productPrices[itemName];

  return (
    <div className={styles["cart-item"]} >
      <div className={styles["image-box"]} >
        <img src="/Images/${itemName}.jpg" alt="${itemName}" />
      </div>
      <div className={styles.about}>
        <div className={styles.name}>${itemName}</div>
      </div>
      <div className={styles.counter}>
        <div
          className={styles["plus-btn"]}
          role="button"
          aria-label="Increases quantity by one"
        >
          +
        </div>
        <div
          className={styles.count}
          aria-label="Displays number of selected item in basket"
        >
          ${stagingArea[itemName]}
        </div>
        <div
          className={styles["minus-btn"]}
          role="button"
          aria-label="Increases quantity by one"
        >
          -
        </div>
      </div>
      <div className={styles.cost}>
        <div className={styles.amount}>£${qtyTotal.toFixed(2)}</div>
        <div
          className={styles.remove}
          role="button"
          aria-label="Removes item from basket"
        >
          <u>Remove</u>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
