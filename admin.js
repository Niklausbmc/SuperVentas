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

// 🔥 TU CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyBm8gvyEpo4P7GAWyhP3XP_MUcD9gNA5H8",
  authDomain: "superventas-d50e2.firebaseapp.com",
  projectId: "superventas-d50e2",
  storageBucket: "superventas-d50e2.firebasestorage.app",
  messagingSenderId: "282791580507",
  appId: "1:282791580507:web:4bc8f815fb320a1e24c07e"
};;

// INIT
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ELEMENTOS
function mostrarPanel(logueado) {
  const loginBox = document.getElementById("login");
  const panelBox = document.getElementById("panel");

  if (!loginBox || !panelBox) return;

  if (logueado) {
    loginBox.style.display = "none";
    panelBox.style.display = "block";
  } else {
    loginBox.style.display = "block";
    panelBox.style.display = "none";
  }
}

// 🔐 CONTROL DE SESIÓN
onAuthStateChanged(auth, (user) => {
  mostrarPanel(!!user);
});

// LOGIN
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("✅ Bienvenido administrador");
    })
    .catch(() => {
      alert("❌ Correo o contraseña incorrectos");
    });
});

// AGREGAR PRODUCTO
window.agregarProducto = async () => {
  const nombre = document.getElementById("nombre").value;
  const precio = Number(document.getElementById("precio").value);
  const stock = Number(document.getElementById("stock").value);
  const imagen = document.getElementById("imagen").value;

  try {
    await addDoc(collection(db, "productos"), {
      nombre,
      precio,
      stock,
      imagen
    });

    alert("✅ Producto guardado correctamente");

    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("stock").value = "";
    document.getElementById("imagen").value = "";

  } catch (error) {
    console.error(error);
    alert("❌ Error al guardar producto");
  }
};

// CERRAR SESIÓN
window.cerrarSesion = () => {
  signOut(auth);
};



