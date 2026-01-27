let carrito = [];

fetch("productos.csv")
    .then(res => res.text())
    .then(texto => {
        const lineas = texto.split("\n").slice(1);

        const productos = lineas.map(linea => {
            const datos = linea.replace("\r", "").split(",");

            return {
                id: datos[0].trim(),
                nombre: datos[1].trim(),
                precio: Number(datos[2].trim()),
                imagen: datos[3].trim()
            };
        });

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
    const existe = carrito.find(p => p.id === id);

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
    div.innerHTML = "";

    carrito.forEach(p => {
        div.innerHTML += `
            <div>
                ${p.nombre} - $${p.precio} x ${p.cantidad}
                <button onclick="cambiarCantidad('${p.id}',1)">+</button>
                <button onclick="cambiarCantidad('${p.id}',-1)">-</button>
            </div>
        `;
    });
}

function cambiarCantidad(id, cambio) {
    const producto = carrito.find(p => p.id === id);

    producto.cantidad += cambio;

    if (producto.cantidad <= 0) {
        carrito = carrito.filter(p => p.id !== id);
    }

    mostrarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    mostrarCarrito();
}
