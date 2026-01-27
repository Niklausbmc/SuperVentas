let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let total = 0;

fetch("productos.csv")
  .then(res => res.text())
  .then(data => {
    const filas = data.trim().split("\n");
    const contenedor = document.getElementById("productos");

    for (let i = 1; i < filas.length; i++) {
      const columnas = filas[i].split(",");

      const id = columnas[0];
      const nombre = columnas[1];
      const precio = Number(columnas[2]);
      const imagen = columnas[5];

      const div = document.createElement("div");
      div.className = "producto";

      div.innerHTML = `
        <img src="${imagen}">
        <h3>${nombre}</h3>
        <p>$${precio}</p>
        <button>Agregar</button>
      `;

      div.querySelector("button").addEventListener("click", () => {
        agregarCarrito(id, nombre, precio);
      });

      contenedor.appendChild(div);
    }

    mostrarCarrito();
  });

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarCarrito(id, nombre, precio) {
  const producto = carrito.find(p => p.id === id);

  if (producto) {
    producto.cantidad++;
  } else {
    carrito.push({
      id,
      nombre,
      precio,
      cantidad: 1
    });
  }

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

    const li = document.createElement("li");
    li.textContent = `${p.nombre} x${p.cantidad} - $${subtotal}`;
    lista.appendChild(li);
  });

  document.getElementById("total").textContent = total;
}

document.getElementById("vaciar").addEventListener("click", () => {
  carrito = [];
  localStorage.removeItem("carrito");
  mostrarCarrito();
});
