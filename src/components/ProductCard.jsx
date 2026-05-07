//IMPORTS
import styles from "../css/ProductCard.module.css";

function ProductCard({ src, alt, arialabel, href, itemName, itemPrice }) {
  return (
    <div className={styles["captions-container"]}>
      <img src={src} alt={alt} className="fadein" />
      <div className={styles.caption}>
        <a className={styles.more} aria-label={arialabel} href={href} data-link>
          {true} More info
        </a>
      </div>
      <div className={`${styles.information} fadein`}>
        <p className={styles.itemnames}>{itemName}</p>
        <p className={styles.prices}>{itemPrice}</p>
      </div>
    </div>
  );
}

export default ProductCard;
