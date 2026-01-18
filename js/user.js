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
const generateBtn = document.getElementById("generate-token");

generateBtn.addEventListener("click", () => {
  const tokens = JSON.parse(localStorage.getItem("queuepilotTokens")) || [];

  const nextNumber = tokens.length + 1;
  const newToken = `A-${nextNumber}`;

  const newEntry = {
    token: newToken,
    name: session.username,
    status: "WAITING"
  };

  tokens.push(newEntry);
  localStorage.setItem("queuepilotTokens", JSON.stringify(tokens));

  localStorage.setItem("userToken", newToken);

  alert(`Your token is ${newToken}`);
  loadQueuePosition();
});
function loadQueuePosition() {
  const tokens = JSON.parse(localStorage.getItem("queuepilotTokens")) || [];
  const myToken = localStorage.getItem("userToken");

  if (!myToken) return;

  const index = tokens.findIndex(t => t.token === myToken);
  const peopleAhead = index;

  document.getElementById("token-number").textContent = myToken;
  document.getElementById("people-ahead").textContent = peopleAhead;
}
loadQueuePosition();
