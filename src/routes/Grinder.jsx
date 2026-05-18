//IMPORTS
import styles from "../css/product/CatWrapper.module.css";
import { useState } from "react";
import Title from "../components/ui/Title";
import GrindFluff from "../components/product/GrindFluff";
import Counter from "../components/basket/Counter";
import Toastbox from "../components/ui/Toastbox";

function Grinder() {
  const [toast, setToast] = useState(null);
  return (
    <>
      <Title title="Grinder" />
      <div className={`${styles["catalogue-wrapper"]} fadein`}>
        <div className={styles["catalogue-container"]}>
          <div className={styles["catalogue-item"]}>
            <img
              src="/Images/grinder.jpg"
              alt="Picture of the Chroot Grinder."
            />
          </div>
          <GrindFluff
            fluff={
              <>
                Embrace the morning with the Chroot Grinder.
                <br />
                <br />
                Whether you're a fan of the French Press or need to dial-in
                those espresso shots, the precision-made 48m conical burrs are
                desinged for all needs from the enthusiast to the professional.
                <br />
                <br />
                The compact size and weight of 600g allows for a sturdy yet
                lightweight feel to provide a premium experience for the most
                adventurous of drinkers.
              </>
            }
            burrs="48 Conical SS"
            materials="7075 Alumninium"
            weight="600g"
            price="£129.99"
          />
        </div>
        <Counter itemName="grinder" setToast={setToast} />
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

export default Grinder;
