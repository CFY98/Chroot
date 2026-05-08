//IMPORTS
import styles from "../css/Stats.module.css";

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
    <div class={styles.statistics}>
      <p class={styles.stats}>
        Origin: <span class="result">{origin}</span>
      </p>
      <p class={styles.stats}>
        Varietal: <span class="result">{varietal}</span>
      </p>
      <p class={styles.stats}>
        Altitude: <span class="result">{altitude}</span>
      </p>
      <p class={styles.stats}>
        Process: <span class="result">{process}</span>
      </p>
      <p class={styles.stats}>
        Roast: <span class="result">{roast}</span>
      </p>
      <p class={styles.stats}>
        Harvest: <span class="result">{harvest}</span>
      </p>
      <p class={styles.stats}>
        Notes: <span class="result">{notes}</span>
      </p>
      <span>
        <br />
        <br />
      </span>
      <p class={styles.stats}>
        Quantity: <span class="result">{quantity}</span>
      </p>
      <p class={styles.stats}>
        Price: <span class="result">{price}</span>
      </p>
    </div>
  );
}

export default BeanStats;
