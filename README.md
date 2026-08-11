# LUMERA — Ready-to-run Women's E-commerce Demo

## Run locally
1. Extract the ZIP.
2. Open the `women-ecommerce-store` folder in VS Code.
3. Install the **Live Server** extension if needed.
4. Right-click `index.html` → **Open with Live Server**.
5. Open `admin/index.html` for the demo admin panel.

## Important
- This project is frontend-only: HTML, CSS and JavaScript.
- Cart, wishlist, products and demo orders use browser `localStorage`.
- Product images currently use public Unsplash image URLs so the demo works immediately. For a fully offline site, download your own images into `images/products/` and change the image URLs in `js/app.js`.
- The checkout is a demonstration only; it does not process real payments.
- The admin panel can add/edit/delete products in the browser's local storage.
- For a production store, connect the frontend to a backend/database and real payment gateway.

## Main files
- `index.html` — homepage
- `shop.html` — catalog/filter/sort
- `product.html` — product details
- `cart.html` — shopping cart
- `wishlist.html` — wishlist
- `checkout.html` — demo checkout
- `admin/index.html` — admin dashboard
- `js/app.js` — product data, cart, wishlist and shared functions
- `js/admin.js` — admin product/order management
- `css/style.css` — main design
- `css/responsive.css` — mobile/tablet responsive styles
