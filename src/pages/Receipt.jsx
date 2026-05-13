function Receipt() {
  return (
    <div className={`{styles.invoice} fadein`}>
      <p className={styles.subtitle}>Invoice</p>
      <p className="thanks">Thank you for your purchase at Chroot!</p>
      <div className="receipt-container">
        <div className="bar">
          <p className="order">Order Number:</p>
          <p className="message"></p>
          <button className="print" aria-label="print PDF">
            Download
          </button>
        </div>
        <div className="receipt-items"></div>
        <hr />
        <div className="receipt-checkout">
          <div className="receipt-total">
            Total
            <div className="receipt-amount"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Receipt;
