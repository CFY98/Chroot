//IMPORTS
import styles from "../css/Stats.module.css";

function Fluff() {
  return (
    <div className={styles.statistics}>
      <p className={styles.fluff}>
        After years of testing, we are proud to introduce the Chroot Dripper!
        <br />
        <br />
        With BPA-Free Tritan Plastic chosen for its high durability and
        heat-resistance, the Chroot Dripper is perfect for when you're on the go
        or at home.
      </p>
      <span>
        <br />
        <br />
      </span>
      <p className={styles.stats}>
        Materials: <span className={styles.result}>BPA-Free Tritan Plastic</span>
      </p>
      <p className={styles.stats}>
        Size: <span className={styles.result}>1-4 cups</span>
      </p>
      <p className={styles.stats}>
        Price: <span className={styles.result}>£14.99</span>
      </p>
    </div>
  );
}

export default Fluff;
