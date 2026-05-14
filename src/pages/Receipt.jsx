//IMPORTS
import styles from "../css/Receipt.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { printReceipt } from "../purchase/receipt.js";
import { announce } from "../tools/announcer.js";
import { storage } from "../tools/storage.js";
import { productPrices } from "../tools/assets.js";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import ReceiptCard from "../components/ReceiptCard";
import PDF from "../components/PDF";

function Receipt({ tuiMode }) {
  useEffect(() => {
    announce("Click the Download button to download or print the receipt");
  }, []);

  const navigate = useNavigate();
  const invoiceRef = useRef(null);
  const orderNumber = storage.get("orderNumber", []);
  const orderMessage = storage.get("orderMessage", []);
  const committed = storage.get("committed", {});
  const receiptItems = Object.keys(committed);
  const subtotal = Object.entries(committed).reduce((sum, [key, value]) => {
    return sum + value * (productPrices[key] || 0);
  }, 0);

  const dataItems = {
    orderNumber,
    orderMessage,
    committed,
    receiptItems,
    subtotal,
  };

  async function processReceipt() {
    await printReceipt(orderNumber, invoiceRef);
    setTimeout(() => {
      navigate(tuiMode ? "/terminal" : "/");
    }, 100);
  }

  return (
    <div className="fadein">
      <Title title="Invoice" />
      <Subtitle subtitle="Thank you for your purchase at Chroot!" />
      <div className={`${styles["receipt-container"]} receipt-container`}>
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
            onClick={processReceipt}
          >
            Download
          </button>
        </div>
        <div className={`${styles["receipt-items"]} receipt-items`}>
          {receiptItems.map((key) => (
            <ReceiptCard key={key} itemName={key} />
          ))}
        </div>
        <hr />
        <div className={`${styles["receipt-checkout"]} receipt-checkout`}>
          <div className={`${styles["receipt-total"]} receipt-total`}>
            Total
            <div className={`${styles["receipt-amount"]} receipt-amount`}>
              {subtotal > 0 ? `£${subtotal.toFixed(2)}` : ""}
            </div>
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", left: "-9999px", top: "0" }}>
        <div ref={invoiceRef}>
          <PDF />
        </div>
      </div>
    </div>
  );
}

export default Receipt;
