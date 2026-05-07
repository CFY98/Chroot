//IMPORTS
import styles from "../css/NavBar.module.css";

function NavBar() {
  return (
    <div className={styles["nav-buttons"]}>
      <div className={styles["nav-btn"]} id="title">
        (Chroot)
      </div>
      <div className={styles["nav-btn"]}>Beans</div>
      <div className={styles["nav-btn"]}>Equipment</div>
      <div id="basket-btn" className={styles["nav-btn"]}>
        Basket
      </div>
    </div>
  );
}

export default NavBar;
