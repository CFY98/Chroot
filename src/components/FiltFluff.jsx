//IMPORTS
import styles from "../css/Stats.module.css";

function FiltFluff({ fluff, quantity, price }) {
  return (
    <div className={styles.statistics}>
      <p className={styles.fluff}>{fluff}</p>
      <span>
        <br />
        <br />
      </span>
      <p className={styles.stats}>
        Quantity: <span className={styles.result}>{quantity}</span>
      </p>
      <p className={styles.stats}>
        Price: <span className={styles.result}>{price}</span>
      </p>
    </div>
  );
}

export default FiltFluff;
