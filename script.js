// 🔥 FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

// 🔑 Configuración Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBm8gvyEpo4P7GAWyhP3XP_MUcD9gNA5H8",
  authDomain: "superventas-d50e2.firebaseapp.com",
  projectId: "superventas-d50e2",
  storageBucket: "superventas-d50e2.firebasestorage.app",
  messagingSenderId: "282791580507",
  appId: "1:282791580507:web:4bc8f815fb320a1e24c07e"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
let productos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contenedor = document.getElementById("productos");
const lista = document.getElementById("listaCarrito");
const totalHTML = document.getElementById("total");
const contador = document.getElementById("contador");

onSnapshot(collection(db, "productos"), (snapshot) => {
  contenedor.innerHTML = "";

  snapshot.forEach((doc) => {
    const p = doc.data();

    contenedor.innerHTML += `
      <div class="producto">
        <img src="${p.imagen}" />
        <h3>${p.nombre}</h3>
        <p>$${p.precio}</p>
        <p>Stock: ${p.stock}</p>
        <button>Agregar</button>
      </div>
    `;
  });
});

function mostrarProductos(lista = productos) {
  contenedor.innerHTML = "";

  lista.forEach(p => {
    const div = document.createElement("div");
    div.className = "producto";

    div.innerHTML = `
      <img src="${p.imagen}">
      <h3>${p.nombre}</h3>
      <p>S/ ${p.precio}</p>
      <button onclick="agregarCarrito(${p.id})">
        Agregar
      </button>
    `;

    contenedor.appendChild(div);
  });
}

function agregar(id) {
  const prod = productos.find(p => p.id === id);
  const existe = carrito.find(p => p.id === id);

  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({ ...prod, cantidad: 1 });
  }

  guardar();
  actualizarTodo();
}

function actualizarTodo() {
  lista.innerHTML = "";
  let total = 0;
  let cant = 0;

  carrito.forEach(p => {
    total += p.precio * p.cantidad;
    cant += p.cantidad;

    lista.innerHTML += `
      <div class="item">
        <strong>${p.nombre}</strong><br>
        S/ ${p.precio} x ${p.cantidad}
        <div class="cantidad">
          <button onclick="menos(${p.id})">−</button>
          <span>${p.cantidad}</span>
          <button onclick="mas(${p.id})">+</button>
        </div>
      </div>
    `;
  });

  totalHTML.textContent = total;
  contador.textContent = cant;
}

function mas(id) {
  carrito.find(p => p.id === id).cantidad++;
  guardar();
  actualizarTodo();
}

function menos(id) {
  let p = carrito.find(p => p.id === id);
  p.cantidad--;
  if (p.cantidad <= 0) {
    carrito = carrito.filter(x => x.id !== id);
  }
  guardar();
  actualizarTodo();
}

function guardar() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function abrirCarrito() {
  document.getElementById("modalCarrito").style.display = "flex";
}

function cerrarCarrito() {
  document.getElementById("modalCarrito").style.display = "none";
}

function enviarWhatsApp() {
  const metodo = document.querySelector('input[name="pago"]:checked').value;

  let msg = "🛒 Pedido:%0A";
  carrito.forEach(p => {
    msg += `${p.nombre} x${p.cantidad}%0A`;
  });

  msg += `Total: S/ ${totalHTML.textContent}%0A`;
  msg += `Pago: ${metodo}`;

  window.open(`https://wa.me/5355030439?text=${msg}`);
}

function filtrarProductos() {
  const texto = document.getElementById("buscar").value.toLowerCase();

  const filtrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(texto) ||
    p.categoria.toLowerCase().includes(texto)
  );

  mostrarProductos(filtrados);
}

function agregarCarrito(id) {
  const producto = productos.find(p => p.id === id);

  if (!producto) return;

  const existe = carrito.find(p => p.id === id);

  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({
      ...producto,
      cantidad: 1
    });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  actualizarTodo();
}

// ============================
// EFECTO DE ESTACIONES
// ============================

const estaciones = ["primavera", "verano", "otono", "invierno"];
let estacionActual = estaciones[new Date().getMonth() % 4];

document.body.classList.add(estacionActual);

const efectos = document.getElementById("efectos");

function crearEfecto() {
  const el = document.createElement("div");
  el.classList.add("efecto");

  el.style.left = Math.random() * 100 + "vw";
  el.style.animationDuration = (5 + Math.random() * 5) + "s";
  el.style.fontSize = (12 + Math.random() * 20) + "px";

  // símbolo según estación
  if (estacionActual === "primavera") el.innerHTML = "🌸";
  if (estacionActual === "verano") el.innerHTML = "☀️";
  if (estacionActual === "otono") el.innerHTML = "🍂";
  if (estacionActual === "invierno") el.innerHTML = "❄️";

  efectos.appendChild(el);

  setTimeout(() => {
    el.remove();
  }, 10000);
}

// crear continuamente
setInterval(crearEfecto, 500);


