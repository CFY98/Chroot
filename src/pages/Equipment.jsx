//IMPORTS
import { useEffect } from "react";
import { announce } from "../tools/announcer.js";
import styles from "../css/Catalogue.module.css";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import ProductCard from "../components/ProductCard";

function Equipment() {
  useEffect(() => {
    announce("The Equipment page has loaded");
  }, []);

  return (
    <>
      <Title title="Brewing Equipment" />
      <div className={styles["product-wrapper"]}>
        <Subtitle subtitle="Please browse our selection for the best cups of coffee" />
        <div className={styles.products}>
          <ProductCard
            src="/Images/filters.jpg"
            alt="Picture of Chroot Filters"
            arialabel="More information on our Chroot Filters."
            href="/filters"
            itemName="Filters"
            itemPrice="£9.99"
          />
          <ProductCard
            src="/Images/dripper.jpg"
            alt="Picture of Chroot Dripper"
            arialabel="More information on our Chroot Dripper."
            href="/dripper"
            itemName="Dripper"
            itemPrice="£14.99"
          />
          <ProductCard
            src="/Images/grinder.jpg"
            alt="Picture of Chroot Coffee Grinder"
            arialabel="More information on our Chroot Coffee Grinder."
            href="/grinder"
            itemName="Grinder"
            itemPrice="£129.99"
          />
        </div>
      </div>
    </>
  );
}

export default Equipment;
