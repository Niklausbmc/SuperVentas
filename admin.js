function login() {
  const usuario = document.getElementById("usuario").value;
  const clave = document.getElementById("clave").value;

  if (usuario === "admin" && clave === "1234") {
    window.location.href = "panel.html";
  } else {
    alert("Usuario o contraseña incorrectos");
  }
}
