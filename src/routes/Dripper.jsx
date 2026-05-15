//IMPORTS
import styles from "../css/CatWrapper.module.css";
import { useState } from "react";
import Title from "../components/ui/Title";
import Toastbox from "../components/ui/Toastbox";
import DripFluff from "../components/product/DripFluff";
import Counter from "../components/basket/Counter";

function Dripper() {
  const [toast, setToast] = useState(null);
  return (
    <>
      <Title title="Dripper" />
      <div className={`${styles["catalogue-wrapper"]} fadein`}>
        <div className={styles["catalogue-container"]}>
          <div className={styles["catalogue-item"]}>
            <img
              src="/Images/dripper.jpg"
              alt="Picture of the Chroot Dripper."
            />
          </div>
          <DripFluff
            fluff={
              <>
                After years of testing, we are proud to introduce the Chroot
                Dripper!
                <br />
                <br />
                With BPA-Free Tritan Plastic chosen for its high durability and
                heat-resistance, the Chroot Dripper is perfect for when you're
                on the go or at home.
              </>
            }
            materials="BPA-Free Tritan Plastic"
            size="1-4 Cups"
            price="£14.99"
          />
        </div>
        <Counter itemName="dripper" setToast={setToast} />
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

export default Dripper;
