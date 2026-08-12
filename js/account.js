const ORDERS_KEY = "lumera_orders";

function getOrders() {
  return JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
}

function saveOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

function getProducts() {
  return JSON.parse(localStorage.getItem("lumera_products") || "[]");
}

function getWish() {
  return JSON.parse(localStorage.getItem("lumera_wishlist") || "[]");
}

function money(n) {
  return "৳" + Number(n).toLocaleString("en-BD");
}

function getInitials(name) {
  return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

function initAccountPage() {
  if (!requireAuth()) return;

  const customer = getCurrentCustomer();
  if (!customer) return;

  document.getElementById("accountAvatar").textContent = getInitials(customer.name);
  document.getElementById("accountName").textContent = customer.name;
  document.getElementById("accountEmail").textContent = customer.email;

  document.getElementById("profileName").value = customer.name;
  document.getElementById("profileEmail").value = customer.email;
  document.getElementById("profilePhone").value = customer.phone || "";

  initNavigation();
  loadOrders();
  loadWishlist();
  initProfileForm();
  initPasswordForm();
  initSidebarLogout();
}

function initNavigation() {
  const navLinks = document.querySelectorAll(".account-nav a[data-section]");
  const sections = document.querySelectorAll(".account-section");

  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const sectionId = link.dataset.section;

      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      sections.forEach(s => s.classList.remove("active"));
      document.getElementById(sectionId).classList.add("active");

      if (window.innerWidth < 900) {
        document.querySelector(".account-sidebar").style.display = "none";
      }
    });
  });
}

function initProfileForm() {
  const form = document.getElementById("profileForm");
  const inputs = form.querySelectorAll("input");

  inputs.forEach(input => {
    input.addEventListener("input", () => clearError(input));
    input.addEventListener("blur", () => validateProfileField(input));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;
    inputs.forEach(input => {
      if (!validateProfileField(input)) isValid = false;
    });

    if (!isValid) return;

    const customers = getCustomers();
    const customerIndex = customers.findIndex(c => c.id === getCurrentCustomer().id);

    if (customerIndex !== -1) {
      customers[customerIndex].name = document.getElementById("profileName").value.trim();
      customers[customerIndex].email = document.getElementById("profileEmail").value.trim();
      customers[customerIndex].phone = document.getElementById("profilePhone").value.trim();

      saveCustomers(customers);

      const updatedCustomer = { ...customers[customerIndex] };
      delete updatedCustomer.password;
      setCurrentCustomer(updatedCustomer);

      document.getElementById("accountName").textContent = updatedCustomer.name;
      document.getElementById("accountEmail").textContent = updatedCustomer.email;
      document.getElementById("accountAvatar").textContent = getInitials(updatedCustomer.name);

      updateAuthUI();
      toast("Profile updated successfully");
    }
  });
}

function validateProfileField(input) {
  const value = input.value.trim();

  switch (input.id) {
    case "profileName":
      if (!value) {
        showError(input, "Name is required");
        return false;
      }
      if (value.length < 2) {
        showError(input, "Name must be at least 2 characters");
        return false;
      }
      break;
    case "profileEmail":
      if (!value) {
        showError(input, "Email is required");
        return false;
      }
      if (!validateEmail(value)) {
        showError(input, "Please enter a valid email address");
        return false;
      }
      const customers = getCustomers();
      const currentCustomer = getCurrentCustomer();
      if (customers.some(c => c.email.toLowerCase() === value.toLowerCase() && c.id !== currentCustomer.id)) {
        showError(input, "This email is already in use");
        return false;
      }
      break;
    case "profilePhone":
      if (value && !validatePhone(value)) {
        showError(input, "Please enter a valid phone number");
        return false;
      }
      break;
  }

  clearError(input);
  return true;
}

function initPasswordForm() {
  const btn = document.getElementById("changePasswordBtn");
  const currentPassword = document.getElementById("currentPassword");
  const newPassword = document.getElementById("newPassword");
  const confirmNewPassword = document.getElementById("confirmNewPassword");

  [currentPassword, newPassword, confirmNewPassword].forEach(input => {
    input.addEventListener("input", () => clearError(input));
    input.addEventListener("blur", () => validatePasswordField(input));
  });

  btn.addEventListener("click", () => {
    let isValid = true;
    [currentPassword, newPassword, confirmNewPassword].forEach(input => {
      if (!validatePasswordField(input)) isValid = false;
    });

    if (!isValid) return;

    const customers = getCustomers();
    const customerIndex = customers.findIndex(c => c.id === getCurrentCustomer().id);

    if (customerIndex !== -1) {
      if (customers[customerIndex].password !== currentPassword.value) {
        showError(currentPassword, "Current password is incorrect");
        return;
      }

      customers[customerIndex].password = newPassword.value;
      saveCustomers(customers);

      currentPassword.value = "";
      newPassword.value = "";
      confirmNewPassword.value = "";

      toast("Password updated successfully");
    }
  });
}

