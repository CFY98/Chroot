//IMPORTS
import styles from "../../css/sections/Footer.module.css";

function Footer() {
	return (
		<div className={`${styles.socials} fadein`}>
			<a
				href="https://github.com/CFY98/Chroot"
				className="fa-brands fa-github"
			>
				<span className="sr-only">GitHub repository for Chroot</span>
			</a>
		</div>
	);
}

export default Footer;
