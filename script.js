// =================== PRODUCTOS ===================
let productos = [];
fetch("productos.csv")
  .then(res => res.text())
  .then(data => {
    const filas = data.split("\n").slice(1);

    filas.forEach(fila => {
      if (fila.trim() === "") return;

      const [id, nombre, precio, stock, categoria, imagen] = fila.split(";");

      productos.push({
        id: Number(id),
        nombre: nombre,
        precio: Number(precio),
        stock: Number(stock),
        categoria: categoria,
        imagen: imagen
      });
    });

    mostrarProductos();
  });

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
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);

    const existe = carrito.find(p => p.id === id);

    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }

    guardarCarrito();
    mostrarCarrito();
}
    actualizarContador();
    const carritoIcon = document.querySelector(".carrito-flotante");

carritoIcon.classList.add("carrito-animado");

setTimeout(() => {
  carritoIcon.classList.remove("carrito-animado");
}, 400);
}

// =================== CARRITO ===================
function mostrarCarrito() {
    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {
        listaCarrito.innerHTML = "<p>🛒 Carrito vacío</p>";
        totalHTML.textContent = "0";
        contador.textContent = "0";
        return;
    }

    let total = 0;
    let cantidadTotal = 0;

    carrito.forEach(producto => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;
        cantidadTotal += producto.cantidad;

        listaCarrito.innerHTML += `
            <div class="item-carrito">
                <strong>${producto.nombre}</strong><br>
                S/ ${producto.precio} x ${producto.cantidad} = 
                <b>S/ ${subtotal}</b>

                <div class="cantidad">
                    <button onclick="disminuir(${producto.id})">−</button>
                    <span>${producto.cantidad}</span>
                    <button onclick="aumentar(${producto.id})">+</button>
                </div>
            </div>
        `;
    });

    totalHTML.textContent = total;
    contador.textContent = cantidadTotal;
}

// =================== + / - ===================
function aumentar(id) {
    const producto = carrito.find(p => p.id === id);
    producto.cantidad++;
    guardarCarrito();
    mostrarCarrito();
}

function disminuir(id) {
    const producto = carrito.find(p => p.id === id);

    if (producto.cantidad > 1) {
        producto.cantidad--;
    } else {
        carrito = carrito.filter(p => p.id !== id);
    }

    guardarCarrito();
    mostrarCarrito();
}

// =================== UTILIDADES ===================
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarContador() {
    contador.textContent = carrito.reduce((a, p) => a + p.cantidad, 0);
}

function abrirCarrito() {
    const modal = document.getElementById("modal-carrito");
    modal.style.display = "flex";
}

function cerrarCarrito() {
    const modal = document.getElementById("modal-carrito");
    modal.style.display = "none";
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








