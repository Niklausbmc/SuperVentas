// 🔥 Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// 🔧 CONFIG FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyBm8gvyEpo4P7GAWyhP3XP_MUcD9gNA5H8",
  authDomain: "superventas-d50e2.firebaseapp.com",
  projectId: "superventas-d50e2",
  storageBucket: "superventas-d50e2.firebasestorage.app",
  messagingSenderId: "282791580507",
  appId: "1:282791580507:web:4bc8f815fb320a1e24c07e"
};

// 🔥 iniciar firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// 🔐 LOGIN
const form = document.getElementById("loginForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      document.getElementById("loginForm").style.display = "none";
      document.getElementById("panel").style.display = "block";
    })
    .catch(() => {
      alert("Correo o contraseña incorrectos");
    });
});


// 🔄 MANTENER SESIÓN
onAuthStateChanged(auth, (user) => {
  const login = document.getElementById("loginForm");
  const panel = document.getElementById("panel");

  if (user) {
    login.style.display = "none";
    panel.style.display = "block";
  } else {
    panel.style.display = "none";
    login.style.display = "block";
  }
});


// ➕ AGREGAR PRODUCTO
window.agregarProducto = async () => {
  const nombre = document.getElementById("nombre").value;
  const precio = document.getElementById("precio").value;
  const stock = document.getElementById("stock").value;
  const imagen = document.getElementById("imagen").value;

  if (!nombre || !precio || !stock || !imagen) {
    alert("Completa todos los campos");
    return;
  }

  await addDoc(collection(db, "productos"), {
    nombre,
    precio: Number(precio),
    stock: Number(stock),
    imagen
  });

  alert("Producto guardado");

  document.getElementById("nombre").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("stock").value = "";
  document.getElementById("imagen").value = "";
};


// 🔒 CERRAR SESIÓN
window.cerrarSesion = () => {
  signOut(auth);
  location.reload();
};

