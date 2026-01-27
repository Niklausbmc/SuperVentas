const contenedor = document.getElementById("productos");

let productos = JSON.parse(localStorage.getItem("productos")) || [];

function mostrarProductos() {
  contenedor.innerHTML = "";

  if (productos.length === 0) {
    contenedor.innerHTML = "<p>No hay productos disponibles</p>";
    return;
  }

  productos.forEach((p) => {
    const div = document.createElement("div");
    div.className = "producto";

    div.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <p>$${p.precio}</p>
      <button>Agregar</button>
    `;

    contenedor.appendChild(div);
  });
}

mostrarProductos();
