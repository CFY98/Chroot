//IMPORTS
import { NavLink } from "react-router-dom";
import styles from "../css/NavBar.module.css";

function NavBar({ tuiMode }) {
  return (
    <div className={styles["nav-buttons"]}>
      <NavLink
        id="title"
        to={tuiMode ? "/terminal" : "/"}
        className={({ isActive }) =>
          `${styles["nav-btn"]} ${isActive ? styles.active : ""}`
        }
      >
        (Chroot)
      </NavLink>
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
