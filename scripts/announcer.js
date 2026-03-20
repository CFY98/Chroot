// ANNOUNCEMENTS
export function announce(message) {
  const announcer =
    document.getElementById("announcer") ||
    window.parent.document.getElementById("announcer");

  console.log("announcer found:", announcer); // add this
  console.log("message:", message);

  if (!announcer) return;
  announcer.textContent = "";
  announcer.textContent = message;
}
