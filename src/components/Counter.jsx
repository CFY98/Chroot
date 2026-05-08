//IMPORTS
import styles from "../css/Counter.module.css";
import { useState } from "react";
import service, { storage } from "../tools/storage.js";
import { announce } from "../tools/announcer.js";
import { productPrices } from "../tools/assets.js";

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
    setToast({itemName, count})
  }

  return (
    <div className={styles.purchase}>
      <div className={styles["qty-counter"]}>
        <div
          className={styles["btn-plus"]}
          role="button"
          onClick={increase}
          aria-label="Increases quantity by one"
        >
          +
        </div>
        <div
          className={styles.counting}
          aria-label="Number of items to add to basket"
        >
          1
        </div>
        <div
          className={styles["btn-minus"]}
          role="button"
          onClick={decrease}
          aria-label="Increases quantity by one"
        >
          -
        </div>
      </div>
      <button
        className={styles.buy}
        onClick={addToBasket}
        aria-label="click to add to basket"
      >
        Add to Basket
      </button>
    </div>
  );
}

export default Counter;
