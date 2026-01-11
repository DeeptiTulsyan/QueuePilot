// Simulated user queue data (later comes from backend)
const session = JSON.parse(localStorage.getItem("queuepilotUser"));

if (!session || session.loggedIn !== true || session.role !== "user") {
  window.location.href = "signin.html";
}
const queueData = {
  username: "Deepti",
  token: "A-17",
  eta: 25,
  peopleAhead: 4,
  status: "Waiting"
};

// DOM elements
const usernameEl = document.getElementById("username");
const tokenEl = document.getElementById("token-number");
const etaEl = document.getElementById("eta");
const peopleAheadEl = document.getElementById("people-ahead");
const statusEl = document.getElementById("queue-status");

const refreshBtn = document.getElementById("refresh-btn");
const cancelBtn = document.getElementById("cancel-btn");

// Initial render
renderQueue();

// Refresh button logic
refreshBtn.addEventListener("click", () => {
  simulateQueueProgress();
  renderQueue();
});

// Cancel token logic
cancelBtn.addEventListener("click", () => {
  queueData.status = "Cancelled";
  queueData.peopleAhead = 0;
  queueData.eta = 0;
  renderQueue();

  refreshBtn.disabled = true;
  cancelBtn.disabled = true;
});

// Functions
function renderQueue() {
  usernameEl.textContent = queueData.username;
  tokenEl.textContent = queueData.token;
  etaEl.textContent = queueData.eta;
  peopleAheadEl.textContent = queueData.peopleAhead;
  statusEl.textContent = queueData.status;
}

function simulateQueueProgress() {
  if (queueData.peopleAhead > 0) {
    queueData.peopleAhead -= 1;
    queueData.eta -= 5;
  }

  if (queueData.peopleAhead === 0) {
    queueData.status = "Now Serving";
  }
}
document.querySelector(".logout").addEventListener("click", () => {
  localStorage.removeItem("queuepilotUser");
  window.location.href = "signin.html";
});
