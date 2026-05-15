//IMPORTS
import styles from "../css/receipt/Receipt.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { printReceipt } from "../tools/receipt.js";
import { announce } from "../tools/announcer.js";
import { storage } from "../tools/storage.js";
import Title from "../components/ui/Title";
import Subtitle from "../components/ui/Subtitle";
import Bar from "../components/receipt/Bar";
import ReceiptCard from "../components/receipt/ReceiptCard";
import Total from "../components/receipt/Total";
import PDF from "../components/receipt/PDF";

function Receipt({ tuiMode }) {
  useEffect(() => {
    announce("Click the Download button to download or print the receipt");
  }, []);

  const orderNumber = storage.get("orderNumber", []);
  const navigate = useNavigate();
  const invoiceRef = useRef(null);
  const committed = storage.get("committed", {});
  const receiptItems = Object.keys(committed);

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
        <Bar onPrint={processReceipt} />
        <div className={`${styles["receipt-items"]} receipt-items`}>
          {receiptItems.map((key) => (
            <ReceiptCard key={key} itemName={key} />
          ))}
        </div>
        <hr />
        <Total />
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
