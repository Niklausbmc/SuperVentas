import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🔥 TU CONFIG REAL (PEGA LA TUYA)
const firebaseConfig = {
  apiKey: "AQUI_TU_API_KEY",
  authDomain: "superventas-d50e2.firebaseapp.com",
  projectId: "superventas-d50e2",
  storageBucket: "superventas-d50e2.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
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
      alert(error.message);
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


