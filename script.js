// ============================
// CARGAR PRODUCTOS
// ============================

let productos = JSON.parse(localStorage.getItem("productos")) || [];
let carrito = [];

const contenedor = document.getElementById("productos");
const listaCarrito = document.getElementById("listaCarrito");
const totalSpan = document.getElementById("total");
const buscador = document.getElementById("buscador");

// ============================
// MOSTRAR PRODUCTOS
// ============================

function mostrarProductos(lista) {
    contenedor.innerHTML = "";

    lista.forEach((producto, index) => {
        contenedor.innerHTML += `
            <div class="producto">
                <img src="img/${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>$${Number(producto.precio)}</p>
                <button onclick="agregarCarrito(${index})">Agregar</button>
            </div>
        `;
    });
}

mostrarProductos(productos);

// ============================
// AGREGAR AL CARRITO
// ============================

function agregarCarrito(index) {
    carrito.push(productos[index]);
    actualizarCarrito();
}

// ============================
// ACTUALIZAR CARRITO
// ============================

function actualizarCarrito() {
    listaCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach((producto) => {
        listaCarrito.innerHTML += `
            <li>${producto.nombre} - $${Number(producto.precio)}</li>
        `;
        total += Number(producto.precio);
    });

    totalSpan.textContent = total;
}

// ============================
// VACIAR CARRITO
// ============================

document.getElementById("vaciar").addEventListener("click", () => {
    carrito = [];
    actualizarCarrito();
});

// ============================
// FILTRAR POR CATEGORÍA
// ============================

function filtrarCategoria(categoria) {
    if (categoria === "todas") {
        mostrarProductos(productos);
    } else {
        const filtrados = productos.filter(
            p => p.categoria === categoria
        );
        mostrarProductos(filtrados);
    }
}

// ============================
// BUSCADOR
// ============================

buscador.addEventListener("input", () => {
    const texto = buscador.value.toLowerCase();

    const filtrados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(texto)
    );

    mostrarProductos(filtrados);
});
