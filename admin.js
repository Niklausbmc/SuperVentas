import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🔥 TU CONFIG REAL (PEGA LA TUYA)
const firebaseConfig = {
  apiKey: "AIzaSyBm8gvyEpo4P7GAWyhP3XP_MUcD9gNA5H8",
  authDomain: "superventas-d50e2.firebaseapp.com",
  projectId: "superventas-d50e2",
  storageBucket: "superventas-d50e2.appspot.com",
  messagingSenderId: "282791580507",
  appId: "1:282791580507:web:4bc8f815fb320a1e24c07e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    // usuario logueado
    document.getElementById("login").style.display = "none";
    document.getElementById("panel").style.display = "block";
  } else {
    // no logueado
    document.getElementById("login").style.display = "block";
    document.getElementById("panel").style.display = "none";
  }
});

// 🔐 LOGIN
const form = document.getElementById("loginForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

signInWithEmailAndPassword(auth, email, password)
  .then(() => {
    alert("✅ Bienvenido administrador");
  })
  .catch((error) => {
    alert("❌ Correo o contraseña incorrectos");
    console.error(error);
  });
});

// 🔁 mantener sesión
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("panel").style.display = "block";
  }
});

// 🚪 cerrar sesión
window.logout = () => {
  signOut(auth).then(() => location.reload());
};

window.agregarProducto = async function () {
  const nombre = document.getElementById("nombre").value;
  const precio = Number(document.getElementById("precio").value);
  const stock = Number(document.getElementById("stock").value);
  const imagen = document.getElementById("imagen").value;

  if (!nombre || !precio || !imagen) {
    alert("Completa todos los campos");
    return;
  }

  try {
    await addDoc(collection(db, "productos"), {
      nombre,
      precio,
      stock,
      imagen,
      fecha: new Date()
    });

    alert("✅ Producto guardado");

    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("stock").value = "";
    document.getElementById("imagen").value = "";

  } catch (error) {
    alert("❌ Error al guardar");
    console.error(error);
  }
};



