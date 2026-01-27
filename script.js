let carrito = [];

// =====================
// PRODUCTOS
// =====================
const productos = [
  {
    nombre: "Ventilador",
    precio: 22000,
    imagen: "img/ventilador.png"
  },
  {
    nombre: "Audífonos",
    precio: 18000,
    imagen: "img/audifonos.png"
  },
  {
    nombre: "Zapatos",
    precio: 35000,
    imagen: "img/zapatos.png"
  }
];

// =====================
// MOSTRAR PRODUCTOS
// =====================
const contenedor = document.getElementById("productos");

productos.forEach(p => {
  contenedor.innerHTML += `
    <div class="producto">
      <img src="${p.imagen}">
      <h3>${p.nombre}</h3>
      <p>S/ ${p.precio}</p>
      <button onclick="agregarAlCarrito('${p.nombre}', ${p.precio})">
        Agregar
      </button>
    </div>
  `;
});

// =====================
// AGREGAR AL CARRITO
// =====================
function agregarAlCarrito(nombre, precio) {
  const existe = carrito.find(p => p.nombre === nombre);

  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({
      nombre,
      precio,
      cantidad: 1
    });
  }

  actualizarCarrito();
}

// =====================
// ACTUALIZAR CARRITO
// =====================
function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const totalSpan = document.getElementById("total");
  const contador = document.getElementById("contador");

  lista.innerHTML = "";

  let total = 0;
  let cantidad = 0;

  carrito.forEach((p, index) => {
    total += p.precio * p.cantidad;
    cantidad += p.cantidad;

    lista.innerHTML += `
      <div>
        <strong>${p.nombre}</strong><br>
        S/ ${p.precio} x ${p.cantidad}
        <br>
        <button onclick="cambiarCantidad(${index}, -1)">➖</button>
        <button onclick="cambiarCantidad(${index}, 1)">➕</button>
      </div>
      <hr>
    `;
  });

  totalSpan.textContent = total;
  contador.textContent = cantidad;
}

// =====================
// CAMBIAR CANTIDAD
// =====================
function cambiarCantidad(index, cambio) {
  carrito[index].cantidad += cambio;

  if (carrito[index].cantidad <= 0) {
    carrito.splice(index, 1);
  }

  actualizarCarrito();
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
  if (carrito.length === 0) {
    alert("Carrito vacío");
    return;
  }

  let mensaje = "🧾 Boleta de compra%0A%0A";
  let total = 0;

  carrito.forEach(p => {
    mensaje += `${p.nombre} x${p.cantidad} = S/ ${p.precio * p.cantidad}%0A`;
    total += p.precio * p.cantidad;
  });

  mensaje += `%0ATotal: S/ ${total}`;

  window.open(
    `https://wa.me/5355030439?text=${mensaje}`,
    "_blank"
  );
}
