// 🔥 Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🔧 tu configuración real
const firebaseConfig = {
  apiKey: "Klaus97*",
  authDomain: "superventas-d50e2.firebaseapp.com",
  projectId: "superventas-d50e2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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
    .catch((error) => {
      alert("❌ Correo o contraseña incorrectos");
      console.error(error);
    });
});

// 🔒 Mantener sesión
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("panel").style.display = "block";
  }
});

// 🚪 Logout
window.logout = () => {
  signOut(auth);
  location.reload();
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



