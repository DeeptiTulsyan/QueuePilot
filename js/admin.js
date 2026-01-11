// Protect admin page
const session = JSON.parse(localStorage.getItem("queuepilotUser"));

if (!session || session.loggedIn !== true || session.role !== "admin") {
  window.location.href = "signin.html";
}
document.querySelector(".logout").addEventListener("click", () => {
  localStorage.removeItem("queuepilotUser");
  window.location.href = "signin.html";
});
