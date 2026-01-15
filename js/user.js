// AUTH CHECK
const session = JSON.parse(localStorage.getItem("queuepilotUser"));

if (!session || session.loggedIn !== true || session.role !== "user") {
  window.location.href = "signin.html";
}

// DOM ELEMENTS
const usernameEl = document.getElementById("username");
const tokenEl = document.getElementById("token-number");
const etaEl = document.getElementById("eta");
const peopleAheadEl = document.getElementById("people-ahead");
const statusEl = document.getElementById("queue-status");

const refreshBtn = document.getElementById("refresh-btn");
const cancelBtn = document.getElementById("cancel-btn");

// LOAD QUEUE FROM STORAGE
function loadQueue() {
  const queue = JSON.parse(localStorage.getItem("queuepilotQueue"));

  if (!queue) {
    statusEl.textContent = "No active queue";
    refreshBtn.disabled = true;
    cancelBtn.disabled = true;
    return;
  }

  usernameEl.textContent = session.username;
  tokenEl.textContent = queue.currentToken;
  etaEl.textContent = queue.eta;
  peopleAheadEl.textContent = queue.peopleAhead;
  statusEl.textContent = queue.status;

  if (queue.status === "CANCELLED") {
    refreshBtn.disabled = true;
    cancelBtn.disabled = true;
  }
}
// AUTO-REFRESH every 5 seconds
setInterval(() => {
  loadQueue();
}, 5000);

// REFRESH BUTTON (READ ONLY)
refreshBtn.addEventListener("click", () => {
  loadQueue();
});

// USER CANCEL REQUEST (FLAG ONLY)
cancelBtn.addEventListener("click", () => {
  const queue = JSON.parse(localStorage.getItem("queuepilotQueue"));
  if (!queue) return;

  queue.status = "CANCEL REQUESTED";
  localStorage.setItem("queuepilotQueue", JSON.stringify(queue));

  statusEl.textContent = "Cancel requested";
  cancelBtn.disabled = true;
});

// LOGOUT
document.querySelector(".logout").addEventListener("click", () => {
  localStorage.removeItem("queuepilotUser");
  window.location.href = "signin.html";
});

// INITIAL LOAD
loadQueue();
