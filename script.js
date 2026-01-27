let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

fetch("productos.json")
    .then(res => res.json())
    .then(productos => {
        mostrarProductos(productos);
    });

function mostrarProductos(productos) {
    const contenedor = document.getElementById("productos");
    contenedor.innerHTML = "";

    productos.forEach(p => {
        contenedor.innerHTML += `
            <div class="producto">
                <img src="img/${p.imagen}" width="180">
                <h3>${p.nombre}</h3>
                <p>$${p.precio}</p>
                <button onclick="agregarCarrito('${p.id}','${p.nombre}',${p.precio})">
                    Agregar
                </button>
            </div>
        `;
    });
}

function agregarCarrito(id, nombre, precio) {
    const existe = carrito.find(p => p.id == id);

    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({
            id,
            nombre,
            precio,
            cantidad: 1
        });
    }

    mostrarCarrito();
}

function mostrarCarrito() {
    const div = document.getElementById("carrito");
    const totalSpan = document.getElementById("total");

    div.innerHTML = "";
    let total = 0;

    carrito.forEach(p => {
        total += p.precio * p.cantidad;

        div.innerHTML += `
            <div>
                ${p.nombre} - $${p.precio} x ${p.cantidad}
                <button onclick="cambiarCantidad('${p.id}',1)">+</button>
                <button onclick="cambiarCantidad('${p.id}',-1)">-</button>
            </div>
        `;
    });

    totalSpan.textContent = total;
}

function cambiarCantidad(id, cambio) {
    const producto = carrito.find(p => p.id == id);

    producto.cantidad += cambio;

    if (producto.cantidad <= 0) {
        carrito = carrito.filter(p => p.id != id);
    }

    mostrarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    mostrarCarrito();
}


