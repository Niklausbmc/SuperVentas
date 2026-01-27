let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const productosDiv = document.getElementById("productos");
const listaCarrito = document.getElementById("lista-carrito");
const totalSpan = document.getElementById("total");
const contador = document.getElementById("contador");

// =====================
// CARGAR PRODUCTOS CSV
// =====================
fetch("productos.csv")
  .then(res => res.text())
  .then(data => {
    const filas = data.split("\n").slice(1);

    filas.forEach(fila => {
      if (!fila.trim()) return;

      const [nombre, precio, imagen] = fila.split(",");

      const card = document.createElement("div");
      card.className = "producto";

      card.innerHTML = `
        <img src="${imagen.trim()}" alt="${nombre}">
        <h3>${nombre}</h3>
        <p>S/ ${precio}</p>
        <button onclick="agregarCarrito('${nombre}', ${precio})">
          Agregar
        </button>
      `;

      productosDiv.appendChild(card);
    });

    actualizarCarrito();
  });

// =====================
// AGREGAR AL CARRITO
// =====================
function agregarCarrito(nombre, precio) {
  const producto = carrito.find(p => p.nombre === nombre);

  if (producto) {
    producto.cantidad++;
  } else {
    carrito.push({
      nombre,
      precio,
      cantidad: 1
    });
  }

  guardar();
  actualizarCarrito();
}

// =====================
// SUMAR
// =====================
function sumar(nombre) {
  const producto = carrito.find(p => p.nombre === nombre);
  producto.cantidad++;
  guardar();
  actualizarCarrito();
}

// =====================
// RESTAR
// =====================
function restar(nombre) {
  const producto = carrito.find(p => p.nombre === nombre);

  producto.cantidad--;

  if (producto.cantidad <= 0) {
    carrito = carrito.filter(p => p.nombre !== nombre);
  }

  guardar();
  actualizarCarrito();
}

// =====================
// ACTUALIZAR CARRITO
// =====================
function actualizarCarrito() {
  listaCarrito.innerHTML = "";

  let total = 0;
  let cantidadTotal = 0;

  carrito.forEach(p => {
    total += p.precio * p.cantidad;
    cantidadTotal += p.cantidad;

    listaCarrito.innerHTML += `
      <div class="item-carrito">
        <span>${p.nombre}</span>
        <div class="controles">
          <button onclick="restar('${p.nombre}')">−</button>
          <span>${p.cantidad}</span>
          <button onclick="sumar('${p.nombre}')">+</button>
        </div>
        <span>S/ ${p.precio * p.cantidad}</span>
      </div>
    `;
  });

  totalSpan.textContent = total;
  contador.textContent = cantidadTotal;
}

// =====================
// GUARDAR
// =====================
function guardar() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// =====================
// MODAL
// =====================
function abrirCarrito() {
  document.getElementById("modal-carrito").style.display = "flex";
}

function cerrarCarrito() {
  document.getElementById("modal-carrito").style.display = "none";
}

// =====================
// WHATSAPP
// =====================
function comprarWhatsApp() {
  let mensaje = "🧾 *Pedido:*%0A";

  carrito.forEach(p => {
    mensaje += `- ${p.nombre} x${p.cantidad} = S/ ${p.precio * p.cantidad}%0A`;
  });

  mensaje += `%0A💰 Total: S/ ${totalSpan.textContent}`;

  window.open(
    "https://wa.me/5355030439?text=" + mensaje,
    "_blank"
  );
}
