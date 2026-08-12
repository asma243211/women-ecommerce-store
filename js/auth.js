const CUSTOMER_KEY = "lumera_customer";
const CUSTOMERS_KEY = "lumera_customers";

function getCustomers() {
  return JSON.parse(localStorage.getItem(CUSTOMERS_KEY) || "[]");
}

function saveCustomers(customers) {
  localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(customers));
}

function getCurrentCustomer() {
  const customerData = localStorage.getItem(CUSTOMER_KEY);
  if (!customerData) return null;
  try {
    return JSON.parse(customerData);
  } catch {
    return null;
  }
}

function setCurrentCustomer(customer) {
  if (customer) {
    localStorage.setItem(CUSTOMER_KEY, JSON.stringify(customer));
  } else {
    localStorage.removeItem(CUSTOMER_KEY);
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  const re = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{4,10}$/;
  return re.test(phone.replace(/\s/g, ""));
}

function validatePassword(password) {
  if (password.length < 8) return "Password must be at least 8 characters";
  if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
  if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter";
  if (!/[0-9]/.test(password)) return "Password must contain at least one number";
  return null;
}

function showError(input, message) {
  input.classList.add("error");
  const errorEl = input.parentElement.querySelector(".error-message");
  if (errorEl) errorEl.textContent = message;
}

function clearError(input) {
  input.classList.remove("error");
  const errorEl = input.parentElement.querySelector(".error-message");
  if (errorEl) errorEl.textContent = "";
}

function toast(message, type = "success") {
  let t = document.getElementById("toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "toast";
    document.body.appendChild(t);
  }
  t.textContent = message;
  t.className = "show " + type;
  setTimeout(() => t.classList.remove("show"), 2500);
}

function updateAuthUI() {
  const customer = getCurrentCustomer();
  const authContainer = document.querySelector(".header-auth");
  const userContainer = document.querySelector(".header-user");

  if (customer) {
    if (authContainer) authContainer.style.display = "none";
    if (userContainer) {
      userContainer.style.display = "flex";
      const nameEl = userContainer.querySelector(".user-name");
      if (nameEl) nameEl.textContent = customer.name.split(" ")[0];
    }
  } else {
    if (authContainer) authContainer.style.display = "flex";
    if (userContainer) userContainer.style.display = "none";
  }
}

function initAuthUI() {
  const headerActions = document.querySelector(".header-actions");
  if (!headerActions) return;

  let authContainer = headerActions.querySelector(".header-auth");
  let userContainer = headerActions.querySelector(".header-user");

  if (!authContainer) {
    authContainer = document.createElement("div");
    authContainer.className = "header-auth";
    authContainer.innerHTML = `
      <a href="login.html" class="btn-signin">Sign In</a>
      <a href="register.html" class="btn-register">Create Account</a>
    `;
    const themeToggle = headerActions.querySelector("#themeToggle");
    if (themeToggle) {
      themeToggle.insertAdjacentElement("afterend", authContainer);
    } else {
      headerActions.insertBefore(authContainer, headerActions.firstChild);
    }
  }

  if (!userContainer) {
    userContainer = document.createElement("div");
    userContainer.className = "header-user";
    userContainer.innerHTML = `
      <span class="user-name"></span>
      <div class="user-dropdown">
        <button class="user-dropdown-btn" aria-label="Account menu" aria-expanded="false">
          My Account ▾
        </button>
        <div class="user-dropdown-menu" role="menu">
          <a href="account.html" role="menuitem">My Account</a>
          <a href="account.html#orders" role="menuitem">My Orders</a>
          <a href="wishlist.html" role="menuitem">Wishlist</a>
          <div class="divider"></div>
          <button class="logout-btn" role="menuitem">Logout</button>
        </div>
      </div>
    `;
    const themeToggle = headerActions.querySelector("#themeToggle");
    if (themeToggle) {
      themeToggle.insertAdjacentElement("afterend", userContainer);
    } else {
      headerActions.insertBefore(userContainer, headerActions.firstChild);
    }

    const dropdownBtn = userContainer.querySelector(".user-dropdown-btn");
    const dropdownMenu = userContainer.querySelector(".user-dropdown-menu");

    dropdownBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdownMenu.classList.toggle("open");
      dropdownBtn.setAttribute("aria-expanded", dropdownMenu.classList.contains("open"));
    });

    document.addEventListener("click", () => {
      dropdownMenu.classList.remove("open");
      dropdownBtn.setAttribute("aria-expanded", "false");
    });

    dropdownMenu.addEventListener("click", (e) => e.stopPropagation());

    const logoutBtn = userContainer.querySelector(".logout-btn");
    logoutBtn.addEventListener("click", () => {
      logout();
    });
  }

  updateAuthUI();
}

function login(email, password) {
  const customers = getCustomers();
  const customer = customers.find(c => c.email.toLowerCase() === email.toLowerCase() && c.password === password);

  if (!customer) {
    return { success: false, message: "Invalid email or password" };
  }

  const { password: _, ...customerData } = customer;
  setCurrentCustomer(customerData);
  updateAuthUI();
  return { success: true, customer: customerData };
}

function register(data) {
  const customers = getCustomers();

  if (customers.some(c => c.email.toLowerCase() === data.email.toLowerCase())) {
    return { success: false, message: "An account with this email already exists" };
  }

  const newCustomer = {
    id: Date.now(),
    name: data.name,
    email: data.email,
    phone: data.phone,
    password: data.password,
    createdAt: new Date().toISOString()
  };

  customers.push(newCustomer);
  saveCustomers(customers);

  const { password: _, ...customerData } = newCustomer;
  setCurrentCustomer(customerData);
  updateAuthUI();
  return { success: true, customer: customerData };
}

function logout() {
  setCurrentCustomer(null);
  updateAuthUI();
  toast("You have been logged out", "info");
  setTimeout(() => {
    window.location.href = "index.html";
  }, 800);
}

function requireAuth(redirectTo = "login.html") {
  const customer = getCurrentCustomer();
  if (!customer) {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    if (currentPath !== "login.html" && currentPath !== "register.html") {
      sessionStorage.setItem("redirectAfterLogin", currentPath);
    }
    window.location.href = redirectTo;
    return false;
  }
  return true;
}

function getRedirectUrl() {
  const redirect = sessionStorage.getItem("redirectAfterLogin");
  sessionStorage.removeItem("redirectAfterLogin");
  return redirect || "index.html";
}

document.addEventListener("DOMContentLoaded", initAuthUI);