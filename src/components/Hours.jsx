//IMPORTS
import styles from "../css/Hours.module.css";

function Hours() {
  return (
    <div className={styles["hours-container"]}>
      <div className={styles["opening-container"]}>
        <h3 className={`${styles["sub-heading"]} fadein`}></h3>
        <p className={`${styles.times} fadein`}>
          Mondays - Fridays: 07:00 → 18:00
          <br />
          Saturdays - Sundays: 08:00 → 16:00
        </p>
      </div>
    </div>
  );
}

export default Hours;
