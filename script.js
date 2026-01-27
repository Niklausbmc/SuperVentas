// ================== PRODUCTOS ==================
const productos = [
    {
        id: 1,
        nombre: "Ventilador",
        precio: 22000,
        imagen: "img/ventilador.jpg"
    },
    {
        id: 2,
        nombre: "Audífonos",
        precio: 18000,
        imagen: "img/audifonos.jpg"
    },
    {
        id: 3,
        nombre: "Zapatos",
        precio: 35000,
        imagen: "img/zapatos.jpg"
    }
];

// ================== ELEMENTOS ==================
const contenedor = document.getElementById("productos");
const listaCarrito = document.getElementById("lista-carrito");
const totalHTML = document.getElementById("total");
const contadorHTML = document.getElementById("contador");

// ================== CARRITO ==================
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// ================== MOSTRAR PRODUCTOS ==================
function mostrarProductos() {
    contenedor.innerHTML = "";

    productos.forEach(producto => {
        contenedor.innerHTML += `
            <div class="producto">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>S/ ${producto.precio}</p>
                <button onclick="agregarCarrito(${producto.id})">
                    Agregar
                </button>
            </div>
        `;
    });
}

// ================== AGREGAR AL CARRITO ==================
function agregarCarrito(id) {
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

// ================== GUARDAR ==================
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// ================== CONTADOR ==================
function actualizarContador() {
    let totalCantidad = 0;

    carrito.forEach(p => {
        totalCantidad += p.cantidad;
    });

    contadorHTML.textContent = totalCantidad;
}

// ================== ABRIR CARRITO ==================
function abrirCarrito() {
    document.getElementById("modal-carrito").style.display = "flex";
    mostrarCarrito();
}

// ================== CERRAR ==================
function cerrarCarrito() {
    document.getElementById("modal-carrito").style.display = "none";
}

// ================== MOSTRAR CARRITO ==================
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

// ================== WHATSAPP ==================
function comprarWhatsApp() {
    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    let mensaje = "🛒 *Pedido de la tienda* %0A%0A";

    carrito.forEach(p => {
        mensaje += `• ${p.nombre} x${p.cantidad} = S/ ${p.precio * p.cantidad}%0A`;
    });

    mensaje += `%0A💰 Total: S/ ${totalHTML.textContent}`;

    const telefono = "5355030439"; // ← cambia por tu número
    window.open(`https://wa.me/${telefono}?text=${mensaje}`, "_blank");
}

// ================== INICIAR ==================
mostrarProductos();
actualizarContador();
}

function sumar(id) {
    const producto = carrito.find(p => p.id === id);
    producto.cantidad++;
    guardarCarrito();
    mostrarCarrito();
    actualizarContador();
}

function restar(id) {
    const producto = carrito.find(p => p.id === id);
    producto.cantidad--;

    if (producto.cantidad <= 0) {
        carrito = carrito.filter(p => p.id !== id);
    }

    guardarCarrito();
    mostrarCarrito();
    actualizarContador();
}
