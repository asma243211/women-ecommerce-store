document.addEventListener("DOMContentLoaded", () => {
  const c = getCart(), ps = getProducts();
  const sub = c.reduce((s, i) => {
    let p = ps.find(x => x.id === i.id);
    return s + p.price * i.qty;
  }, 0);
  const delivery = sub >= 2500 ? 0 : 120;

  document.getElementById("checkoutSummary").innerHTML = `
    <h2>Your order</h2>
    ${c.map(i => {
      let p = ps.find(x => x.id === i.id);
      return `<p>${p.name} × ${i.qty}<strong>${money(p.price * i.qty)}</strong></p>`;
    }).join("")}
    <hr>
    <p>Delivery<strong>${delivery ? money(delivery) : "Free"}</strong></p>
    <h3>Total<strong>${money(sub + delivery)}</strong></h3>
  `;

  const form = document.getElementById("checkoutForm");
  const customer = getCurrentCustomer();

  if (customer) {
    const nameInput = form.querySelector('input[name="name"]');
    const emailInput = form.querySelector('input[name="email"]');
    const phoneInput = form.querySelector('input[name="phone"]');
    if (nameInput) nameInput.value = customer.name;
    if (emailInput) emailInput.value = customer.email;
    if (phoneInput) phoneInput.value = customer.phone || "";
  }

  form.onsubmit = e => {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target));
    let orders = JSON.parse(localStorage.getItem("lumera_orders") || "[]");
    orders.unshift({
      id: "LM" + Date.now().toString().slice(-6),
      date: new Date().toISOString(),
      customer: data,
      customerId: customer ? customer.id : null,
      items: c,
      total: sub + delivery,
      status: "Pending"
    });
    localStorage.setItem("lumera_orders", JSON.stringify(orders));
    localStorage.removeItem(CART_KEY);
    updateCounts();
    toast("Demo order placed successfully!");
    setTimeout(() => location.href = "index.html", 1200);
  };
});