/* ---------- Catálogo: SOLO BASES ---------- */
const products = [
  {id:1,name:'Base Liquid Glow',type:'líquida',category:'liquida',price:28,vegan:true,img:'https://images.unsplash.com/photo-1542089363-2f3f9ae5f7e6?auto=format&fit=crop&w=800&q=60',desc:'Acabado luminoso, cobertura media.'},
  {id:2,name:'Base Mate Studio',type:'mate',category:'mate',price:30,vegan:false,img:'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=60',desc:'Controla el brillo con acabado mate.'},
  {id:3,name:'Base Hidratante Dew',type:'glow',category:'glow',price:32,vegan:true,img:'https://images.unsplash.com/photo-1536223288064-7a5e6a0d3b8f?auto=format&fit=crop&w=800&q=60',desc:'Hidratación ligera para piel seca.'},
  {id:4,name:'Base Compacta Perfect',type:'compacta',category:'compacta',price:20,vegan:false,img:'https://images.unsplash.com/photo-1556228720-6c9e0aa9f5b2?auto=format&fit=crop&w=800&q=60',desc:'Práctica para retoques y acabado uniforme.'},
  {id:5,name:'Base Mousse Air',type:'líquida',category:'liquida',price:26,vegan:true,img:'https://images.unsplash.com/photo-1546379490-9a0d7f5b8e74?auto=format&fit=crop&w=800&q=60',desc:'Textura mousse, acabado natural y peso ligero.'},
  {id:6,name:'Base Correctora FullCover',type:'mate',category:'mate',price:34,vegan:false,img:'https://images.unsplash.com/photo-1596464716121-3de4d7a7f6d1?auto=format&fit=crop&w=800&q=60',desc:'Cobertura alta para largas jornadas.'}
];

/* ---------- Renderizar productos (con AOS) ---------- */
const productGrid = document.getElementById('productGrid');
function renderProducts(list){
  productGrid.innerHTML = '';
  list.forEach((p, i) => {
    const el = document.createElement('div');
    el.className = 'product';
    el.setAttribute('data-aos', 'fade-up');
    el.setAttribute('data-aos-delay', String(80 * (i % 6)));
    el.innerHTML = `
      <img src="${p.img}" alt="${p.name}" />
      <div class="meta">
        <h4>${p.name}</h4>
        <div class="price">$${p.price.toFixed(2)}</div>
      </div>
      <small class="muted">${p.desc}</small>
      <div style="margin-top:auto;display:flex;gap:8px;margin-top:12px">
        <button class="add-btn" onclick="openModal(${p.id})">Ver</button>
        <button class="cta" style="flex:1" onclick="addToCart(${p.id})">Agregar</button>
      </div>
    `;
    productGrid.appendChild(el);
  });
}
renderProducts(products);

/* ---------- Filtros (ahora con categorías propias de bases) ---------- */
document.querySelectorAll('.chip').forEach(ch=>{
  ch.addEventListener('click',()=>{
    document.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
    ch.classList.add('active');
    const f = ch.dataset.filter;
    if(f === 'all') renderProducts(products);
    else if(f === 'vegan') renderProducts(products.filter(p=>p.vegan));
    else renderProducts(products.filter(p=>p.category === f));
    AOS.refresh();
  })
});

/* ---------- Buscador ---------- */
function applySearch(){
  const q = document.getElementById('searchInput').value.toLowerCase().trim();
  if(!q){ renderProducts(products); AOS.refresh(); return; }
  renderProducts(products.filter(p=>p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)));
  AOS.refresh();
}

/* ---------- Modal ---------- */
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
let currentProductId = null;
function openModal(id){
  const p = products.find(x=>x.id===id);
  currentProductId = id;
  modalContent.innerHTML = `
    <div style="display:flex;gap:12px;flex-wrap:wrap">
      <div style="flex:1;min-width:200px"><img src="${p.img}" style="width:100%;border-radius:8px;object-fit:cover"/></div>
      <div style="flex:1;min-width:200px">
        <h2 style="margin:0">${p.name}</h2>
        <p class="muted">$${p.price.toFixed(2)}</p>
        <p class="muted">${p.desc}</p>
        <p><strong>Tipo:</strong> ${p.type}</p>
        <p><strong>Disponibilidad:</strong> En stock</p>
        <label>Cantidad</label>
        <input id="modalQty" type="number" value="1" min="1" style="width:80px;padding:8px;border-radius:8px;border:1px solid rgba(0,0,0,0.06)" />
      </div>
    </div>
  `;
  modal.classList.add('show');
  modal.setAttribute('aria-hidden','false');
}
function closeModal(){ modal.classList.remove('show'); modal.setAttribute('aria-hidden','true'); }

/* ---------- Carrito (localStorage) ---------- */
function addToCart(id){
  const cart = JSON.parse(localStorage.getItem('sk_cart')||'[]');
  const p = products.find(x=>x.id===id);
  const existing = cart.find(i=>i.id===id);
  if(existing){ existing.qty += 1; } else { cart.push({id:p.id,name:p.name,price:p.price,qty:1}); }
  localStorage.setItem('sk_cart', JSON.stringify(cart));
  alert(p.name + ' agregado al carrito');
}
function addToCartFromModal(){
  const qty = parseInt(document.getElementById('modalQty').value || '1');
  const cart = JSON.parse(localStorage.getItem('sk_cart')||'[]');
  const p = products.find(x=>x.id===currentProductId);
  const existing = cart.find(i=>i.id===currentProductId);
  if(existing){ existing.qty += qty; } else { cart.push({id:p.id,name:p.name,price:p.price,qty:qty}); }
  localStorage.setItem('sk_cart', JSON.stringify(cart));
  closeModal();
  alert((qty) + ' × ' + p.name + ' agregado al carrito');
}

/* ---------- Contacto y suscripción ---------- */
function submitContact(){
  const name = docu
