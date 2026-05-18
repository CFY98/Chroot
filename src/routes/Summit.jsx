//IMPORTS
import styles from "../css/product/CatWrapper.module.css";
import { useState } from "react";
import Title from "../components/ui/Title";
import Toastbox from "../components/ui/Toastbox";
import BeanStats from "../components/product/BeanStats";
import Counter from "../components/basket/Counter";

function Summit() {
  const [toast, setToast] = useState(null);
  return (
    <>
      <Title title="Summit" />
      <div className={`${styles["catalogue-wrapper"]} fadein`}>
        <div className={styles["catalogue-container"]}>
          <div className={styles["catalogue-item"]}>
            <img
              src="/Images/summit.jpg"
              alt="Picture of the coffee beans called Summit."
            />
          </div>
          <BeanStats
            origin="Antigua, Guatemala"
            varietal="Gesha"
            altitude="1,500 — 1,700m"
            process="Honey"
            roast="Light"
            harvest="December — March"
            notes="Jasmine, Bergamot, Pear"
            quantity="150g"
            price="£19.99"
          />
        </div>
        <Counter itemName="summit" setToast={setToast} />
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
export default Summit;
