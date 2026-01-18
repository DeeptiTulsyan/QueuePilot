// Protect admin page
const session = JSON.parse(localStorage.getItem("queuepilotUser"));

if (!session || session.loggedIn !== true || session.role !== "admin") {
  window.location.href = "signin.html";
}

// INITIAL QUEUE (only if not exists)
if (!localStorage.getItem("queuepilotQueue")) {
  localStorage.setItem(
    "queuepilotQueue",
    JSON.stringify({
      currentToken: "A-17",
      peopleAhead: 4,
      eta: 25,
      status: "WAITING"
    })
  );
}

// DOM
const serveBtn = document.getElementById("serve-next");
const cancelBtn = document.getElementById("cancel-queue");

// Serve next patient
serveBtn.addEventListener("click", () => {
  const queue = JSON.parse(localStorage.getItem("queuepilotQueue"));

  if (queue.peopleAhead > 0) {
    queue.peopleAhead -= 1;
    queue.eta -= 5;
  }

  if (queue.peopleAhead === 0) {
    queue.status = "NOW_SERVING";
  }

  localStorage.setItem("queuepilotQueue", JSON.stringify(queue));
});

// Cancel queue
cancelBtn.addEventListener("click", () => {
  localStorage.setItem(
    "queuepilotQueue",
    JSON.stringify({
      currentToken: "--",
      peopleAhead: 0,
      eta: 0,
      status: "CANCELLED"
    })
  );
});
const tokenEl = document.getElementById("current-token");
const peopleAheadEl = document.getElementById("people-ahead");
const etaEl = document.getElementById("eta");
const statusEl = document.getElementById("queue-status");

function loadQueue() {
  const queue = JSON.parse(localStorage.getItem("queuepilotQueue"));
  if (!queue) return;

  tokenEl.textContent = queue.currentToken;
  peopleAheadEl.textContent = queue.peopleAhead;
  etaEl.textContent = queue.eta;
  statusEl.textContent = queue.status;
}

loadQueue();

// After serve / cancel
serveBtn.addEventListener("click", () => {
  // existing logic
  loadQueue();
});

cancelBtn.addEventListener("click", () => {
  // existing logic
  loadQueue();
});
const tokenList = document.getElementById("token-list");
const serveTokenBtn = document.getElementById("serve-token");

function renderTokens() {
  const tokens = JSON.parse(localStorage.getItem("queuepilotTokens")) || [];

  tokenList.innerHTML = "";

  tokens.forEach(t => {
    const li = document.createElement("li");
    li.textContent = `${t.token} - ${t.name} (${t.status})`;
    tokenList.appendChild(li);
  });
}

serveTokenBtn.addEventListener("click", () => {
  const tokens = JSON.parse(localStorage.getItem("queuepilotTokens")) || [];

  const next = tokens.find(t => t.status === "WAITING");
  if (!next) return alert("No tokens waiting");

  next.status = "NOW_SERVING";
  localStorage.setItem("queuepilotTokens", JSON.stringify(tokens));
  renderTokens();
});

renderTokens();
