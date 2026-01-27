let carrito = [];
let total = 0;

fetch("productos.csv")
  .then(res => res.text())
  .then(data => {
    const filas = data.trim().split("\n");
    const contenedor = document.getElementById("productos");

    for (let i = 1; i < filas.length; i++) {
      const [nombre, precio, imagen] = filas[i].split(",");

      const div = document.createElement("div");
      div.className = "producto";

      div.innerHTML = `
        <img src="${imagen}">
        <h3>${nombre}</h3>
        <p>$${precio}</p>
        <button>Agregar</button>
      `;

      div.querySelector("button").addEventListener("click", () => {
        agregarCarrito(nombre, precio);
      });

      contenedor.appendChild(div);
    }
  });

function agregarCarrito(nombre, precio) {
  carrito.push({ nombre, precio: Number(precio) });
  total += Number(precio);
  mostrarCarrito();
}

function mostrarCarrito() {
  const lista = document.getElementById("lista-carrito");
  lista.innerHTML = "";

  carrito.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.nombre} - $${p.precio}`;
    lista.appendChild(li);
  });

  document.getElementById("total").textContent = total;
}

document.getElementById("vaciar").addEventListener("click", () => {
  carrito = [];
  total = 0;
  mostrarCarrito();
});
