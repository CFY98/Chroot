//IMPORTS
import styles from "../../css/product/Stats.module.css";

function BeanStats({
	origin,
	varietal,
	altitude,
	process,
	roast,
	harvest,
	notes,
	quantity,
	price,
}) {
	return (
		<div className={styles.statistics}>
			<p className={styles.stats}>
				Origin: <span className="result">{origin}</span>
			</p>
			<p className={styles.stats}>
				Varietal: <span className="result">{varietal}</span>
			</p>
			<p className={styles.stats}>
				Altitude: <span className="result">{altitude}</span>
			</p>
			<p className={styles.stats}>
				Process: <span className="result">{process}</span>
			</p>
			<p className={styles.stats}>
				Roast: <span className="result">{roast}</span>
			</p>
			<p className={styles.stats}>
				Harvest: <span className="result">{harvest}</span>
			</p>
			<p className={styles.stats}>
				Notes: <span className="result">{notes}</span>
			</p>
			<span>
				<br />
				<br />
			</span>
			<p className={styles.stats}>
				Quantity: <span className="result">{quantity}</span>
			</p>
			<p className={styles.stats}>
				Price: <span className="result">{price}</span>
			</p>
		</div>
	);
}

export default BeanStats;
