let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let productos = [];
let total = 0;

fetch("productos.csv")
  .then(res => res.text())
  .then(data => {
    const filas = data.trim().split("\n");

    for (let i = 1; i < filas.length; i++) {
      const col = filas[i].split(",");

      productos.push({
        id: col[0],
        nombre: col[1].toLowerCase(),
        precio: Number(col[2]),
        categoria: col[4].toLowerCase(),
        imagen: col[5]
      });
    }

    mostrarProductos(productos);
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

/* BUSCADOR */
document.getElementById("buscador").addEventListener("input", e => {
  const texto = e.target.value.toLowerCase();

  const filtrados = productos.filter(p =>
    p.nombre.includes(texto) ||
    p.categoria.includes(texto)
  );

  mostrarProductos(filtrados);
});

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
