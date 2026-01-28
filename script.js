alert("JS funcionando");
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
        const [id, nombre, precio, stock, categoria, imagen] = fila.split(";");

        productos.push({
          id: Number(id),
          nombre: nombre,
          precio: Number(precio),
          stock: Number(stock),
          categoria: categoria,
          imagen: imagen
        });
      });

      mostrarProductos();
      actualizarTodo();
    });
}

function mostrarProductos(lista = productos) {
  contenedor.innerHTML = "";

  lista.forEach(p => {
    const div = document.createElement("div");
    div.className = "producto";

    div.innerHTML = `
      <img src="${p.imagen}">
      <h3>${p.nombre}</h3>
      <p>S/ ${p.precio}</p>
      <button onclick="agregarCarrito(${p.id})">
        Agregar
      </button>
    `;

    contenedor.appendChild(div);
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

function filtrarProductos() {
  const texto = document.getElementById("buscar").value.toLowerCase();

  const filtrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(texto) ||
    p.categoria.toLowerCase().includes(texto)
  );

  mostrarProductos(filtrados);
}

function agregarCarrito(id) {
  const producto = productos.find(p => p.id === id);

  if (!producto) return;

  const existe = carrito.find(p => p.id === id);

  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({
      ...producto,
      cantidad: 1
    });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  actualizarTodo();
}

function fondoPorEstacion() {
  const mes = new Date().getMonth() + 1;
  let estacion = "";

  if (mes >= 3 && mes <= 5) estacion = "primavera";
  else if (mes >= 6 && mes <= 8) estacion = "verano";
  else if (mes >= 9 && mes <= 11) estacion = "otono";
  else estacion = "invierno";

  document.body.classList.add(estacion);
}

fondoPorEstacion();

function efectoEstacion() {
  const mes = new Date().getMonth() + 1;
  const contenedor = document.getElementById("efectos");

  contenedor.innerHTML = "";

  let tipo = "";

  if (mes >= 3 && mes <= 5) tipo = "primavera";
  else if (mes >= 6 && mes <= 8) tipo = "verano";
  else if (mes >= 9 && mes <= 11) tipo = "otono";
  else tipo = "invierno";

  for (let i = 0; i < 30; i++) {
    const span = document.createElement("span");
    span.className = tipo;
    span.style.left = Math.random() * 100 + "vw";
    span.style.animationDuration = 5 + Math.random() * 10 + "s";
    span.style.fontSize = 12 + Math.random() * 20 + "px";
    contenedor.appendChild(span);
  }
}

efectoEstacion();

function estacion(tipo) {
  const contenedor = document.getElementById("efectos");
  contenedor.innerHTML = "";

  let icono = "❄️";

  if (tipo === "primavera") icono = "🌸";
  if (tipo === "verano") icono = "☀️";
  if (tipo === "otono") icono = "🍂";
  if (tipo === "invierno") icono = "❄️";

  for (let i = 0; i < 25; i++) {
    const e = document.createElement("div");
    e.className = "efecto";
    e.textContent = icono;
    e.style.left = Math.random() * 100 + "vw";
    e.style.animationDuration = (4 + Math.random() * 6) + "s";
    e.style.fontSize = (20 + Math.random() * 25) + "px";
    contenedor.appendChild(e);
  }
}

// 🔥 activar estación
estacion("invierno");

