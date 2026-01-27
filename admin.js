let productos = JSON.parse(localStorage.getItem("productosAdmin")) || [];

const tabla = document.getElementById("tablaProductos");

function mostrarProductos() {
  tabla.innerHTML = "";

  productos.forEach(p => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${p.nombre}</td>
      <td>$${p.precio}</td>
      <td>${p.categoria}</td>
      <td>${p.imagen}</td>
    `;

    tabla.appendChild(fila);
  });
}

document.getElementById("agregar").addEventListener("click", () => {
  const nombre = document.getElementById("nombre").value;
  const precio = document.getElementById("precio").value;
  const categoria = document.getElementById("categoria").value;
  const imagen = document.getElementById("imagen").value;

  if (!nombre || !precio || !categoria || !imagen) {
    alert("Completa todos los campos");
    return;
  }

  productos.push({
    id: Date.now(),
    nombre,
    precio: Number(precio),
    categoria,
    imagen
  });

  localStorage.setItem("productosAdmin", JSON.stringify(productos));

  mostrarProductos();

  document.getElementById("nombre").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("categoria").value = "";
  document.getElementById("imagen").value = "";
});

mostrarProductos();