// IMPORTS
import styles from "../css/Basket.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import service, { storage } from "../tools/storage.js";
import { announce } from "../tools/announcer.js";
import { basket } from "../tools/baskstate.js";
import { productPrices } from "../tools/assets.js";
import {
  processOrder,
  clearBasket,
  removeCard,
} from "../tools/basketActions.js";
import Title from "../components/Title";
import CartCard from "../components/CartCard";

// PROCESS ORDER FUNCTIONS
function Basket() {
  useEffect(() => {
    announce("The Basket page has loaded");
  }, []);

  const [stagingArea, setStagingArea] = useState(basket.stagArea());
  const basketItems = Object.keys(stagingArea);
  const [itemCount, setItemCount] = useState(storage.get("itemCount", 0));
  const [subtotal, setSubtotal] = useState(() => {
    return Object.entries(stagingArea).reduce((sum, [key, value]) => {
      return sum + value * (productPrices[key] || 0);
    }, 0);
  });
  const navigate = useNavigate();

  function updateBasketState() {
    setStagingArea(basket.stagArea());
    setItemCount(storage.get("itemCount", 0));
    setSubtotal(basket.subtotal);
  }

  function handleOrder() {
    if (processOrder()) {
      updateBasketState();
      navigate("/receipt");
    }
  }

  function basketReset() {
    if (clearBasket()) {
      updateBasketState();
    }
  }

  function removeItem(itemName) {
    if (removeCard(itemName)) {
      updateBasketState();
    }
  }

  return (
    <>
      <Title title="Shopping Basket" />
      <div className={styles["cart-container"]}>
        <div className={styles.header}>
          <div
            className={styles.delete}
            aria-label="Click to clear the basket"
            onClick={basketReset}
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
                onRemove={removeItem}
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
            onClick={handleOrder}
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}

export default Basket;
