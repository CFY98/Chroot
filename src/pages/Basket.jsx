// IMPORTS
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { announce } from "../tools/announcer.js";
import service, { storage } from "../tools/storage.js";
import { basket } from "./baskstate.js";
import CartCard from "../components/CartCard";

// PROCESS ORDER FUNCTIONS
function Basket() {
  const [basketItems, setBasketItems] = useState(basket.baskItems());
  const [stagingArea, setStagingArea] = useState(basket.stagArea());
  const [subtotal, setSubtotal] = useState(basket.subtotal);
  const navigate = useNavigate();

  function updateBasketState() {
    setBasketItems(basket.baskItems());
    setStagingArea(basket.stagArea());
    setSubtotal(basket.subtotal);
  }
  function genOrderNo() {
    const hash = Math.random().toString(16).slice(2, 9);
    const orderNumber = basket.orderNo();
    orderNumber.push(hash);
    storage.set("orderNumber", orderNumber);
    service.processOrder();
    if (product) product.innerHTML = "";
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

  return (
    <div className="basket-container">
      <div className="cart-items">
        {basketItems.length === 0 ? (
          <div className="empty">
            <p>Basket is Empty</p>
          </div>
        ) : (
          basketItems.map((key) => (
            <CartCard
              key={key}
              itemName={key}
              stagingArea={stagingArea}
              onUpdate={updateBasketState}
            />
          ))
        )}
      </div>
      <div className="total-amount">
        {subtotal > 0 ? `£${subtotal.toFixed(2)}` : ""}
      </div>
      <button className="delete" onClick={clearBasket}>
        Clear
      </button>
      <button className="button" onClick={processOrder}>
        Checkout
      </button>
    </div>
  );
}

export default Basket;
