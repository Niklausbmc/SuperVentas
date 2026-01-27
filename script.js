let carrito = [];
let total = 0;

const productos = JSON.parse(localStorage.getItem("productos")) || [];

const contenedor = document.getElementById("productos");
const totalSpan = document.getElementById("total");
const listaCarrito = document.getElementById("listaCarrito");

// ==========================
// MOSTRAR PRODUCTOS
// ==========================
function mostrarProductos() {
  contenedor.innerHTML = "";

  productos.forEach((p, index) => {
    contenedor.innerHTML += `
      <div class="producto">
        <img src="img/${p.imagen}" alt="${p.nombre}">
        <h3>${p.nombre}</h3>
        <p class="precio">$${p.precio}</p>
        <button onclick="agregarAlCarrito(${index})">
          Agregar
        </button>
      </div>
    `;
  });
}

// ==========================
// AGREGAR
// ==========================
function agregarAlCarrito(index) {
  const producto = productos[index];

  const existe = carrito.find(p => p.nombre === producto.nombre);

  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({
      ...producto,
      cantidad: 1
    });
  }

  actualizarCarrito();
}

// ==========================
// ACTUALIZAR CARRITO
// ==========================
function actualizarCarrito() {
  listaCarrito.innerHTML = "";
  total = 0;

  carrito.forEach((p, i) => {
    total += p.precio * p.cantidad;

    listaCarrito.innerHTML += `
      <div>
        ${p.nombre} 
        (${p.cantidad})
        <button onclick="disminuir(${i})">➖</button>
        <button onclick="aumentar(${i})">➕</button>
      </div>
    `;
  });

  totalSpan.innerText = total;
}

// ==========================
// + / -
// ==========================
function aumentar(i) {
  carrito[i].cantidad++;
  actualizarCarrito();
}

function disminuir(i) {
  carrito[i].cantidad--;

  if (carrito[i].cantidad <= 0) {
    carrito.splice(i, 1);
  }

  actualizarCarrito();
}

// ==========================
// VACIAR
// ==========================
function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
}

mostrarProductos();
