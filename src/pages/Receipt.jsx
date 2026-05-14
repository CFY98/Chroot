//IMPORTS
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styles from "../css/Receipt.module.css";
import { initReceipt } from "../purchase/receipt.js";
import { announce } from "../tools/announcer.js";
import { storage } from "../tools/storage.js";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import ReceiptCard from "../components/ReceiptCard";

function Receipt({ tuiMode }) {
  useEffect(() => {
    announce("Click the Download button to download or print the receipt");
  }, []);

  const navigate = useNavigate();
  const committed = storage.get("committed", {});
  const receiptItems = Object.keys(committed);

  function receiptGen(tuiMode) {
    if (initReceipt()) {
      navigate(tuiMode ? "/terminal" : "/");
    }
  }

  return (
    <div className="fadein">
      <Title title="Invoice" />
      <Subtitle subtitle="Thank you for your purchase at Chroot!" />
      <div className={styles["receipt-container"]}>
        <div className={styles.bar}>
          <p className={styles.order}>Order Number:</p>
          <p className={styles.message}></p>
          <button
            className={styles.print}
            aria-label="print PDF"
            onClick={receiptGen}
          >
            Download
          </button>
        </div>
        <div className={styles["receipt-items"]}>
          {receiptItems.map((key) => (
            <ReceiptCard key={key} itemName={key} />
          ))}
        </div>
        <hr />
        <div className={styles["receipt-checkout"]}>
          <div className={styles["receipt-total"]}>
            Total
            <div className={styles["receipt-amount"]}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Receipt;