function validatePasswordField(input) {
  const value = input.value;

  switch (input.id) {
    case "currentPassword":
      if (!value) {
        showError(input, "Current password is required");
        return false;
      }
      break;
    case "newPassword":
      if (!value) {
        showError(input, "New password is required");
        return false;
      }
      const pwdError = validatePassword(value);
      if (pwdError) {
        showError(input, pwdError);
        return false;
      }
      break;
    case "confirmNewPassword":
      if (!value) {
        showError(input, "Please confirm your new password");
        return false;
      }
      if (value !== document.getElementById("newPassword").value) {
        showError(input, "Passwords do not match");
        return false;
      }
      break;
  }

  clearError(input);
  return true;
}

function initSidebarLogout() {
  const logoutLink = document.getElementById("sidebarLogout");
  if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      logout();
    });
  }
}

function loadOrders() {
  const ordersList = document.getElementById("ordersList");
  const orders = getOrders().filter(o => o.customerId === getCurrentCustomer().id).reverse();

  if (orders.length === 0) {
    ordersList.innerHTML = `
      <div class="empty-state">
        <p class="eyebrow">NO ORDERS YET</p>
        <h3>You haven't placed any orders</h3>
        <p>Your order history will appear here once you make a purchase.</p>
        <a href="shop.html" class="btn" style="margin-top:16px;display:inline-block">Start Shopping</a>
      </div>
    `;
    return;
  }

  const products = getProducts();

  ordersList.innerHTML = orders.map(order => {
    const orderItems = order.items.map(item => {
      const product = products.find(p => p.id === item.id);
      return `
        <div class="order-item">
          <img src="${product?.images[0] || ''}" alt="${product?.name || item.name}" class="order-item-image">
          <div class="order-item-details">
            <div class="order-item-name">${product?.name || item.name}</div>
            <div class="order-item-qty">Qty: ${item.qty}</div>
          </div>
          <div class="order-item-price">${money(item.price * item.qty)}</div>
        </div>
      `;
    }).join("");

    return `
      <div class="order-card">
        <div class="order-header">
          <div>
            <div class="order-id">Order #${order.id}</div>
            <div class="order-date">${formatDate(order.date)}</div>
          </div>
          <span class="order-status ${order.status.toLowerCase()}">${order.status}</span>
        </div>
        <div class="order-items">
          ${orderItems}
        </div>
        <div class="order-total">
          <span>Total</span>
          <span>${money(order.total)}</span>
        </div>
      </div>
    `;
  }).join("");
}

function loadWishlist() {
  const wishlistGrid = document.getElementById("wishlistGrid");
  const wishlist = getWish();
  const products = getProducts();
  const wishProducts = products.filter(p => wishlist.includes(p.id));

  if (wishProducts.length === 0) {
    wishlistGrid.innerHTML = `
      <div class="empty-state">
        <p class="eyebrow">WISHLIST EMPTY</p>
        <h3>Save items you love</h3>
        <p>Products you add to your wishlist will appear here.</p>
        <a href="shop.html" class="btn" style="margin-top:16px;display:inline-block">Browse Products</a>
      </div>
    `;
    return;
  }

  wishlistGrid.innerHTML = wishProducts.map(p => `
    <article class="product-card">
      <a href="product.html?id=${p.id}" class="product-image">
        <img src="${p.images[0]}" alt="${p.name}">
        ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
        <button class="wish selected" onclick="event.preventDefault();toggleWish(${p.id});this.classList.toggle('selected')">♡</button>
      </a>
      <div class="product-info">
        <p class="category">${p.category}</p>
        <a href="product.html?id=${p.id}"><h3>${p.name}</h3></a>
        <div class="rating">★★★★★ <span>${p.rating}</span></div>
        <div class="price">${money(p.price)} ${p.oldPrice ? `<del>${money(p.oldPrice)}</del>` : ""}</div>
        <button class="quick-add" onclick="addToCart(${p.id})">Add to cart</button>
      </div>
    </article>
  `).join("");
}

document.addEventListener("DOMContentLoaded", initAccountPage);