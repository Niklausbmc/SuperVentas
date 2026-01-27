function login() {
  const pass = document.getElementById("password").value;

  if (pass === "1234") {
    document.getElementById("panelAdmin").style.display = "block";
  } else {
    alert("Contraseña incorrecta");
  }
}

// =============================
// PRODUCTOS
// =============================

let productos = JSON.parse(localStorage.getItem("productosAdmin")) || [];
const tabla = document.getElementById("tablaProductos");

function mostrarProductos() {
  if (!tabla) return;

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

document.getElementById("agregar")?.addEventListener("click", () => {
  const nombre = document.getElementById("nombre").value;
  const precio = document.getElementById("precio").value;
  const categoria = document.getElementById("categoria").value;
  const imagen = document.getElementById("imagen").value;

  if (!nombre || !precio || !categoria || !imagen) {
    alert("Completa todos los campos");
    return;
  }

  productos.push({
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

function login() {
    const usuario = document.getElementById("usuario").value;
    const clave = document.getElementById("clave").value;

    if (usuario === "admin" && clave === "1234") {
        localStorage.setItem("adminLogueado", "true");
        window.location.href = "panel.html";
    } else {
        alert("Usuario o contraseña incorrectos");
    }
}
