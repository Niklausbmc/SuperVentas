// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBm8gvyEpo4P7GAWyhp3XP_MUcD9gNA5H8",
  authDomain: "superventas-d50e2.firebaseapp.com",
  projectId: "superventas-d50e2",
  storageBucket: "superventas-d50e2.firebasestorage.app",
  messagingSenderId: "282791580507",
  appId: "1:282791580507:web:4bc8f815fb320a1e24c07e"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);