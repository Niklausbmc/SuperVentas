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
    localStorage.setItem("carrito", JSON.stringify(carrito));
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
   
    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    localStorage.removeItem("carrito");
    mostrarCarrito();
}

function finalizarCompra() {
    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    let mensaje = "🧾 *BOLETA DE COMPRA*%0A%0A";

    carrito.forEach(p => {
        mensaje += `• ${p.nombre} x ${p.cantidad} = $${p.precio * p.cantidad}%0A`;
    });

    let total = carrito.reduce(
        (sum, p) => sum + p.precio * p.cantidad,
        0
    );

    mensaje += `%0A💰 *TOTAL: $${total}*`;

    // 👉 TU NÚMERO DE WHATSAPP (cámbialo)
    let telefono = "5355030439";

    let url = `https://wa.me/${telefono}?text=${mensaje}`;

    window.open(url, "_blank");
}

function mostrarBoleta() {
    document.getElementById("boleta").classList.remove("oculto");

    let lista = document.getElementById("boleta-productos");
    let totalSpan = document.getElementById("boleta-total");

    lista.innerHTML = "";
    let total = 0;

    carrito.forEach(p => {
        let subtotal = p.precio * p.cantidad;
        total += subtotal;

        lista.innerHTML += `
            <p>${p.nombre} x ${p.cantidad} = $${subtotal}</p>
        `;
    });

    totalSpan.textContent = total;
}

function cerrarBoleta() {
    document.getElementById("boleta").classList.add("oculto");
}
mostrarCarrito();



