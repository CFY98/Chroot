//IMPORTS
import styles from "../../css/product/Stats.module.css";

function GrindFluff({ fluff, burrs, materials, weight, price }) {
  return (
    <div className={styles.statistics}>
      <p className={styles.fluff}>{fluff}</p>
      <span>
        <br />
        <br />
      </span>
      <p className={styles.stats}>
        Burr Set: <span className={styles.result}>{burrs}</span>
      </p>
      <p className={styles.stats}>
        Materials: <span className={styles.result}>{materials}</span>
      </p>
      <p className={styles.stats}>
        Weight: <span className={styles.result}>{weight}</span>
      </p>
      <p className={styles.stats}>
        Price: <span className={styles.result}>{price}</span>
      </p>
    </div>
  );
}

export default GrindFluff;
