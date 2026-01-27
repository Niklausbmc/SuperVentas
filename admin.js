// 🔐 protección
if (window.location.pathname.includes("panel.html")) {
    if (localStorage.getItem("adminLogueado") !== "true") {
        window.location.href = "admin.html";
    }
}

// cerrar sesión
function cerrarSesion() {
    localStorage.removeItem("adminLogueado");
    window.location.href = "admin.html";
}

// productos
let productos = JSON.parse(localStorage.getItem("productosAdmin")) || [];

function agregarProducto() {
    const nombre = document.getElementById("nombre").value;
    const precio = document.getElementById("precio").value;
    const imagen = document.getElementById("imagen").value;

    if (!nombre || !precio || !imagen) {
        alert("Completa todos los campos");
        return;
    }

    productos.push({
        nombre,
        precio,
        imagen
    });

    localStorage.setItem("productosAdmin", JSON.stringify(productos));

    mostrarProductos();

    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("imagen").value = "";
}

function mostrarProductos() {
    const lista = document.getElementById("listaProductos");
    if (!lista) return;

    lista.innerHTML = "";

    productos.forEach((p, i) => {
        lista.innerHTML += `
            <li>
                ${p.nombre} - $${p.precio}
                <button onclick="eliminarProducto(${i})">❌</button>
            </li>
        `;
    });
}

function eliminarProducto(index) {
    productos.splice(index, 1);
    localStorage.setItem("productosAdmin", JSON.stringify(productos));
    mostrarProductos();
}

mostrarProductos();
