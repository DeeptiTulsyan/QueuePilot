document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signup-form");

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  form.addEventListener("submit", (e) => {
    let isValid = true;

    isValid &= validateField(name, "Name must be at least 3 characters.");
    isValid &= validateField(email, "Enter a valid email address.");
    isValid &= validateField(password, "Password must be at least 6 characters.");

    if (!isValid) {
      e.preventDefault();
    }
  });

  function validateField(input, message) {
    const error = document.getElementById(`${input.id}-error`);

    if (!input.checkValidity()) {
      error.textContent = message;
      input.setAttribute("aria-invalid", "true");
      return false;
    }

    error.textContent = "";
    input.removeAttribute("aria-invalid");
    return true;
  }
});
