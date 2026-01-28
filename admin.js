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

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "superventas-d50e2.firebaseapp.com",
  projectId: "superventas-d50e2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const loginForm = document.getElementById("loginForm");
const panel = document.getElementById("panel");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Bienvenido administrador");
    })
    .catch(() => {
      alert("Correo o contraseña incorrectos");
    });
});

// detectar sesión
onAuthStateChanged(auth, (user) => {
  if (user) {
    loginForm.style.display = "none";
    panel.style.display = "block";
  } else {
    loginForm.style.display = "block";
    panel.style.display = "none";
  }
});

// cerrar sesión
window.logout = () => {
  signOut(auth);
};

// agregar producto
window.agregarProducto = async () => {
  const nombre = document.getElementById("nombre").value;
  const precio = Number(document.getElementById("precio").value);
  const stock = Number(document.getElementById("stock").value);
  const imagen = document.getElementById("imagen").value;

  await addDoc(collection(db, "productos"), {
    nombre,
    precio,
    stock,
    imagen
  });

  alert("Producto agregado");
};

