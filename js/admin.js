const ADMIN_PASSWORD = "lumera2026";

function checkAuth() {
  return sessionStorage.getItem("lumera_admin_auth") === "true";
}

function showAuth() {
  document.getElementById("adminAuth").style.display = "flex";
  document.getElementById("adminHeader").style.display = "none";
  document.getElementById("adminMain").style.display = "none";
}

function showAdmin() {
  document.getElementById("adminAuth").style.display = "none";
  document.getElementById("adminHeader").style.display = "flex";
  document.getElementById("adminMain").style.display = "block";
  adminRender();
}

function adminRender() {
  let ps = getProducts(),
    orders = JSON.parse(localStorage.getItem("lumera_orders") || "[]"),
    cart = getCart(),
    wish = getWish();
  document.getElementById("statProducts").textContent = ps.length;
  document.getElementById("statOrders").textContent = orders.length;
  document.getElementById("statWish").textContent = wish.length;
  document.getElementById("statCart").textContent = cart.reduce((a, x) => a + x.qty, 0);
  document.getElementById("adminProducts").innerHTML = ps.map(p => `<div class="admin-row"><img src="${p.images[0]}"><div><strong>${p.name}</strong><small>${p.category} · ${money(p.price)} · Stock ${p.stock}</small></div><button onclick="editProduct(${p.id})">Edit</button><button onclick="deleteProduct(${p.id})">Delete</button></div>`).join("");
  document.getElementById("adminOrders").innerHTML = orders.length ? orders.map(o => `<div class="order-row"><strong>#${o.id}</strong><span>${o.customer.name}</span><span>${money(o.total)}</span><em>${o.status}</em></div>`).join("") : "<p>No demo orders yet.</p>";
}

const modal = document.getElementById("productModal"),
  form = document.getElementById("productForm");

document.getElementById("addProductBtn").onclick = () => {
  form.reset();
  form.id.value = "";
  modal.classList.add("open");
};
document.getElementById("modalClose").onclick = () => modal.classList.remove("open");

form.onsubmit = e => {
  e.preventDefault();
  let d = Object.fromEntries(new FormData(form)),
    ps = getProducts();
  if (d.id) {
    let p = ps.find(x => x.id == Number(d.id));
    Object.assign(p, { name: d.name, category: d.category, price: +d.price, oldPrice: +d.oldPrice || 0, stock: +d.stock, images: [d.image] });
  } else {
    ps.push({ id: Date.now(), name: d.name, category: d.category, price: +d.price, oldPrice: +d.oldPrice || 0, rating: 5, stock: +d.stock, badge: "New", popular: 50, created: Date.now(), images: [d.image] });
  }
  saveProducts(ps);
  modal.classList.remove("open");
  adminRender();
};

function editProduct(id) {
  let p = getProducts().find(x => x.id === id);
  form.id.value = p.id;
  form.name.value = p.name;
  form.category.value = p.category;
  form.price.value = p.price;
  form.oldPrice.value = p.oldPrice || "";
  form.stock.value = p.stock;
  form.image.value = p.images[0];
  modal.classList.add("open");
}

function deleteProduct(id) {
  if (confirm("Delete this product?")) {
    saveProducts(getProducts().filter(p => p.id !== id));
    adminRender();
  }
}

document.getElementById("resetDemo").onclick = () => {
  if (confirm("Reset all products and remove demo orders?")) {
    localStorage.removeItem(STORE_KEY);
    localStorage.removeItem("lumera_orders");
    adminRender();
  }
};

document.getElementById("authSubmit").onclick = () => {
  const pwd = document.getElementById("adminPassword").value;
  if (pwd === ADMIN_PASSWORD) {
    sessionStorage.setItem("lumera_admin_auth", "true");
    showAdmin();
  } else {
    document.getElementById("authError").textContent = "Incorrect password";
  }
};

document.getElementById("logoutBtn").onclick = () => {
  sessionStorage.removeItem("lumera_admin_auth");
  showAuth();
};

document.getElementById("adminPassword").addEventListener("keypress", e => {
  if (e.key === "Enter") document.getElementById("authSubmit").click();
});

document.addEventListener("DOMContentLoaded", () => {
  if (checkAuth()) {
    showAdmin();
  } else {
    showAuth();
  }
});