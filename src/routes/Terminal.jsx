//INPUTS

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/ui/Terminal.module.css";
import { cleanupTerminal, initTerminal } from "../terminal/terminal.js";

function Terminal() {
	const navigate = useNavigate();
	const initialised = useRef(false);

	useEffect(() => {
		if (initialised.current) return () => cleanupTerminal();
		initialised.current = true;
		initTerminal(navigate);
		return () => cleanupTerminal();
	}, []);

	return (
		<section
			className={`${styles.terminal} fadein`}
			data-component="terminal"
			aria-label="terminal navigation"
		>
			<div className={`${styles["input-row"]} fadein`}>
				<span className={styles.prompt} aria-hidden="true">
					site@chroot <span className={`${styles.path} fadein`}> ~ $</span>
				</span>
				<input
					className={`${styles["cmd-input"]} fadein`}
					data-component="cmd-input"
					type="text"
					autoComplete="off"
					autoCorrect="off"
					spellCheck="off"
					placeholder="type here"
					aria-label="Input commands for the terminal here"
				/>
			</div>
			<div className="terminal-output" aria-hidden="true"></div>
		</section>
	);
}

export default Terminal;
