//IMPORTS
import styles from "../css/Dots.module.css";

function Dots() {
  return (
    <ul
      data-component="dots"
      data-set-active={styles.active}
      className={styles.dots}
    >
      <li className={`${styles.dot} ${styles.active}`}></li>
      <li className={styles.dot}></li>
      <li className={styles.dot}></li>
    </ul>
  );
}

export default Dots;
