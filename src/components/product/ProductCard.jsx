//IMPORTS
import styles from "../../css/ProductCard.module.css";
import { NavLink } from "react-router-dom";

function ProductCard({ src, alt, arialabel, path, itemName, itemPrice }) {
  return (
    <>
      <div className={styles["caption-container"]}>
        <img src={src} alt={alt} className={`${styles.product} fadein`} />
        <NavLink className={styles.caption} to={path}>
          <div className={styles.more} aria-label={arialabel} data-link>
            More info
          </div>
        </NavLink>
      </div>
      <div className={`${styles.information} fadein`}>
        <p className={styles.itemnames}>{itemName}</p>
        <p className={styles.prices}>{itemPrice}</p>
      </div>
    </>
  );
}

export default ProductCard;
