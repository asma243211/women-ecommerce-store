const products=getProducts();let category=new URLSearchParams(location.search).get("category")||"All";let sort=new URLSearchParams(location.search).get("sort")||"newest";let maxPrice=10000;
function renderShop(){
 let list=products.filter(p=>(category==="All"||category==="Sale"?(category==="All"||p.badge==="Sale"||p.oldPrice):p.category===category)&&p.price<=maxPrice);
 if(sort==="price-low")list.sort((a,b)=>a.price-b.price);if(sort==="price-high")list.sort((a,b)=>b.price-a.price);if(sort==="popular")list.sort((a,b)=>b.popular-a.popular);if(sort==="newest")list.sort((a,b)=>b.created-a.created);
 document.getElementById("resultCount").textContent=`${list.length} products`;document.getElementById("shopProducts").innerHTML=list.map(productCard).join("")||"<p>No products found.</p>";
}
document.addEventListener("DOMContentLoaded",()=>{
 document.querySelectorAll('input[name="cat"]').forEach(x=>{if(x.value===category)x.checked=true;x.onchange=()=>{category=x.value;renderShop()}});
 document.getElementById("sortSelect").value=sort;document.getElementById("sortSelect").onchange=e=>{sort=e.target.value;renderShop()};
 document.getElementById("priceRange").oninput=e=>{maxPrice=Number(e.target.value);document.getElementById("priceValue").textContent=money(maxPrice);renderShop()};
 document.getElementById("filterToggle").onclick=()=>document.getElementById("filters").classList.toggle("open");
 renderShop();
});