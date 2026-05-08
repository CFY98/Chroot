//IMPORTS
import styles from "../css/CartCard.module.css";
import { basket } from "../tools/baskstate.js";
import { productPrices } from "../tools/assets.js";
import { announce } from "../tools/announcer.js";
import service, { storage } from "../tools/storage.js";

function CartCard({ itemName, onRemove, onUpdate }) {
  const stagingArea = basket.stagArea();
  const qtyTotal = stagingArea[itemName] * productPrices[itemName];

  function incAmount(itemName) {
    const stagingArea = basket.stagArea();
    stagingArea[itemName] += 1;
    service.updItemCount(1);
    storage.set("stagingArea", stagingArea);
    announce(`${itemName} quantity increased to ${stagingArea[itemName]}`);
    onUpdate(itemName);
  }

  function decAmount(itemName) {
    const stagingArea = basket.stagArea();
    const basketItems = basket.baskItems();
    stagingArea[itemName] -= 1;
    service.updItemCount(-1);
    if (stagingArea[itemName] === 0) {
      if (basketItems.length === 0) {
        announce("the basket is now empty");
        basket.resetBasket();
      }
      service.removeItem(itemName);
      onRemove(itemName);
      announce(`${itemName} was completely removed from the basket`);
    } else {
      announce(`${itemName} quantity decreased to ${stagingArea[itemName]}`);
    }
    storage.set("stagingArea", stagingArea);
    onUpdate(itemName);
  }

  function remItem(itemName) {
    service.removeItem(itemName);
    onRemove(itemName);
    announce(`${itemName} was completely removed from the basket`);
  }

  return (
    <div className={styles["cart-item"]}>
      <div className={styles["image-box"]}>
        <img src={`/Images/${itemName}.jpg`} alt={itemName} />
      </div>
      <div className={styles.about}>
        <div className={styles.name}>{itemName}</div>
      </div>
      <div className={styles.counter}>
        <div
          className={styles["plus-btn"]}
          role="button"
          onClick={() => incAmount(itemName)}
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
          onClick={() => decAmount(itemName)}
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
          onClick={() => remItem(itemName)}
          aria-label="Removes item from basket"
        >
          <u>Remove</u>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
