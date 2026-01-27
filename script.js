// ==========================
// CARRITO DESDE LOCALSTORAGE
// ==========================
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// ==========================
// PRODUCTOS (puedes luego usar CSV)
// ==========================
const productos = [
  {
    id: 1,
    nombre: "Ventilador",
    precio: 22000,
    imagen: "img/ventilador.jpg"
  },
  {
    id: 2,
    nombre: "Audífonos",
    precio: 18000,
    imagen: "img/audifonos.jpg"
  },
  {
    id: 3,
    nombre: "Zapatos",
    precio: 35000,
    imagen: "img/zapatos.jpg"
  }
];

// ==========================
// MOSTRAR PRODUCTOS
// ==========================
function mostrarProductos() {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";

  productos.forEach(p => {
    contenedor.innerHTML += `
      <div class="producto">
        <img src="${p.imagen}">
        <h3>${p.nombre}</h3>
        <p>S/ ${p.precio}</p>
        <button onclick="agregarAlCarrito(${p.id})">
          Agregar
        </button>
      </div>
    `;
  });
}

// ==========================
// AGREGAR AL CARRITO
// ==========================
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  const existe = carrito.find(p => p.id === id);

  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({
      ...producto,
      cantidad: 1
    });
  }

  guardarCarrito();
  mostrarCarrito();
  actualizarContador();
}

// ==========================
// MOSTRAR CARRITO
// ==========================
function mostrarCarrito() {
  const div = document.getElementById("carrito");
  const totalSpan = document.getElementById("total");

  div.innerHTML = "";
  let total = 0;

  carrito.forEach(p => {
    total += p.precio * p.cantidad;

    div.innerHTML += `
      <div class="item-carrito">
        <b>${p.nombre}</b><br>
        S/ ${p.precio} x ${p.cantidad}
        <br>
        <button onclick="cambiarCantidad(${p.id}, 1)">+</button>
        <button onclick="cambiarCantidad(${p.id}, -1)">-</button>
      </div>
    `;
  });

  totalSpan.textContent = total;
}

// ==========================
// CAMBIAR CANTIDAD
// ==========================
function cambiarCantidad(id, cambio) {
  const producto = carrito.find(p => p.id === id);

  producto.cantidad += cambio;

  if (producto.cantidad <= 0) {
    carrito = carrito.filter(p => p.id !== id);
  }

  guardarCarrito();
  mostrarCarrito();
  actualizarContador();
}

// ==========================
// VACIAR CARRITO
// ==========================
function vaciarCarrito() {
  carrito = [];
  localStorage.removeItem("carrito");
  mostrarCarrito();
  actualizarContador();
}

// ==========================
// CONTADOR FLOTANTE
// ==========================
function actualizarContador() {
  const total = carrito.reduce((sum, p) => sum + p.cantidad, 0);
  document.getElementById("contador").textContent = total;
}

// ==========================
// FINALIZAR COMPRA (BOLETA)
// ==========================
function finalizarCompra() {
  if (carrito.length === 0) {
    alert("El carrito está vacío");
    return;
  }

  let mensaje = "🧾 BOLETA DE COMPRA\n\n";

  carrito.forEach(p => {
    mensaje += `${p.nombre} x ${p.cantidad} = S/ ${p.precio * p.cantidad}\n`;
  });

  const total = carrito.reduce(
    (sum, p) => sum + p.precio * p.cantidad,
    0
  );

  mensaje += `\nTOTAL: S/ ${total}`;

  alert(mensaje);
}

// ==========================
// WHATSAPP
// ==========================
function comprarWhatsApp() {
  let texto = "🛒 Pedido:\n\n";

  carrito.forEach(p => {
    texto += `${p.nombre} x ${p.cantidad}\n`;
  });

  const total = carrito.reduce(
    (sum, p) => sum + p.precio * p.cantidad,
    0
  );

  texto += `\nTotal: S/ ${total}`;

  const telefono = "5355030439"; // CAMBIA TU NÚMERO
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(texto)}`;

  window.open(url, "_blank");
}

// ==========================
// GUARDAR
// ==========================
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// ==========================
// INICIAR
// ==========================
mostrarProductos();
mostrarCarrito();
actualizarContador();

