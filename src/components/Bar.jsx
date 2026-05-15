//IMPORTS
import styles from "../css/Bar.module.css";
import { storage } from "../tools/storage.js";

function Bar({ onPrint }) {
  const orderNumber = storage.get("orderNumber", []);
  const orderMessage = storage.get("orderMessage", []);

  return (
    <div className={`${styles.bar} bar`}>
      <p className={`${styles.order} order`}>
        Order Number: {orderNumber.at(-1)}
      </p>
      <p className={`${styles.message} message`}>
        {orderMessage.at(-1) ? `Order Message: ${orderMessage.at(-1)}` : ""}
      </p>
      <button
        className={`${styles.print} print`}
        aria-label="print PDF"
        onClick={onPrint}
      >
        Download
      </button>
    </div>
  );
}

export default Bar;
