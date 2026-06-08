// ANNOUNCEMENTS
export function announce(message) {
	const announcer =
		document.getElementById("announcer") ||
		window.parent.document.getElementById("announcer");

	if (!announcer) return;
	announcer.textContent = "";
	announcer.textContent = message;
}
