//IMPORTS
import styles from "../../css/CartCard.module.css";
import { basket } from "../../tools/baskstate.js";
import { productPrices, toTitleCase } from "../../tools/assets.js";
import { announce } from "../../tools/announcer.js";
import service, { storage } from "../../tools/storage.js";
import { incAmount, decAmount, remItem } from "../../tools/cartActions.js";

function CartCard({ itemName, onRemove, onUpdate }) {
  const stagingArea = basket.stagArea();
  const qtyTotal = stagingArea[itemName] * productPrices[itemName];

  function addAmount(itemName) {
    if (incAmount(itemName)) onUpdate(itemName);
  }

  function redAmount(itemName) {
    if (decAmount(itemName)) onUpdate(itemName);
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
      <div className={styles.counter}>
        <div
          className={styles["plus-btn"]}
          role="button"
          onClick={() => addAmount(itemName)}
          aria-label="Increases quantity by one"
        >
          +
        </div>
        <div
          className={styles.count}
          aria-label="Displays number of selected item in basket"
        >
          {stagingArea[itemName]}
        </div>
        <div
          className={styles["minus-btn"]}
          role="button"
          onClick={() => redAmount(itemName)}
          aria-label="Increases quantity by one"
        >
          -
        </div>
      </div>
      <div className={styles.cost}>
        <div className={styles.amount}>£{qtyTotal.toFixed(2)}</div>
        <div
          className={styles.remove}
          role="button"
          onClick={() => delItem(itemName)}
          aria-label="Removes item from basket"
        >
          <u>Remove</u>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
