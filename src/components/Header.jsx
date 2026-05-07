//IMPORTS
import styles from "../css/Header.module.css";

function Header() {
  return (
    <div className={styles.titlebar}>
      <span className={`${styles.dot} ${styles["dot-r"]}`}></span>
      <span className={`${styles.dot} ${styles["dot-y"]}`}></span>
      <span className={`${styles.dot} ${styles["dot-g"]}`}></span>
      <span
        className={styles["titlebar-text"]}
        data-text="Visual Mode"
        data-hover="Change: Terminal Mode"
      ></span>
    </div>
  );
}

export default Header;
