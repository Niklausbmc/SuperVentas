// ======================
// 🔥 FIREBASE
// ======================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ======================
// 🔥 CONFIG
// ======================
const firebaseConfig = {
  apiKey: "AIzaSyBm8gyyEp04P7GAWyhP3XP_MUcD9qgNA5H0",
  authDomain: "superventas-d50e2.firebaseapp.com",
  projectId: "superventas-d50e2",
  storageBucket: "superventas-d50e2.appspot.com",
  messagingSenderId: "282791580507",
  appId: "1:282791580507:web:4bc8f815fb320a1e24c07e"
};

// ======================
// 🔥 INIT
// ======================
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ======================
// 🛒 MOSTRAR PRODUCTOS
// ======================
const contenedor = document.getElementById("productos");

async function cargarProductos() {
  const snapshot = await getDocs(collection(db, "productos"));

  contenedor.innerHTML = "";

  snapshot.forEach((doc) => {
    const p = doc.data();

    contenedor.innerHTML += `
      <div class="producto">
        <img src="img/${p.imagen}" alt="${p.nombre}">
        <h3>${p.nombre}</h3>
        <p class="precio">$${p.precio}</p>
        <p class="stock">Stock: ${p.stock}</p>
        <button>Agregar</button>
      </div>
    `;
  });
}

cargarProductos();
