//IMPORTS
import styles from "../../css/landing/Hours.module.css";

function Hours() {
  const weekdayOpen = "07:00";
  const weekdayClose = "18:00";
  const weekendOpen = "08:00";
  const weekendClose = "16:00";

  return (
    <div className={styles["hours-container"]}>
      <div className={styles["opening-container"]}>
        <h3 className={`${styles["sub-heading"]} fadein`}>Opening Hours</h3>
        <p className={`${styles.times} fadein`}>
          Mondays - Fridays: {weekdayOpen} → {weekdayClose}
          <br />
          Saturdays - Sundays: {weekendOpen} → {weekendClose}
        </p>
      </div>
    </div>
  );
}

export default Hours;
