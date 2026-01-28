import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔥 MISMA CONFIG DE TU TIENDA
const firebaseConfig = {
  apiKey: "AIzaSyBm8gyyEp04P7GAWyhP3XP_MUcD9ggNASH0",
  authDomain: "superventas-d50e2.firebaseapp.com",
  projectId: "superventas-d50e2",
  storageBucket: "superventas-d50e2.appspot.com",
  messagingSenderId: "282791580507",
  appId: "1:282791580507:web:4bc8f815fb320a1e24c07e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 👇 HACER GLOBAL
window.agregarProducto = async function () {

  const nombre = document.getElementById("nombre").value;
  const precio = Number(document.getElementById("precio").value);
  const stock = Number(document.getElementById("stock").value);
  const imagen = document.getElementById("imagen").value;

  if (!nombre || !precio || !stock || !imagen) {
    alert("Completa todos los campos");
    return;
  }

  await addDoc(collection(db, "productos"), {
    nombre,
    precio,
    stock,
    imagen
  });

  alert("✅ Producto agregado");

  document.getElementById("nombre").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("stock").value = "";
  document.getElementById("imagen").value = "";
};
