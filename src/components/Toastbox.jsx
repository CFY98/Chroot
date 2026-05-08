//IMPORTS
import styles from "../css/Toastbox.module.css";
import { useState, useEffect } from "react";

function Toastbox() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className={styles.toastbox}>
      <div className={styles.toast}>{message}</div> : null;
    </div>
  );
}

export default Toastbox;
