//IMPORTS
import styles from "../css/CatWrapper.module.css";
import { useState } from "react";
import Title from "../components/Title";
import BeanStats from "../components/BeanStats";
import Counter from "../components/Counter";
import Toastbox from "../components/Toastbox";

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
