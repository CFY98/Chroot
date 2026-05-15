//IMPORTS
import styles from "../../css/Subtitle.module.css";

function Subtitle({ subtitle, className }) {
  return (
    <p className={`${styles.subtitle} ${className || ""} fadein`}>
      {subtitle}
    </p>
  );
}

export default Subtitle;
