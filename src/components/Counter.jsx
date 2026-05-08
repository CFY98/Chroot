//IMPORTS
import styles from "../css/Counter.module.css";

function Counter() {
  return (
    <div className={styles.purchase}>
      <div className={styles["qty-counter"]}>
        <div
          className={styles["btn-plus"]}
          role="button"
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
          aria-label="Increases quantity by one"
        >
          -
        </div>
      </div>
      <button className={styles.buy} aria-label="click to add to basket">
        Add to Basket
      </button>
    </div>
  );
}

export default Counter;
