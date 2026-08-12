const STORE_KEY="lumera_products", CART_KEY="lumera_cart", WISH_KEY="lumera_wishlist";
const seedProducts = [
{id:1,name:"Satin Slip Dress",category:"Dresses",price:3290,oldPrice:3890,rating:4.8,stock:18,badge:"New",popular:98,created:10,images:["https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=900&q=85"]},
{id:2,name:"Linen Wrap Dress",category:"Dresses",price:2890,oldPrice:3290,rating:4.7,stock:12,badge:"New",popular:92,created:9,images:["https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=900&q=85"]},
{id:3,name:"Classic Leather Tote",category:"Bags",price:4590,oldPrice:5290,rating:4.9,stock:8,badge:"Best seller",popular:100,created:8,images:["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85"]},
{id:4,name:"Soft Mini Shoulder Bag",category:"Bags",price:2490,oldPrice:2990,rating:4.6,stock:22,badge:"Sale",popular:87,created:7,images:["https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85"]},
{id:5,name:"Minimal Gold Hoops",category:"Jewelry",price:1290,oldPrice:1590,rating:4.8,stock:30,badge:"",popular:91,created:6,images:["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85"]},
{id:6,name:"Pearl Drop Earrings",category:"Jewelry",price:1690,oldPrice:1990,rating:4.9,stock:16,badge:"New",popular:96,created:5,images:["https://images.unsplash.com/photo-1535556116002-6281ff3e9f4f?auto=format&fit=crop&w=900&q=85"]},
{id:7,name:"City Runner Sneakers",category:"Shoes",price:3990,oldPrice:4490,rating:4.7,stock:14,badge:"",popular:89,created:4,images:["https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85"]},
{id:8,name:"Strappy Everyday Sandals",category:"Shoes",price:2190,oldPrice:2690,rating:4.5,stock:20,badge:"Sale",popular:83,created:3,images:["https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=85"]},
{id:9,name:"Oversized Cat-Eye Sunglasses",category:"Accessories",price:990,oldPrice:1290,rating:4.6,stock:35,badge:"Sale",popular:80,created:2,images:["https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85"]},
{id:10,name:"Soft Knit Cardigan",category:"Accessories",price:2390,oldPrice:2790,rating:4.7,stock:10,badge:"New",popular:86,created:1,images:["https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=85"]},
{id:11,name:"Pleated Midi Skirt",category:"Dresses",price:2690,oldPrice:3190,rating:4.6,stock:11,badge:"",popular:82,created:11,images:["https://images.unsplash.com/photo-1583496661160-fb5886a13d77?auto=format&fit=crop&w=900&q=85"]},
{id:12,name:"Statement Cuff Bracelet",category:"Jewelry",price:1490,oldPrice:1790,rating:4.5,stock:25,badge:"Sale",popular:78,created:12,images:["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=85"]},
{id:13,name:"Floral Maxi Dress",category:"Dresses",price:3590,oldPrice:4190,rating:4.7,stock:15,badge:"New",popular:94,created:13,images:["https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=900&q=85"]},
{id:14,name:"Silk Evening Gown",category:"Dresses",price:5290,oldPrice:6290,rating:4.9,stock:6,badge:"Best seller",popular:99,created:14,images:["https://images.unsplash.com/photo-1566174053879-3be8615584e8?auto=format&fit=crop&w=900&q=85"]},
{id:15,name:"Cotton Summer Dress",category:"Dresses",price:2290,oldPrice:2790,rating:4.5,stock:25,badge:"Sale",popular:85,created:15,images:["https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=900&q=85"]},
{id:16,name:"Velvet Midi Dress",category:"Dresses",price:3890,oldPrice:4490,rating:4.8,stock:10,badge:"New",popular:93,created:16,images:["https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85"]},
{id:17,name:"Structured Leather Handbag",category:"Bags",price:5890,oldPrice:6890,rating:4.8,stock:7,badge:"Best seller",popular:97,created:17,images:["https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85"]},
{id:18,name:"Canvas Tote Bag",category:"Bags",price:1890,oldPrice:2290,rating:4.6,stock:30,badge:"Sale",popular:88,created:18,images:["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85"]},
{id:19,name:"Crossbody Chain Bag",category:"Bags",price:3290,oldPrice:3890,rating:4.7,stock:12,badge:"New",popular:90,created:19,images:["https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85"]},
{id:20,name:"Quilted Shoulder Bag",category:"Bags",price:4190,oldPrice:4990,rating:4.9,stock:9,badge:"",popular:95,created:20,images:["https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=900&q=85"]},
{id:21,name:"Diamond Stud Earrings",category:"Jewelry",price:2890,oldPrice:3490,rating:4.9,stock:20,badge:"New",popular:98,created:21,images:["https://images.unsplash.com/photo-1630019852942-f89202989a53?auto=format&fit=crop&w=900&q=85"]},
{id:22,name:"Layered Gold Necklace",category:"Jewelry",price:1990,oldPrice:2490,rating:4.7,stock:18,badge:"Sale",popular:89,created:22,images:["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85"]},
{id:23,name:"Stackable Ring Set",category:"Jewelry",price:1590,oldPrice:1990,rating:4.6,stock:22,badge:"",popular:84,created:23,images:["https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85"]},
{id:24,name:"Tennis Bracelet",category:"Jewelry",price:3490,oldPrice:4190,rating:4.8,stock:11,badge:"Best seller",popular:96,created:24,images:["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=85"]},
{id:25,name:"Leather Ankle Boots",category:"Shoes",price:4290,oldPrice:4990,rating:4.7,stock:13,badge:"New",popular:91,created:25,images:["https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=85"]},
{id:26,name:"Classic Loafers",category:"Shoes",price:3590,oldPrice:4190,rating:4.8,stock:16,badge:"",popular:94,created:26,images:["https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=85"]},
{id:27,name:"Platform Espadrilles",category:"Shoes",price:2790,oldPrice:3290,rating:4.6,stock:19,badge:"Sale",popular:87,created:27,images:["https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=85"]},
{id:28,name:"Pointed Ballet Flats",category:"Shoes",price:2390,oldPrice:2890,rating:4.5,stock:24,badge:"",popular:82,created:28,images:["https://images.unsplash.com/photo-1520639888713-1a7c1c1c1c1c?auto=format&fit=crop&w=900&q=85"]},
{id:29,name:"Wide Brim Sun Hat",category:"Accessories",price:1490,oldPrice:1890,rating:4.6,stock:28,badge:"Sale",popular:83,created:29,images:["https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=85"]},
{id:30,name:"Silk Scarf",category:"Accessories",price:990,oldPrice:1290,rating:4.7,stock:35,badge:"New",popular:88,created:30,images:["https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=900&q=85"]},
{id:31,name:"Leather Belt",category:"Accessories",price:1290,oldPrice:1590,rating:4.8,stock:20,badge:"",popular:90,created:31,images:["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85"]},
{id:32,name:"Cashmere Beanie",category:"Accessories",price:1790,oldPrice:2190,rating:4.7,stock:15,badge:"Sale",popular:85,created:32,images:["https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=900&q=85"]}
];

