//IMPORTS
import styles from "../css/CatWrapper.module.css";
import { useState } from "react";
import Title from "../components/Title";
import BeanStats from "../components/BeanStats";
import Counter from "../components/Counter";
import Toastbox from "../components/Toastbox";

function Sunshine() {
  const [toast, setToast] = useState(null);
  return (
    <>
      <Title title="Sunshine" />
      <div className={`${styles["catalogue-wrapper"]} fadein`}>
        <div className={styles["catalogue-container"]}>
          <div className={styles["catalogue-item"]}>
            <img
              src="/Images/sunshine.jpg"
              alt="Picture of the coffee beans called Sunshine."
            />
          </div>
          <BeanStats
            origin="Yirgacheffe, Ethiopia"
            varietal="Heirloom"
            altitude="1,800 - 2,200m"
            process="Natural"
            roast="Light"
            harvest="November - January"
            notes="Blueberry, Toffee, Cherry"
            quantity="200g"
            price="£14.99"
          />
        </div>
        <Counter itemName="Sunshine" setToast={setToast} />
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
export default Sunshine;
