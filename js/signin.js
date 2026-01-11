document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signin-form");
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // IMPORTANT: control submit ourselves

    let isValid = true;

    // Email validation
    if (!email.checkValidity()) {
      showError(email, "Please enter a valid email address.");
      isValid = false;
    } else {
      clearError(email);
    }

    // Password validation
    if (!password.checkValidity() || password.value.length < 6) {
      showError(password, "Password must be at least 6 characters.");
      isValid = false;
    } else {
      clearError(password);
    }

    // STOP here if invalid
    if (!isValid) return;

    // -------- SESSION CREATION (FRONTEND ONLY) --------

    // TEMP role logic (backend will replace this later)
    const role = email.value.includes("admin") ? "admin" : "user";

    localStorage.setItem(
      "queuepilotUser",
      JSON.stringify({
        name: "Deepti",
        email: email.value,
        role: role,
        loggedIn: true
      })
    );

    // -------- REDIRECT --------
    if (role === "admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "user.html";
    }
  });

  function showError(input, message) {
    const error = document.getElementById(`${input.id}-error`);
    if (error) error.textContent = message;
    input.setAttribute("aria-invalid", "true");
  }

  function clearError(input) {
    const error = document.getElementById(`${input.id}-error`);
    if (error) error.textContent = "";
    input.removeAttribute("aria-invalid");
  }
});
