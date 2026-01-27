let productos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contenedor = document.getElementById("productos");
const lista = document.getElementById("listaCarrito");
const totalHTML = document.getElementById("total");
const contador = document.getElementById("contador");

cargarCSV();

function cargarCSV() {
  fetch("productos.csv")
    .then(res => res.text())
    .then(texto => {
      const filas = texto.trim().split("\n");
      filas.shift(); // quitar encabezado

      filas.forEach(fila => {
        const [id, nombre, precio, stock, imagen] = fila.split(";");

        productos.push({
          id: Number(id),
          nombre,
          precio: Number(precio),
          imagen
        });
      });

      mostrarProductos();
      actualizarTodo();
    });
}

function mostrarProductos() {
  contenedor.innerHTML = "";

  productos.forEach(p => {
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

function agregar(id) {
  const prod = productos.find(p => p.id === id);
  const existe = carrito.find(p => p.id === id);

  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({ ...prod, cantidad: 1 });
  }

  guardar();
  actualizarTodo();
}

function actualizarTodo() {
  lista.innerHTML = "";
  let total = 0;
  let cant = 0;

  carrito.forEach(p => {
    total += p.precio * p.cantidad;
    cant += p.cantidad;

    lista.innerHTML += `
      <div class="item">
        <strong>${p.nombre}</strong><br>
        S/ ${p.precio} x ${p.cantidad}
        <div class="cantidad">
          <button onclick="menos(${p.id})">−</button>
          <span>${p.cantidad}</span>
          <button onclick="mas(${p.id})">+</button>
        </div>
      </div>
    `;
  });

  totalHTML.textContent = total;
  contador.textContent = cant;
}

function mas(id) {
  carrito.find(p => p.id === id).cantidad++;
  guardar();
  actualizarTodo();
}

function menos(id) {
  let p = carrito.find(p => p.id === id);
  p.cantidad--;
  if (p.cantidad <= 0) {
    carrito = carrito.filter(x => x.id !== id);
  }
  guardar();
  actualizarTodo();
}

function guardar() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function abrirCarrito() {
  document.getElementById("modalCarrito").style.display = "flex";
}

function cerrarCarrito() {
  document.getElementById("modalCarrito").style.display = "none";
}

function enviarWhatsApp() {
  const metodo = document.querySelector('input[name="pago"]:checked').value;

  let msg = "🛒 Pedido:%0A";
  carrito.forEach(p => {
    msg += `${p.nombre} x${p.cantidad}%0A`;
  });

  msg += `Total: S/ ${totalHTML.textContent}%0A`;
  msg += `Pago: ${metodo}`;

  window.open(`https://wa.me/5355030439?text=${msg}`);
}

