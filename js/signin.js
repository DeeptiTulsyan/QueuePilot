document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signin-form");
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  form.addEventListener("submit", (e) => {
    let isValid = true;

    // Email validation
    if (!email.checkValidity()) {
      showError(email, "Please enter a valid email address.");
      isValid = false;
    } else {
      clearError(email);
    }

    // Password validation
    if (!password.checkValidity()) {
      showError(password, "Password must be at least 6 characters.");
      isValid = false;
    } else {
      clearError(password);
    }

    if (!isValid) {
      e.preventDefault();
    }
  });

  function showError(input, message) {
    const error = document.getElementById(`${input.id}-error`);
    error.textContent = message;
    input.setAttribute("aria-invalid", "true");
  }

  function clearError(input) {
    const error = document.getElementById(`${input.id}-error`);
    error.textContent = "";
    input.removeAttribute("aria-invalid");
  }
});
