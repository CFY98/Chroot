//IMPORTS
import { NavLink } from "react-router-dom";
import styles from "../css/NavBar.module.css";

function NavBar() {
  return (
    <div className={styles["nav-buttons"]}>
      <div className={styles["nav-btn"]} id="title">
        (Chroot)
      </div>
      <NavLink
        to="/beans"
        className={({ isActive }) =>
          `${styles["nav-btn"]} ${isActive ? styles.active : ""}`
        }
      >
        Beans
      </NavLink>
      <NavLink
        to="/equipment"
        className={({ isActive }) =>
          `${styles["nav-btn"]} ${isActive ? styles.active : ""}`
        }
      >
        Equipment
      </NavLink>
      <NavLink
        to="/basket"
        className={({ isActive }) =>
          `${styles["nav-btn"]} ${isActive ? styles.active : ""}`
        }
      >
        Basket
      </NavLink>
    </div>
  );
}

export default NavBar;
