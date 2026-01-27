let productos = JSON.parse(localStorage.getItem("productos")) || [];
let carrito = [];

const contenedor = document.getElementById("productos");
const listaCarrito = document.getElementById("listaCarrito");
const totalSpan = document.getElementById("total");
const contador = document.getElementById("contador");

// MOSTRAR PRODUCTOS
function mostrarProductos(lista = productos) {
    contenedor.innerHTML = "";

    lista.forEach((p, index) => {
        contenedor.innerHTML += `
            <div class="producto">
                <img src="img/${p.imagen}" alt="${p.nombre}">
                <h3>${p.nombre}</h3>
                <p class="precio">$${p.precio}</p>
                <button onclick="agregar(${index})">Agregar</button>
            </div>
        `;
    });
}

mostrarProductos();

// AGREGAR AL CARRITO
function agregar(index) {
    const producto = productos[index];

    const existe = carrito.find(p => p.nombre === producto.nombre);

    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }

    actualizarCarrito();
}

// ACTUALIZAR CARRITO
function actualizarCarrito() {
    listaCarrito.innerHTML = "";
    let total = 0;
    let cantidadTotal = 0;

    carrito.forEach((p, i) => {
        total += p.precio * p.cantidad;
        cantidadTotal += p.cantidad;

        listaCarrito.innerHTML += `
            <li>
                ${p.nombre} 
                (${p.cantidad})
                - $${p.precio * p.cantidad}
                <button onclick="menos(${i})">−</button>
                <button onclick="mas(${i})">+</button>
            </li>
        `;
    });

    totalSpan.textContent = total;
    contador.textContent = cantidadTotal;
}

// SUMAR
function mas(i) {
    carrito[i].cantidad++;
    actualizarCarrito();
}

// RESTAR
function menos(i) {
    carrito[i].cantidad--;

    if (carrito[i].cantidad <= 0) {
        carrito.splice(i, 1);
    }

    actualizarCarrito();
}

// VACIAR
document.getElementById("vaciar").addEventListener("click", () => {
    carrito = [];
    actualizarCarrito();
});

// FILTRO CATEGORÍAS
function filtrarCategoria(cat) {
    if (cat === "todas") {
        mostrarProductos();
    } else {
        const filtrados = productos.filter(p => p.categoria === cat);
        mostrarProductos(filtrados);
    }
}
