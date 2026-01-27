let productos = JSON.parse(localStorage.getItem("productos")) || [];

function guardarProductos() {
  localStorage.setItem("productos", JSON.stringify(productos));
}

function mostrarProductos() {
  const lista = document.getElementById("listaProductos");
  lista.innerHTML = "";

  productos.forEach((p, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${p.nombre} - $${p.precio}
      <button onclick="eliminarProducto(${index})">❌</button>
    `;
    lista.appendChild(li);
  });
}

function agregarProducto() {
  const nombre = document.getElementById("nombre").value;
  const precio = document.getElementById("precio").value;
  const imagen = document.getElementById("imagen").value;

  if (nombre === "" || precio === "") {
    alert("Completa los datos");
    return;
  }

  productos.push({
    nombre,
    precio,
    imagen
  });

  guardarProductos();
  mostrarProductos();

  document.getElementById("nombre").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("imagen").value = "";
}

function eliminarProducto(index) {
  productos.splice(index, 1);
  guardarProductos();
  mostrarProductos();
}

mostrarProductos();
