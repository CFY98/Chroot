//IMPORTS
import styles from "../css/Subtitle.module.css";

function Subtitle({ subtitle }) {
  return (
    <p className={`${styles.subtitle} fadein`}>
      {subtitle}
    </p>
  );
}

export default Subtitle;
