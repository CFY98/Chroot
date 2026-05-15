//IMPORTS
import styles from "../css/product/CatWrapper.module.css";
import { useState } from "react";
import Title from "../components/ui/Title";
import FiltFluff from "../components/product/FiltFluff";
import Counter from "../components/basket/Counter";
import Toastbox from "../components/ui/Toastbox";

function Filters() {
  const [toast, setToast] = useState(null);
  return (
    <>
      <Title title="Filters" />
      <div className={`${styles["catalogue-wrapper"]} fadein`}>
        <div className={styles["catalogue-container"]}>
          <div className={styles["catalogue-item"]}>
            <img
              src="/Images/dripper.jpg"
              alt="Picture of the Chroot Filters."
            />
          </div>
          <FiltFluff
            fluff="Our in-house filters are designed to fit household favourites such as the Hario V60, the Cafec Flower, and our very own Chroot Dripper."
            quantity="100 filters per pack"
            price="£9.99"
          />
        </div>
        <Counter itemName="filters" setToast={setToast} />
        {toast && (
          <Toastbox
            itemName={toast.itemName}
            count={toast.count}
            clearToast={() => setToast(null)}
          />
        )}
      </div>
    </>
  );
}

export default Filters;
