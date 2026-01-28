import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "superventas-d50e2.firebaseapp.com",
  projectId: "superventas-d50e2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "panel.html";
    })
    .catch((error) => {
      alert("Correo o contraseña incorrectos");
      console.log(error.message);
    });
});

// 👉 VERIFICAR SESIÓN
onAuthStateChanged(auth, user => {
  if (user) {
    document.getElementById("login").style.display = "none";
    document.getElementById("panel").style.display = "block";
    document.getElementById("titulo").innerText = "Panel Administrador";
  } else {
    document.getElementById("login").style.display = "block";
    document.getElementById("panel").style.display = "none";
    document.getElementById("titulo").innerText = "Login Administrador";
  }
});

// 👉 AGREGAR PRODUCTOS
window.agregarProducto = async function () {
  const nombre = document.getElementById("nombre").value;
  const precio = Number(document.getElementById("precio").value);
  const stock = Number(document.getElementById("stock").value);
  const imagen = document.getElementById("imagen").value;

  if (!nombre || !precio || !stock || !imagen) {
    alert("Completa todo");
    return;
  }

  await addDoc(collection(db, "productos"), {
    nombre,
    precio,
    stock,
    imagen
  });

  alert("✅ Producto guardado");

  document.getElementById("nombre").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("stock").value = "";
  document.getElementById("imagen").value = "";
};

// 👉 LOGOUT
window.logout = function () {
  signOut(auth);
};

