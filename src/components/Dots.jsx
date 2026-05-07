//IMPORTS
import styles from "../css/Dots.module.css";

function Dots() {
  return (
    <ul className={styles.dots}>
      <li className={`${styles.dots} ${styles.active}`}></li>
      <li className={`${styles.dots} ${styles.active}`}></li>
      <li className={`${styles.dots} ${styles.active}`}></li>
    </ul>
  );
}

export default Dots;
