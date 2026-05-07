//IMPORTS
import styles from "../css/SlideCards.module.css";

function SlideCards({ src, alt, caption }) {
  return (
    <figure>
      <img src={src} className={styles.slide} alt={alt} />
      <div className={styles.slidecaption}>
        <p>{caption}</p>
      </div>
    </figure>
  );
}

export default SlideCards;
