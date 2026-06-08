//IMPORTS
import { useNavigate } from "react-router-dom";
import styles from "../../css/sections/Header.module.css";

function Header({ tuiMode, setTuiMode }) {
	const navigate = useNavigate();

	function checkMode() {
		const newMode = !tuiMode;
		setTuiMode(newMode);
		navigate(newMode ? "/terminal" : "/");
	}

	return (
		<div className={styles.titlebar}>
			<span className={`${styles.dot} ${styles["dot-r"]}`}></span>
			<span className={`${styles.dot} ${styles["dot-y"]}`}></span>
			<span className={`${styles.dot} ${styles["dot-g"]}`}></span>
			<button
				type="button"
				className={styles["titlebar-text"]}
				data-text={tuiMode ? "Terminal Mode" : "Visual Mode"}
				data-hover={tuiMode ? "Change: Visual Mode" : "Change: Terminal Mode"}
				onClick={checkMode}
			></button>
		</div>
	);
}

export default Header;
