//IMPORTS
import styles from "../css/Title.module.css";

function Title({ title }) {
  <p className={`${styles.title} fadein`}>
    {title}
  </p>;
}

export default Title;
