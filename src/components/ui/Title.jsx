//IMPORTS
import styles from "../../css/ui/Title.module.css";

function Title({ title, className }) {
  return <p className={`${styles.title} ${className || ""} fadein`}>{title}</p>;
}

export default Title;
