// IMPORTS
import { productPrices } from "../tools/assets.js";
import { announce } from "../tools/announcer.js";
import { storage, toAdd } from "../tools/storage.js";

export function initBuy(page) {
    const buy = document.querySelector(".buy");
    const toBuy = document.getElementById("purchase");
    const itemName = page.split("/").pop();
    const counting = document.querySelector(".counting");
    toAdd[itemName] = toAdd[itemName] || 1;

    if (toBuy) {
        toBuy.addEventListener("click", (e) => {
            const itemQuantity = e.target.closest(".qty-counter");
            if (!itemQuantity) return;

            function addNumber(delta) {
                toAdd[itemName] = (toAdd[itemName] || 0) + delta;
                counting.textContent = toAdd[itemName];
            }

            if (e.target.classList.contains("btn-plus")) {
                addNumber(1);
                announce(
                    `${itemName} quantity increased to ${toAdd[itemName]}`,
                );
            }

            if (e.target.classList.contains("btn-minus")) {
                if (parseInt(counting.textContent) <= 1) return;
                addNumber(-1);
                announce(
                    `${itemName} quantity decreased to ${toAdd[itemName]}`,
                );
            }
        });
    }

    if (buy) {
        buy.onclick = function () {
            const stagingArea = storage.get("stagingArea", {});
            const basketItems = storage.get("basketItems", []);
            if (Object.hasOwn(productPrices, itemName)) {
                stagingArea[itemName] =
                    (stagingArea[itemName] || 0) + toAdd[itemName];
                const prev = parseInt(storage.get("itemCount", 0));
                storage.set("itemCount", prev + toAdd[itemName]);
                storage.set("stagingArea", stagingArea);

                if (!basketItems.includes(itemName)) {
                    basketItems.push(itemName);
                    storage.set("basketItems", basketItems);
                }
                announce(
                    `${stagingArea[itemName]} ${itemName}${stagingArea[itemName] === 1 ? "" : "s"} ${stagingArea[itemName] > 1 ? "are" : "is"} in the basket`,
                );

                let toastBox = document.getElementById("toastbox");
                function showToast() {
                    let toast = document.createElement("div");
                    toast.classList.add("toast");
                    toast.innerHTML = `<img src="/Images/${itemName}.jpg" alt="${itemName}"/>${toAdd[itemName] > 1 ? `${itemName} x${toAdd[itemName]}` : itemName} added to the basket`;
                    toastBox.appendChild(toast);

                    setTimeout(() => {
                        toast.remove();
                    }, 3000);
                }
                showToast();
            }
        };
    }
}
