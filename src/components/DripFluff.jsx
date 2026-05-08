//IMPORTS
import styles from "../css/Stats.module.css";

function DripFluff({ fluff, materials, size, price }) {
  return (
    <div className={styles.statistics}>
      <p className={styles.fluff}>{fluff}</p>
      <span>
        <br />
        <br />
      </span>
      <p className={styles.stats}>
        Materials:{" "}
        <span className={styles.result}>{materials}</span>
      </p>
      <p className={styles.stats}>
        Size: <span className={styles.result}>{size}</span>
      </p>
      <p className={styles.stats}>
        Price: <span className={styles.result}>{price}</span>
      </p>
    </div>
  );
}

export default DripFluff;
