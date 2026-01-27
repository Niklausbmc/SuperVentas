let carrito = [];

const productosDiv = document.getElementById("productos");
const listaCarrito = document.getElementById("listaCarrito");
const totalSpan = document.getElementById("total");

/* =====================
   CARGAR PRODUCTOS
===================== */
fetch("productos.csv")
  .then(res => res.text())
  .then(data => {
    const filas = data.split("\n");

    filas.slice(1).forEach(fila => {
      const [nombre, precio, imagen, categoria] = fila.split(",");

      const producto = {
        nombre,
        precio: Number(precio),
        imagen,
        categoria
      };

      mostrarProducto(producto);
    });
  });

function mostrarProducto(producto) {
  const card = document.createElement("div");
  card.className = "producto";

  card.innerHTML = `
    <img src="img/${producto.imagen}" alt="${producto.nombre}">
    <h3>${producto.nombre}</h3>
    <p>$${producto.precio}</p>
    <button>Agregar</button>
  `;

  const boton = card.querySelector("button");
  boton.onclick = () => agregarAlCarrito(producto);

  productosDiv.appendChild(card);
}

/* =====================
   CARRITO
===================== */
function agregarAlCarrito(producto) {
  carrito.push(producto);
  actualizarCarrito();
}

function actualizarCarrito() {
  listaCarrito.innerHTML = "";
  let total = 0;

  carrito.forEach((prod, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${prod.nombre} - $${prod.precio}
      <button onclick="eliminar(${index})">❌</button>
    `;
    listaCarrito.appendChild(li);
    total += prod.precio;
  });

  totalSpan.textContent = total;
}

function eliminar(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
}
