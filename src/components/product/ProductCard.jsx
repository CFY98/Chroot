//IMPORTS

import { NavLink } from "react-router-dom";
import styles from "../../css/product/ProductCard.module.css";

function ProductCard({ src, alt, arialabel, path, itemName, itemPrice }) {
	return (
		<>
			<div className={styles["caption-container"]}>
				<img src={src} alt={alt} className={`${styles.product} fadein`} />
				<NavLink className={styles.caption} to={path} aria-label={arialabel}>
					<div className={styles.more} data-link>
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
