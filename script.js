// Utility: Show a specific section and hide the rest
function showSection(section) {
    // Hide all sections
    document.getElementById('home-section').style.display = 'none';
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('register-section').style.display = 'none';
    document.getElementById('dashboard-section').style.display = 'none';
    document.getElementById('projects-section').style.display = 'none';

    // Display the requested section
    if (section === 'home') {
      document.getElementById('home-section').style.display = 'block';
    } else if (section === 'login') {
      document.getElementById('login-section').style.display = 'block';
    } else if (section === 'register') {
      document.getElementById('register-section').style.display = 'block';
    } else if (section === 'dashboard') {
      document.getElementById('dashboard-section').style.display = 'block';
    } else if (section === 'projects') {
        document.getElementById('projects-section').style.display = 'block';
    }
      
  }

  function startSessionTimer() {
    const sessionStart = localStorage.getItem("sessionStart");
    if (!sessionStart) return;
  
    const sessionLength = 60 * 60 * 1000; // 1 hour
    const countdownElement = document.createElement("p");
    countdownElement.id = "session-timer";
    document.getElementById("dashboard-section").appendChild(countdownElement);
  
    function updateTimer() {
      const now = Date.now();
      const timeLeft = sessionLength - (now - sessionStart);
  
      if (timeLeft <= 0) {
        logout();
        return;
      }
  
      const mins = Math.floor(timeLeft / 60000);
      const secs = Math.floor((timeLeft % 60000) / 1000);
      countdownElement.textContent = `Session expires in ${mins}m ${secs}s`;
    }
  
    updateTimer();
    setInterval(updateTimer, 1000);
  }
  const loginTime = new Date(parseInt(sessionStart));
const expiryTime = new Date(parseInt(sessionStart) + 60 * 60 * 1000);

document.getElementById("session-info").innerHTML = `
  <small>
    Logged in at: ${loginTime.toLocaleTimeString()} <br>
    Session expires at: ${expiryTime.toLocaleTimeString()}
  </small>
`;

  
  // Simulated login function
  function login() {
    const username = document.getElementById("login-username").value;
    const user = localStorage.getItem(username);
    
    if (user) {
      localStorage.setItem("sessionUser", username);
      localStorage.setItem("sessionStart", Date.now());
      showSection("dashboard");
      toggleNavLinks(true);

      document.getElementById("user-name").textContent = username;
      startSessionTimer();
      showToast("Login successful!");
      generateAvatar(username);

    } else {
      showToast("User not found. Please register.");
    }
  }
  function generateAvatar(name) {
    const avatar = document.getElementById("avatar");
    avatar.textContent = name.charAt(0).toUpperCase();
  }
  
  

  // Simulated registration function (for demo, it works like login)
  function register() {
    const name = document.getElementById("register-username").value;
    if (name) {
      if (localStorage.getItem(name)) {
        showToast("User already exists. Try logging in.");
      } else {
        const userData = {
          name,
          loginTime: Date.now()
        };
        localStorage.setItem(name, JSON.stringify(userData));
        showToast("Registration successful. Please log in.");
        showSection("login");
      }
    } else {
      showToast("Please enter a name.");
    }
  }
  
  
  // Load the dashboard if the user session is valid
  function loadDashboard() {
    const sessionUser = localStorage.getItem("sessionUser");
    const sessionStart = localStorage.getItem("sessionStart");
  
    if (sessionUser && sessionStart) {
      const timePassed = Date.now() - parseInt(sessionStart);
      const oneHour = 60 * 60 * 1000;
  
      if (timePassed < oneHour) {
        document.getElementById("user-name").textContent = sessionUser;
        showSection("dashboard");
        generateAvatar(username);
        startSessionTimer();
      } else {
        logout();
      }
    } else {
      showSection("home");
      
    }
  }
  
  
  // Logout: clear localStorage and return to the homepage
  function logout() {
    localStorage.removeItem("sessionUser");
    localStorage.removeItem("sessionStart");
    showToast("You have been logged out.");
    showSection("home");
    toggleNavLinks(false);

  }
  
  
  // When the page loads, check the session and display the correct section
  window.onload = () => {
    loadDashboard();
  };
  function toggleTheme() {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
  }
  const sessionUser = localStorage.getItem("sessionUser");
toggleNavLinks(!!sessionUser); // true if logged in

  
  // Apply theme on load
  window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark");
    }
  });
  function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);
  
    setTimeout(() => {
      toast.remove();
    }, 3000);
    }
    function toggleNavLinks(loggedIn) {
        const loginLink = document.getElementById("nav-login");
        const registerLink = document.getElementById("nav-register");
      
        if (loggedIn) {
          loginLink.style.display = "none";
          registerLink.style.display = "none";
        } else {
          loginLink.style.display = "inline";
          registerLink.style.display = "inline";
        }
      }
      function toggleDropdown() {
        const dropdown = document.getElementById("avatar-dropdown");
        dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
      }
      
      // Close dropdown when clicking outside
      window.addEventListener("click", function (e) {
        const avatar = document.getElementById("avatar");
        const dropdown = document.getElementById("avatar-dropdown");
        if (!avatar.contains(e.target) && !dropdown.contains(e.target)) {
          dropdown.style.display = "none";
        }
      });
      
      function deleteAccount() {
        const sessionUser = localStorage.getItem("sessionUser");
        if (sessionUser && confirm("Are you sure you want to delete your account?")) {
          localStorage.removeItem(sessionUser);
          logout();
          showToast("Account deleted successfully.");
        }
      }
      
        function changePassword() {
            const sessionUser = localStorage.getItem("sessionUser");
            const newPassword = prompt("Enter your new password:");
            if (sessionUser && newPassword) {
            const userData = JSON.parse(localStorage.getItem(sessionUser));
            userData.password = newPassword;
            localStorage.setItem(sessionUser, JSON.stringify(userData));
            showToast("Password changed successfully.");
            }
        }      