let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let productos = [];
let productosFiltrados = [];
let total = 0;

fetch("productos.csv")
  .then(res => res.text())
  .then(data => {
    const filas = data.trim().split("\n");

    for (let i = 1; i < filas.length; i++) {
      const c = filas[i].split(",");

      productos.push({
        id: c[0],
        nombre: c[1].toLowerCase(),
        precio: Number(c[2]),
        categoria: c[4].toLowerCase(),
        imagen: c[5]
      });
    }

    productosFiltrados = productos;
    mostrarProductos(productosFiltrados);
    mostrarCarrito();
  });

function mostrarProductos(lista) {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";

  lista.forEach(p => {
    const div = document.createElement("div");
    div.className = "producto";

    div.innerHTML = `
      <img src="${p.imagen}">
      <h3>${p.nombre}</h3>
      <p>$${p.precio}</p>
      <button>Agregar</button>
    `;

    div.querySelector("button").addEventListener("click", () => {
      agregarCarrito(p.id, p.nombre, p.precio);
    });

    contenedor.appendChild(div);
  });
}

/* ===== CATEGORÍAS ===== */

function filtrarCategoria(cat) {
  if (cat === "todas") {
    productosFiltrados = productos;
  } else {
    productosFiltrados = productos.filter(p => p.categoria === cat);
  }

  aplicarBuscador();
}

/* ===== BUSCADOR ===== */

document.getElementById("buscador").addEventListener("input", aplicarBuscador);

function aplicarBuscador() {
  const texto = document.getElementById("buscador").value.toLowerCase();

  const resultado = productosFiltrados.filter(p =>
    p.nombre.includes(texto)
  );

  mostrarProductos(resultado);
}

/* ===== CARRITO ===== */

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarCarrito(id, nombre, precio) {
  const prod = carrito.find(p => p.id === id);

  if (prod) prod.cantidad++;
  else carrito.push({ id, nombre, precio, cantidad: 1 });

  guardarCarrito();
  mostrarCarrito();
}

function aumentar(id) {
  carrito.find(p => p.id === id).cantidad++;
  guardarCarrito();
  mostrarCarrito();
}

function disminuir(id) {
  const prod = carrito.find(p => p.id === id);
  prod.cantidad--;

  if (prod.cantidad <= 0)
    carrito = carrito.filter(p => p.id !== id);

  guardarCarrito();
  mostrarCarrito();
}

function mostrarCarrito() {
  const lista = document.getElementById("lista-carrito");
  lista.innerHTML = "";
  total = 0;

  carrito.forEach(p => {
    const subtotal = p.precio * p.cantidad;
    total += subtotal;

    lista.innerHTML += `
      <li>
        <strong>${p.nombre}</strong><br>
        <button onclick="disminuir('${p.id}')">−</button>
        ${p.cantidad}
        <button onclick="aumentar('${p.id}')">+</button>
        $${subtotal}
      </li>
    `;
  });

  document.getElementById("total").textContent = total;
}

document.getElementById("vaciar").addEventListener("click", () => {
  carrito = [];
  localStorage.removeItem("carrito");
  mostrarCarrito();
});
