// ============================
// 🔥 FIREBASE
// ============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ============================
// ⚙️ CONFIG
// ============================
const firebaseConfig = {
  apiKey: "AIzaSyBm8gyyEp04P7GAWyhP3XP_MUcD9ggNASH0",
  authDomain: "superventas-d50e2.firebaseapp.com",
  projectId: "superventas-d50e2",
  storageBucket: "superventas-d50e2.appspot.com",
  messagingSenderId: "282791580507",
  appId: "1:282791580507:web:4bc8f815fb320a1e24c07e"
};

// ============================
// 🚀 INIT
// ============================
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ============================
// 🛍 PRODUCTOS
// ============================
const contenedor = document.getElementById("productos");

// ============================
// 🛒 CARRITO
// ============================
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const listaCarrito = document.getElementById("listaCarrito");
const totalSpan = document.getElementById("total");
const contador = document.getElementById("contador");
const modalCarrito = document.getElementById("modalCarrito");

// ============================
// 🔄 GUARDAR
// ============================
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// ============================
// ➕ AGREGAR
// ============================
window.agregarAlCarrito = function (producto) {
  const existe = carrito.find(p => p.id === producto.id);

  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarrito();
  mostrarCarrito();
}

// ============================
// 🧾 MOSTRAR CARRITO
// ============================
function mostrarCarrito() {
  listaCarrito.innerHTML = "";
  let total = 0;
  let cantidad = 0;

  carrito.forEach(p => {
    total += p.precio * p.cantidad;
    cantidad += p.cantidad;

    listaCarrito.innerHTML += `
      <div class="item-carrito">
        <img src="img/${p.imagen}" width="50">
        <b>${p.nombre}</b>
        <span>S/ ${p.precio}</span>

        <button onclick="restar('${p.id}')">−</button>
        <span>${p.cantidad}</span>
        <button onclick="sumar('${p.id}')">+</button>

        <button onclick="eliminar('${p.id}')">❌</button>
      </div>
    `;
  });

  totalSpan.textContent = total.toFixed(2);
  contador.textContent = cantidad;
}

// ============================
// ➕ / ➖
// ============================
window.sumar = id => {
  carrito.find(p => p.id === id).cantidad++;
  guardarCarrito();
  mostrarCarrito();
};

window.restar = id => {
  const p = carrito.find(p => p.id === id);
  p.cantidad--;

  if (p.cantidad <= 0) {
    carrito = carrito.filter(x => x.id !== id);
  }

  guardarCarrito();
  mostrarCarrito();
};

window.eliminar = id => {
  carrito = carrito.filter(p => p.id !== id);
  guardarCarrito();
  mostrarCarrito();
};

// ============================
// 🧾 MODAL
// ============================
window.abrirCarrito = () => {
  modalCarrito.style.display = "flex";
};

window.cerrarCarrito = () => {
  modalCarrito.style.display = "none";
};

// ============================
// ✅ FINALIZAR
// ============================
window.finalizarCompra = () => {
  if (carrito.length === 0) {
    alert("El carrito está vacío");
    return;
  }

  alert("✅ Compra finalizada (simulación)");

  carrito = [];
  guardarCarrito();
  mostrarCarrito();
};

// ============================
// 🔥 CARGAR PRODUCTOS
// ============================
async function cargarProductos() {
  const snapshot = await getDocs(collection(db, "productos"));
  contenedor.innerHTML = "";

  snapshot.forEach(doc => {
    const p = doc.data();

    contenedor.innerHTML += `
      <div class="producto">
        <img src="img/${p.imagen}">
        <h3>${p.nombre}</h3>
        <p>S/ ${p.precio}</p>
        <p>Stock: ${p.stock}</p>

        <button onclick='agregarAlCarrito({
          id: "${doc.id}",
          nombre: "${p.nombre}",
          precio: ${p.precio},
          imagen: "${p.imagen}"
        })'>
          Agregar
        </button>
      </div>
    `;
  });
}

// ============================
cargarProductos();
mostrarCarrito();

