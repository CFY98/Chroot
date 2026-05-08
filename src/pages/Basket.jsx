// IMPORTS
import styles from "../css/Basket.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { announce } from "../tools/announcer.js";
import service, { storage } from "../tools/storage.js";
import { basket } from "../tools/baskstate.js";
import Title from "../components/Title";
import CartCard from "../components/CartCard";

// PROCESS ORDER FUNCTIONS
function Basket() {
  useEffect(() => {
    announce("The Basket page has loaded");
  }, []);

  const [basketItems, setBasketItems] = useState(basket.baskItems());
  const [stagingArea, setStagingArea] = useState(basket.stagArea());
  const [itemCount, setItemCount] = useState(storage.get("itemCount", 0));
  const [subtotal, setSubtotal] = useState(basket.subtotal);
  const navigate = useNavigate();

  function updateBasketState() {
    setBasketItems(basket.baskItems());
    setStagingArea(basket.stagArea());
    setItemCount(storage.get("itemCount", 0));
    setSubtotal(basket.subtotal);
  }
  function genOrderNo() {
    const hash = Math.random().toString(16).slice(2, 9);
    const orderNumber = basket.orderNo();
    orderNumber.push(hash);
    storage.set("orderNumber", orderNumber);
    service.processOrder();
    announce(`The receipt for order ${hash} is now available to print`);
    updateBasketState();
  }

  function processOrder() {
    const stagingArea = basket.stagArea();
    if (Object.keys(stagingArea).length === 0) {
      announce("No order was placed since there were no items in the basket");
      return;
    }
    genOrderNo();
    navigate("/receipt");
  }

  function clearBasket() {
    const stagingArea = basket.stagArea();
    if (Object.keys(stagingArea).length === 0) {
      announce("The basket was empty to begin with");
      return;
    }
    basket.resetBasket();
    updateBasketState();
  }

  function removeCard(itemName){
    setBasketItems(prev =>
      prev.filter(item => item !== itemName)
    );
  }

  return (
    <>
      <Title title="Shopping Basket" />
      <div className={styles["cart-container"]}>
        <div className={styles.header}>
          <div
            className={styles.delete}
            aria-label="Click to clear the basket"
            onClick={clearBasket}
          >
            Reset All
          </div>
        </div>
        <hr />
        <div className={styles["cart-items"]}>
          {basketItems.length === 0 ? (
            <div className={styles.empty}>
              <p>Basket is Empty</p>
            </div>
          ) : (
            basketItems.map((key) => (
              <CartCard
                key={key}
                itemName={key}
                stagingArea={stagingArea}
                onUpdate={updateBasketState}
                onRemove={removeCard}
              />
            ))
          )}
        </div>
        <hr />
        <div className={styles.checkout}>
          <div className={styles.total}>Total</div>
          <div className={styles["total-amount"]}>
            {subtotal > 0 ? `£${subtotal.toFixed(2)}` : ""}
          </div>
          <button
            className={styles.button}
            aria-label="Click to confirm order"
            onClick={processOrder}
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}

export default Basket;
