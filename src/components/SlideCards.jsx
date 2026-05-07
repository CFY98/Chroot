//IMPORTS
import styles from "../css/SlideCards.module.css";

function SlideCards({ src, alt, caption }) {
  return (
    <figure>
      <img src={src} alt={alt} />
      <div data-component="caption" data-show-class={styles.show} className={styles.slidecaption}>
        <p>{caption}</p>
      </div>
    </figure>
  );
}

export default SlideCards;
