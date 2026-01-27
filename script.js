// =================== PRODUCTOS ===================
const productos = [
    { id: 1, nombre: "Ventilador", precio: 22000, imagen: "img/ventilador.jpg" },
    { id: 2, nombre: "Audifonos", precio: 18000, imagen: "img/audifonos.jpg" },
    { id: 3, nombre: "Zapatos", precio: 35000, imagen: "img/zapatos.jpg" }
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contenedor = document.getElementById("productos");
const listaCarrito = document.getElementById("lista-carrito");
const totalHTML = document.getElementById("total");
const contador = document.getElementById("contador");

// =================== MOSTRAR PRODUCTOS ===================
function mostrarProductos() {
    contenedor.innerHTML = "";

    productos.forEach(p => {
        contenedor.innerHTML += `
            <div class="producto">
                <img src="${p.imagen}">
                <h3>${p.nombre}</h3>
                <p>S/ ${p.precio}</p>
                <button onclick="agregar(${p.id})">Agregar</button>
            </div>
        `;
    });
}

// =================== AGREGAR ===================
function agregar(id) {
    const producto = productos.find(p => p.id === id);
    const existe = carrito.find(p => p.id === id);

    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito();
    actualizarContador();
}

// =================== CARRITO ===================
function mostrarCarrito() {
    listaCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach(p => {
        total += p.precio * p.cantidad;

        listaCarrito.innerHTML += `
            <div class="item-carrito">
                <strong>${p.nombre}</strong>

                <div class="cantidad">
                    <button onclick="restar(${p.id})">−</button>
                    <span>${p.cantidad}</span>
                    <button onclick="sumar(${p.id})">+</button>
                </div>

                <p>S/ ${p.precio * p.cantidad}</p>
            </div>
        `;
    });

    totalHTML.textContent = total;
}

// =================== + / - ===================
function sumar(id) {
    const p = carrito.find(p => p.id === id);
    p.cantidad++;
    guardarCarrito();
    mostrarCarrito();
    actualizarContador();
}

function restar(id) {
    const p = carrito.find(p => p.id === id);
    p.cantidad--;

    if (p.cantidad <= 0) {
        carrito = carrito.filter(x => x.id !== id);
    }

    guardarCarrito();
    mostrarCarrito();
    actualizarContador();
}

// =================== UTILIDADES ===================
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarContador() {
    contador.textContent = carrito.reduce((a, p) => a + p.cantidad, 0);
}

function abrirCarrito() {
    document.getElementById("modal-carrito").style.display = "flex";
    mostrarCarrito();
}

function cerrarCarrito() {
    document.getElementById("modal-carrito").style.display = "none";
}

function comprarWhatsApp() {
    let mensaje = "🧾 *Pedido*%0A";

    carrito.forEach(p => {
        mensaje += `- ${p.nombre} x${p.cantidad}%0A`;
    });

    mensaje += `%0ATotal: S/ ${totalHTML.textContent}`;

    window.open(`https://wa.me/5355030439?text=${mensaje}`);
}

// =================== INICIO ===================
mostrarProductos();
actualizarContador();

// =================== BUSCADOR ===================
const buscador = document.getElementById("buscador");

buscador.addEventListener("keyup", () => {
    const texto = buscador.value.toLowerCase();

    const filtrados = productos.filter(p =>
        p.nombre.toLowerCase().includes(texto)
    );

    mostrarProductosFiltrados(filtrados);
});

function mostrarProductosFiltrados(lista) {
    contenedor.innerHTML = "";

    lista.forEach(p => {
        contenedor.innerHTML += `
            <div class="producto">
                <img src="${p.imagen}">
                <h3>${p.nombre}</h3>
                <p>S/ ${p.precio}</p>
                <button onclick="agregar(${p.id})">Agregar</button>
            </div>
        `;
    });
}
