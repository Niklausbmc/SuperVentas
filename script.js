let carrito = [];
let total = 0;

const productos = JSON.parse(localStorage.getItem("productos")) || [];

const contenedor = document.getElementById("productos");

function mostrarProductos() {
  contenedor.innerHTML = "";

  productos.forEach((p, index) => {
    contenedor.innerHTML += `
      <div class="producto">
        <img src="img/${p.imagen}">
        <h3>${p.nombre}</h3>
        <p>$${p.precio}</p>
        <button onclick="agregarAlCarrito(${index})">
          Agregar
        </button>
      </div>
    `;
  });
}

function agregarAlCarrito(index) {
  carrito.push(productos[index]);
  total += Number(productos[index].precio);

  document.getElementById("total").innerText = total;
}

mostrarProductos();
