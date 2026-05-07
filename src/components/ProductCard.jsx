//IMPORTS
import styles from "../css/ProductCard.module.css";

function ProductCard({ src, alt, arialabel, href, itemName, itemPrice }) {
  return (
    <>
      <div className={styles["caption-container"]}>
        <img src={src} alt={alt} className={`${styles.product} fadein`} />
        <div className={styles.caption}>
          <a
            className={styles.more}
            aria-label={arialabel}
            href={href}
            data-link
          >
            More info
          </a>
        </div>
      </div>
      <div className={`${styles.information} fadein`}>
        <p className={styles.itemnames}>{itemName}</p>
        <p className={styles.prices}>{itemPrice}</p>
      </div>
    </>
  );
}

export default ProductCard;
