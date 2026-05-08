//IMPORTS
import styles from "../css/Toastbox.module.css";
import { useState, useEffect } from "react";
import { toAdd } from "../tools/storage.js";

function Toastbox({ itemName }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className={styles.toastbox}>
      {itemName && (
        <div className={styles.toast}>
          <img src={`/Images/${itemName}.jpg`} alt={itemName} />
          {toAdd[itemName] > 1
            ? `${itemName} x${toAdd[itemName]} added to the basket`
            : `${itemName} added to the basket`}
        </div>
      )}
    </div>
  );
}

export default Toastbox;
