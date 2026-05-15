//IMPORTS
import styles from "../css/Total.module.css";
import { storage } from "../tools/storage.js";
import { productPrices } from "../tools/assets.js";

function Total() {
  const committed = storage.get("committed", {});
  const subtotal = Object.entries(committed).reduce((sum, [key, value]) => {
    return sum + value * (productPrices[key] || 0);
  }, 0);

  return (
    <div className={`${styles["receipt-checkout"]} receipt-checkout`}>
      <div className={`${styles["receipt-total"]} receipt-total`}>
        Total
        <div className={`${styles["receipt-amount"]} receipt-amount`}>
          {subtotal > 0 ? `£${subtotal.toFixed(2)}` : ""}
        </div>
      </div>
    </div>
  );
}

export default Total;
