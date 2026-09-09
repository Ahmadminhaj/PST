const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const params = new URLSearchParams(window.location.search);
const redirectUrl = params.get("next") || "index.html";

if (localStorage.getItem("pst_logged_in") === "true") {
  window.location.replace(redirectUrl);
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    loginMessage.textContent = "Please enter both email and password.";
    return;
  }

  const validEmail = "user@pst.com";
  const validPassword = "password123";

  if (email !== validEmail || password !== validPassword) {
    loginMessage.textContent = "Invalid email or password.";
    return;
  }

  localStorage.setItem("pst_logged_in", "true");
  localStorage.setItem("pst_user_email", email);
  window.location.replace(redirectUrl);
});