function getProducts(){ return JSON.parse(localStorage.getItem(STORE_KEY)||"null") || seedProducts; }
function saveProducts(p){localStorage.setItem(STORE_KEY,JSON.stringify(p));}
function money(n){return "৳"+Number(n).toLocaleString("en-BD");}
function getCart(){return JSON.parse(localStorage.getItem(CART_KEY)||"[]");}
function saveCart(c){localStorage.setItem(CART_KEY,JSON.stringify(c)); updateCounts();}
function getWish(){return JSON.parse(localStorage.getItem(WISH_KEY)||"[]");}
function saveWish(w){localStorage.setItem(WISH_KEY,JSON.stringify(w)); updateCounts();}
function updateCounts(){
 const cart=getCart(), wish=getWish();
 const cc=document.getElementById("cartCount"), wc=document.getElementById("wishlistCount");
 if(cc) cc.textContent=cart.reduce((a,x)=>a+x.qty,0);
 if(wc) wc.textContent=wish.length;
}
function addToCart(id,qty=1){let c=getCart();let item=c.find(x=>x.id==id);if(item)item.qty+=qty;else c.push({id:Number(id),qty});saveCart(c);toast("Added to cart");}
function toggleWish(id){let w=getWish();id=Number(id);if(w.includes(id))w=w.filter(x=>x!==id);else w.push(id);saveWish(w);toast(w.includes(id)?"Added to wishlist":"Removed from wishlist");}
function toast(msg){let t=document.getElementById("toast");if(!t){t=document.createElement("div");t.id="toast";document.body.appendChild(t)}t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1800);}
function productCard(p){
 const wish=getWish().includes(p.id);
 return `<article class="product-card"><a href="product.html?id=${p.id}" class="product-image"><img src="${p.images[0]}" alt="${p.name}">${p.badge?`<span class="badge">${p.badge}</span>`:""}<button class="wish ${wish?"selected":""}" onclick="event.preventDefault();toggleWish(${p.id});this.classList.toggle('selected')">♡</button></a><div class="product-info"><p class="category">${p.category}</p><a href="product.html?id=${p.id}"><h3>${p.name}</h3></a><div class="rating">★★★★★ <span>${p.rating}</span></div><div class="price">${money(p.price)} ${p.oldPrice?`<del>${money(p.oldPrice)}</del>`:""}</div><button class="quick-add" onclick="addToCart(${p.id})">Add to cart</button></div></article>`;
}
function initHeader(){
  updateCounts();
  const btn=document.getElementById("mobileMenu"),nav=document.getElementById("mainNav");
  if(btn&&nav)btn.onclick=()=>nav.classList.toggle("open");
  const searchBtn=document.getElementById("searchBtn"),overlay=document.getElementById("searchOverlay"),close=document.getElementById("closeSearch"),input=document.getElementById("globalSearch"),results=document.getElementById("searchResults");
  if(searchBtn&&overlay){searchBtn.onclick=()=>{overlay.classList.add("open");input?.focus()};close.onclick=()=>overlay.classList.remove("open");input?.addEventListener("input",()=>{let q=input.value.toLowerCase();results.innerHTML=getProducts().filter(p=>p.name.toLowerCase().includes(q)||p.category.toLowerCase().includes(q)).slice(0,6).map(p=>`<a href="product.html?id=${p.id}">${p.name}<span>${money(p.price)}</span></a>`).join("")})}
  const form=document.getElementById("newsletterForm");if(form)form.onsubmit=e=>{e.preventDefault();document.getElementById("newsletterMsg").textContent="You're subscribed — welcome to LUMERA!"};

  const themeBtn=document.getElementById("themeToggle");
  if(themeBtn){
    const savedTheme=localStorage.getItem("lumera_theme")||"light";
    document.documentElement.setAttribute("data-theme",savedTheme);
    themeBtn.textContent=savedTheme==="dark"?"☀️":"🌙";
    themeBtn.onclick=()=>{
      const current=document.documentElement.getAttribute("data-theme");
      const next=current==="dark"?"light":"dark";
      document.documentElement.setAttribute("data-theme",next);
      localStorage.setItem("lumera_theme",next);
      themeBtn.textContent=next==="dark"?"☀️":"🌙";
    };
  }
}
document.addEventListener("DOMContentLoaded",initHeader);