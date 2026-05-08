//IMPORTS
import styles from "../css/Toastbox.module.css";
import { useEffect } from "react";

function Toastbox({ itemName, count, clearToast }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      clearToast();
    }, 3000);
    return () => clearTimeout(timer);
  }, [clearToast]);

  return (
    <div className={styles.toastbox}>
      {itemName && (
        <div className={styles.toast}>
          <img src={`/Images/${itemName}.jpg`} alt={itemName} />
          {count > 1
            ? `${itemName} x${count} added to the basket`
            : `${itemName} added to the basket`}
        </div>
      )}
    </div>
  );
}

export default Toastbox;
