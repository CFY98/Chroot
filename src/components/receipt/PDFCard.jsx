
//IMPORTS
import styles from "../../css/PDFCard.module.css";
import { productPrices, toTitleCase } from "../../tools/assets.js";
import { storage } from "../../tools/storage.js";

function PDFCard({ itemName }) {
  const committed = storage.get("committed", {});
  const qtyTotal = committed[itemName] * productPrices[itemName];
  return (
    <div className={styles["receipt-item"]}>
      <div className={styles["image-box"]}>
        <img src={`/Images/${itemName}.jpg`} alt={itemName} />
      </div>
      <div className={styles.about}>
        <div className={styles["item-name"]}>
          {toTitleCase(itemName)}
        </div>
      </div>
      <div className={styles["item-count"]}>
        x{committed[itemName]}
      </div>
      <div className={styles["receipt-cost"]}>
        <div className={styles["item-amount"]}>
          £{qtyTotal.toFixed(2)}
        </div>
      </div>
    </div>
  );
}

export default PDFCard;
