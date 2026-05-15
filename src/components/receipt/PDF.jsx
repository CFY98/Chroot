//IMPORTS
import styles from "../../css/receipt/PDF.module.css";
import { storage } from "../../tools/storage.js";
import { productPrices } from "../../tools/assets.js";
import Title from "../ui/Title";
import Subtitle from "../ui/Subtitle";
import PDFCard from "./PDFCard";

function PDF() {
  const orderNumber = storage.get("orderNumber", []);
  const orderMessage = storage.get("orderMessage", []);
  const committed = storage.get("committed", {});
  const receiptItems = Object.keys(committed);
  const subtotal = Object.entries(committed).reduce((sum, [key, value]) => {
    return sum + value * (productPrices[key] || 0);
  }, 0);
  return (
    <div className={styles.printing}>
      <Title title="Invoice" className={styles.title} />
      <Subtitle
        subtitle="Thank you for your purchase at Chroot!"
        className={styles.subtitle}
      />
      <div className={styles["receipt-container"]}>
        <div className={styles.bar}>
          <p className={styles.order}>Order Number: {orderNumber.at(-1)}</p>
          <p className={styles.message}>
            {orderMessage.at(-1) ? `Order Message: "${orderMessage.at(-1)}"` : ""}
          </p>
        </div>
        <div className={styles["receipt-items"]}>
          {receiptItems.map((key) => (
            <PDFCard key={key} itemName={key} />
          ))}
        </div>
        <hr />
        <div className={styles["receipt-checkout"]}>
          <div className={styles["receipt-total"]}>
            Total
            <div className={styles["receipt-amount"]}>
              {subtotal > 0 ? `£${subtotal.toFixed(2)}` : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PDF;
