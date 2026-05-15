//IMPORTS
import styles from "../../css/slideshow/Arrows.module.css";

function ArrowButtons() {
  return (
    <div className={styles.arrows}>
      <button id="prev" aria-label="previous slide of the slideshow">
        &lt;
      </button>
      <button id="next" aria-label="next slide of the slideshow">
        &gt;
      </button>
    </div>
  );
}

export default ArrowButtons;
