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

// Ensure queue array exists
if (!localStorage.getItem("queuepilotTokens")) {
  localStorage.setItem("queuepilotTokens", JSON.stringify([]));
}

// ================= RENDER =================
function renderUserQueue() {
  const tokens = JSON.parse(localStorage.getItem("queuepilotTokens")) || [];
  const myToken = localStorage.getItem("userToken");

  usernameEl.textContent = session.name || "User";

  // If user not in queue
  if (!myToken) {
    tokenEl.textContent = "--";
    peopleAheadEl.textContent = "--";
    etaEl.textContent = "--";
    statusEl.textContent = "Not in queue";

    generateBtn.disabled = false;
    cancelBtn.disabled = true;
    return;
  }

  const myEntry = tokens.find(t => t.token === myToken);

  if (!myEntry) {
    statusEl.textContent = "Token expired";
    localStorage.removeItem("userToken");
    generateBtn.disabled = false;
    cancelBtn.disabled = true;
    return;
  }

  // If completed → auto release
  if (myEntry.status === "COMPLETED") {
    statusEl.textContent = "Consultation completed";
    localStorage.removeItem("userToken");

    tokenEl.textContent = "--";
    peopleAheadEl.textContent = "--";
    etaEl.textContent = "--";

    generateBtn.disabled = false;
    cancelBtn.disabled = true;
    return;
  }

  // Proper queue position calculation
  const waitingTokens = tokens.filter(t => t.status === "WAITING");
  const peopleAhead = waitingTokens.findIndex(t => t.token === myToken);

  tokenEl.textContent = myEntry.token;
  peopleAheadEl.textContent = peopleAhead >= 0 ? peopleAhead : 0;
  etaEl.textContent = peopleAhead >= 0 ? peopleAhead * 5 : 0;
  statusEl.textContent = myEntry.status;

  // Button state logic
  generateBtn.disabled =
    myEntry.status === "WAITING" || myEntry.status === "NOW_SERVING";

  cancelBtn.disabled = myEntry.status !== "WAITING";
}

// ================= JOIN QUEUE =================
generateBtn.addEventListener("click", () => {
  let tokens = JSON.parse(localStorage.getItem("queuepilotTokens")) || [];

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