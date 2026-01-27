let carrito = [];

// ==========================
// AGREGAR AL CARRITO
// ==========================
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

// ==========================
// ACTUALIZAR CARRITO
// ==========================
function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const totalSpan = document.getElementById("total");
  const contador = document.getElementById("contador");

  lista.innerHTML = "";

  let total = 0;
  let totalProductos = 0;

  carrito.forEach((p, index) => {
    total += p.precio * p.cantidad;
    totalProductos += p.cantidad;

    lista.innerHTML += `
      <div class="item-carrito">
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
  contador.textContent = totalProductos;
}

// ==========================
// CAMBIAR CANTIDAD
// ==========================
function cambiarCantidad(index, cambio) {
  carrito[index].cantidad += cambio;

  if (carrito[index].cantidad <= 0) {
    carrito.splice(index, 1);
  }

  actualizarCarrito();
}

// ==========================
// ABRIR / CERRAR
// ==========================
function abrirCarrito() {
  document.getElementById("modal-carrito").style.display = "flex";
}

function cerrarCarrito() {
  document.getElementById("modal-carrito").style.display = "none";
}

// ==========================
// WHATSAPP
// ==========================
function comprarWhatsApp() {
  if (carrito.length === 0) {
    alert("El carrito está vacío");
    return;
  }

  let mensaje = "🧾 *Boleta de compra*%0A%0A";

  let total = 0;

  carrito.forEach(p => {
    mensaje += `• ${p.nombre} x${p.cantidad} = S/ ${p.precio * p.cantidad}%0A`;
    total += p.precio * p.cantidad;
  });

  mensaje += `%0A*Total: S/ ${total}*`;

  const telefono = "5355030439"; // TU NÚMERO
  window.open(`https://wa.me/${telefono}?text=${mensaje}`, "_blank");
}
