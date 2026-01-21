// ================= AUTH =================
const session = JSON.parse(localStorage.getItem("queuepilotUser"));

if (!session || session.loggedIn !== true || session.role !== "admin") {
  window.location.href = "signin.html";
}

// ================= DOM =================
const tokenList = document.getElementById("token-list");
const serveTokenBtn = document.getElementById("serve-token");

// ================= RENDER TOKENS =================
function renderTokens() {
  const tokens = JSON.parse(localStorage.getItem("queuepilotTokens")) || [];

  tokenList.innerHTML = "";

  if (tokens.length === 0) {
    tokenList.innerHTML = "<li>No tokens in queue</li>";
    return;
  }

  tokens.forEach(t => {
    const li = document.createElement("li");
    li.textContent = `${t.token} - ${t.name} (${t.status})`;
    tokenList.appendChild(li);
  });
}

// ================= SERVE NEXT =================
serveTokenBtn.addEventListener("click", () => {
  const tokens = JSON.parse(localStorage.getItem("queuepilotTokens")) || [];

  const nextIndex = tokens.findIndex(t => t.status === "WAITING");

  if (nextIndex === -1) {
    alert("No waiting tokens");
    return;
  }

  // Mark previous NOW_SERVING as COMPLETED
  tokens.forEach(t => {
    if (t.status === "NOW_SERVING") {
      t.status = "COMPLETED";
    }
  });

  // Serve next token
  tokens[nextIndex].status = "NOW_SERVING";

  localStorage.setItem("queuepilotTokens", JSON.stringify(tokens));
  renderTokens();
});

// ================= LOGOUT =================
document.querySelector(".logout").addEventListener("click", () => {
  localStorage.removeItem("queuepilotUser");
  window.location.href = "signin.html";
});

// ================= INIT =================
renderTokens();
