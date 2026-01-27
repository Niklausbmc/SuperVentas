let productos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contenedor = document.getElementById("productos");
const listaCarrito = document.getElementById("lista-carrito");
const totalHTML = document.getElementById("total");
const contador = document.getElementById("contador");

// ================= CARGAR CSV =================
fetch("productos.csv")
  .then(res => res.text())
  .then(data => {
    const filas = data.split("\n").slice(1);

    filas.forEach(f => {
      if (!f.trim()) return;
      const [id,nombre,precio,stock,categoria,imagen] = f.split(";");
      productos.push({
        id:+id,
        nombre,
        precio:+precio,
        imagen
      });
    });

    mostrarProductos(productos);
    actualizarContador();
  });

// ================= MOSTRAR =================
function mostrarProductos(lista) {
  contenedor.innerHTML = "";
  lista.forEach(p => {
    contenedor.innerHTML += `
      <div class="producto">
        <img src="${p.imagen}">
        <h3>${p.nombre}</h3>
        <p>S/ ${p.precio}</p>
        <button onclick="agregar(${p.id})">Agregar</button>
      </div>
    `;
  });
}

// ================= AGREGAR =================
function agregar(id){
  const prod = productos.find(p => p.id === id);
  const existe = carrito.find(p => p.id === id);

  if(existe){
    existe.cantidad++;
  } else {
    carrito.push({...prod, cantidad:1});
  }

  guardar();
  mostrarCarrito();
}

const boton = document.querySelector(".carrito-flotante");
boton.classList.add("shake");

setTimeout(() => {
  boton.classList.remove("shake");
}, 400);
// ================= CARRITO =================
function mostrarCarrito(){
  listaCarrito.innerHTML = "";
  let total = 0;

  carrito.forEach(p => {
    const sub = p.precio * p.cantidad;
    total += sub;

    listaCarrito.innerHTML += `
      <div class="item">
        <strong>${p.nombre}</strong><br>
        S/ ${p.precio} x ${p.cantidad} = <b>S/ ${sub}</b>
        <div class="cantidad">
          <button onclick="disminuir(${p.id})">−</button>
          <span>${p.cantidad}</span>
          <button onclick="aumentar(${p.id})">+</button>
        </div>
      </div>
    `;
  });

  totalHTML.textContent = total;
  actualizarContador();
}

// ================= + - =================
function aumentar(id){
  carrito.find(p => p.id === id).cantidad++;
  guardar();
  mostrarCarrito();
}

function disminuir(id){
  const p = carrito.find(p => p.id === id);
  p.cantidad--;
  if(p.cantidad <= 0){
    carrito = carrito.filter(x => x.id !== id);
  }
  guardar();
  mostrarCarrito();
}

// ================= UTIL =================
function guardar(){
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarContador(){
  contador.textContent =
    carrito.reduce((a,p)=>a+p.cantidad,0);
}

// ================= MODAL =================
function abrirCarrito(){
  document.getElementById("modal-carrito").style.display = "flex";
  mostrarCarrito();
}

function cerrarCarrito(){
  document.getElementById("modal-carrito").style.display = "none";
}

function comprarWhatsApp(){
  let msg = "🛒 Pedido:%0A";
  carrito.forEach(p=>{
    msg += `${p.nombre} x${p.cantidad}%0A`;
  });
  msg += `Total: S/ ${totalHTML.textContent}`;
  window.open(`https://wa.me/51999999999?text=${msg}`);
}


