//IMPORTS
import styles from "../css/Story.module.css";

function Story() {
  return (
    <div className={styles["story-container"]}>
      <h3 className={`${styles.subheading} fadein`}>Our Story</h3>
      <div className={styles.story}>
        <p className={`${styles.ethos} fadein`}>
          Founded in 2015, we aim to champion farmers and producers with a focus
          on sustainability and ethical practises.
          <br />
          <br />
          With professionals trained in-house from production to delivery, rest
          assured that your orders are in safe hands.
          <br />
          <br />
        </p>
        <img
          src="/Images/coffee-roaster.jpg"
          alt="Coffee being roasted by trained professional"
          className="roaster fadein"
        />
      </div>
    </div>
  );
}

export default Story;
