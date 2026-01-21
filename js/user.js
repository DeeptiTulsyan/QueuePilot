// ================= AUTH CHECK =================
const session = JSON.parse(localStorage.getItem("queuepilotUser"));

if (!session || session.loggedIn !== true || session.role !== "user") {
  window.location.href = "signin.html";
}

// ================= DOM =================
const usernameEl = document.getElementById("username");
const tokenEl = document.getElementById("token-number");
const etaEl = document.getElementById("eta");
const peopleAheadEl = document.getElementById("people-ahead");
const statusEl = document.getElementById("queue-status");

const generateBtn = document.getElementById("generate-token");
const cancelBtn = document.getElementById("cancel-btn");

// ================= RENDER =================
function renderUserQueue() {
  const tokens = JSON.parse(localStorage.getItem("queuepilotTokens")) || [];
  const myToken = localStorage.getItem("userToken");

  usernameEl.textContent = session.name || "User";

  if (!myToken) {
    tokenEl.textContent = "--";
    peopleAheadEl.textContent = "--";
    etaEl.textContent = "--";
    statusEl.textContent = "Not in queue";
    return;
  }

  const index = tokens.findIndex(t => t.token === myToken);

  if (index === -1) {
    statusEl.textContent = "Token expired";
    return;
  }

  const myEntry = tokens[index];

  tokenEl.textContent = myEntry.token;
  peopleAheadEl.textContent = index;
  etaEl.textContent = index * 5;
  statusEl.textContent = myEntry.status;

  cancelBtn.disabled = myEntry.status !== "WAITING";
}

// ================= JOIN QUEUE =================
generateBtn.addEventListener("click", () => {
  let tokens = JSON.parse(localStorage.getItem("queuepilotTokens")) || [];

  // Prevent duplicate token
  if (localStorage.getItem("userToken")) return;

  const nextToken = `A-${tokens.length + 1}`;

  tokens.push({
    token: nextToken,
    name: session.name || "User",
    status: "WAITING"
  });

  localStorage.setItem("queuepilotTokens", JSON.stringify(tokens));
  localStorage.setItem("userToken", nextToken);

  renderUserQueue();
});

// ================= CANCEL TOKEN =================
cancelBtn.addEventListener("click", () => {
  let tokens = JSON.parse(localStorage.getItem("queuepilotTokens")) || [];
  const myToken = localStorage.getItem("userToken");

  tokens = tokens.map(t =>
    t.token === myToken ? { ...t, status: "CANCELLED" } : t
  );

  localStorage.setItem("queuepilotTokens", JSON.stringify(tokens));
  localStorage.removeItem("userToken");
  renderUserQueue();
});

// ================= AUTO REFRESH =================
setInterval(renderUserQueue, 5000);

// ================= LOGOUT =================
document.querySelector(".logout").addEventListener("click", () => {
  localStorage.removeItem("queuepilotUser");
  localStorage.removeItem("userToken");
  window.location.href = "signin.html";
});

// ================= INIT =================
renderUserQueue();
