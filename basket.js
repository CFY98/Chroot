// BASKET SETTINGS
const product = document.querySelector(".cart-items");
// BASKET BUTTONS
const eliminate = document.querySelector(".delete");
const commit = document.querySelector(".button");

// COSTS
let subTotal = 0;
const total = document.querySelector(".total-amount");
export const prices = {
  blaze: 11.99,
  sunshine: 13.99,
  summit: 19.99,
  filters: 9.99,
  dripper: 14.99,
  grinder: 29.99,
};

function updateTotal() {
  const stagingArea = JSON.parse(localStorage.getItem("stagingArea") || "{}");

  document.querySelectorAll(".cart-item").forEach((cartItem) => {
    const name = cartItem.querySelector(".name").textContent;
    const amount = cartItem.querySelector(".amount");
    const count = cartItem.querySelector(".count");
    count.textContent = stagingArea[name] || "0";
    amount.textContent = `£${(stagingArea[name] * prices[name]).toFixed(2)}`;
  });

  subTotal = Object.entries(stagingArea).reduce((sum, [key, value]) => {
    return sum + value * prices[key];
  }, 0);

  total.textContent = subTotal > 0 ? `£${subTotal.toFixed(2)}` : "";
}

window.addEventListener("message", (event) => {
  if (event.data.action === "updateBasket") {
    updateTotal();
  }
});

if (product) {
  product.addEventListener("click", (e) => {
    if (e.target.classList.contains("plus-btn")) {
      const cartItem = e.target.closest(".cart-item");
      const itemName = cartItem.querySelector(".name").textContent;
      const amount = cartItem.querySelector(".amount");
      const prev = parseInt(localStorage.getItem("itemCount") || "0");
      localStorage.setItem("itemCount", prev + 1);
      const count = cartItem.querySelector(".count");
      count.textContent = parseInt(count.textContent || "0") + 1;

      const stagingArea = JSON.parse(
        localStorage.getItem("stagingArea") || "{}",
      );
      stagingArea[itemName] = (stagingArea[itemName] || 0) + 1;
      localStorage.setItem("stagingArea", JSON.stringify(stagingArea));

      amount.textContent = `£${(stagingArea[itemName] * prices[itemName]).toFixed(2)}`;
      updateTotal();
    }

    if (e.target.classList.contains("minus-btn")) {
      const cartItem = e.target.closest(".cart-item");
      const itemName = cartItem.querySelector(".name").textContent;
      const amount = cartItem.querySelector(".amount");
      const prev = parseInt(localStorage.getItem("itemCount") || "0");
      localStorage.setItem("itemCount", prev - 1);
      const count = cartItem.querySelector(".count");
      count.textContent = parseInt(count.textContent || "0") - 1;

      const stagingArea = JSON.parse(
        localStorage.getItem("stagingArea") || "{}",
      );
      stagingArea[itemName] = (stagingArea[itemName] || 0) - 1;
      localStorage.setItem("stagingArea", JSON.stringify(stagingArea));
      amount.textContent = `£${(stagingArea[itemName] * prices[itemName]).toFixed(2)}`;
      if (stagingArea[itemName] === 0) {
        delete stagingArea[itemName];
        const basketItems = JSON.parse(
          localStorage.getItem("basketItems") || "[]",
        );
        const itemIndex = basketItems.findIndex((i) => i === itemName);
        if (itemIndex !== -1) basketItems.splice(itemIndex, 1);
        localStorage.setItem("basketItems", JSON.stringify(basketItems));
        cartItem.remove();
      }
      updateTotal();
    }
    if (e.target.closest(".remove")) {
      const cartItem = e.target.closest(".cart-item");
      const itemName = cartItem.querySelector(".name").textContent;

      const basketItems = JSON.parse(
        localStorage.getItem("basketItems") || "[]",
      );
      const itemIndex = basketItems.findIndex((i) => i === itemName);
      if (itemIndex !== -1) basketItems.splice(itemIndex, 1);
      localStorage.setItem("basketItems", JSON.stringify(basketItems));

      const stagingArea = JSON.parse(
        localStorage.getItem("stagingArea") || "{}",
      );
      const itemQty = stagingArea[itemName] || 1;
      delete stagingArea[itemName];
      localStorage.setItem("stagingArea", JSON.stringify(stagingArea));

      const prev = parseInt(localStorage.getItem("itemCount") || "0");
      localStorage.setItem("itemCount", prev - itemQty);

      cartItem.remove();
    }
  });
}

// RESET ALL
if (eliminate) {
  eliminate.onclick = function () {
    localStorage.removeItem("basketItems");
    localStorage.removeItem("stagingArea");
    localStorage.setItem("itemCount", "0");
    if (product) product.innerHTML = "";
  };
}

// COMMIT ORDER
if (commit) {
  commit.onclick = function () {
    const basketItems = localStorage.getItem("basketItems") || "[]";
    const stagingArea = localStorage.getItem("stagingArea") || "{}";

    const orderNumber = JSON.parse(localStorage.getItem("orderNumber") || "[]");
    const hash = Math.random().toString(16).slice(2, 9);
    orderNumber.push(hash);
    localStorage.setItem("orderNumber", JSON.stringify(orderNumber));

    localStorage.setItem("purchased", basketItems);
    localStorage.setItem("committed", stagingArea);

    localStorage.removeItem("basketItems");
    localStorage.removeItem("stagingArea");
    localStorage.setItem("itemCount", "0");

    if (product) product.innerHTML = "";
    updateTotal();

    const frame = window.parent.document.getElementById("page");
    frame.src = "./receipt.html";
  };
}

// ITEMS IN BASKET
if (product) {
  let prevBasketItems = "";
  let prevStagingArea = "";

  setInterval(() => {
    const currentItems = localStorage.getItem("basketItems") || "[]";
    const currentStaging = localStorage.getItem("stagingArea") || "{}";

    if (currentItems === prevBasketItems && currentStaging === prevStagingArea)
      return;

    prevBasketItems = currentItems;
    prevStagingArea = currentStaging;

    const basketItems = JSON.parse(currentItems);
    const stagingArea = JSON.parse(currentStaging);

    product.innerHTML = "";
    basketItems.forEach((key) => {
      const qtyTotal = stagingArea[key] * prices[key];
      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
      <div class="image-box">
        <img src="./Images/${key}.jpg" alt="${key}" />
      </div>
      <div class="about">
        <h4 class="name">${key}</h4>
      </div>
      <div class="counter">
        <div class="plus-btn">+</div>
        <div class="count">${stagingArea[key]}</div>
        <div class="minus-btn">-</div>
      </div>
      <div class="cost">
        <div class="amount">£${qtyTotal.toFixed(2)}</div>
        <div class="remove"><u>Remove</u></div>
      </div>
    `;
      product.appendChild(div);
    });
    updateTotal();
  });
}
