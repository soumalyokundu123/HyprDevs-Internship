// Save session data (remember me or session only)
function saveUserSession(username) {
  const rememberMe = document.getElementById("remember-me");
  if (rememberMe && rememberMe.checked) {
    localStorage.setItem("sessionUser", username);
  } else {
    sessionStorage.setItem("sessionUser", username);
  }
}

// Signup function
function signup() {
  const username = document.getElementById("signup-username").value.trim();
  const password = document.getElementById("signup-password").value.trim();
  const confirm = document.getElementById("signup-confirm").value.trim();
  const msg = document.getElementById("signup-msg");

  if (!username || !password || !confirm) {
    msg.textContent = "All fields are required.";
    msg.style.color = "red";
    return;
  }

  if (password !== confirm) {
    msg.textContent = "Passwords do not match.";
    msg.style.color = "red";
    return;
  }

  localStorage.setItem("user", JSON.stringify({ username, password }));
  msg.textContent = "Signup successful! Redirecting...";
  msg.style.color = "green";

  setTimeout(() => {
    window.location.href = "index.html";
  }, 1500);
}

// Login function
function login() {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const msg = document.getElementById("login-msg");

  const user = JSON.parse(localStorage.getItem("user"));

  if (user && username === user.username && password === user.password) {
    msg.textContent = "Login successful!";
    msg.style.color = "green";
    saveUserSession(username);
    setTimeout(() => {
      alert("Redirecting to dashboard (not implemented)");
    }, 1000);
  } else {
    msg.textContent = "Invalid username or password.";
    msg.style.color = "red";
  }
}

// Auto-fill remembered user on login page
window.onload = () => {
  const rememberedUser = localStorage.getItem("sessionUser") || sessionStorage.getItem("sessionUser");
  if (rememberedUser && document.getElementById("login-username")) {
    document.getElementById("login-username").value = rememberedUser;
    document.getElementById("remember-me").checked = true;
  }
};