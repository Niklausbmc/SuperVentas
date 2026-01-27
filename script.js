let carrito = [];
let total = 0;

function abrirCarrito() {
  document.getElementById("modalCarrito").style.display = "flex";
}

function cerrarCarrito() {
  document.getElementById("modalCarrito").style.display = "none";
}

function agregar(nombre, precio) {
  carrito.push({ nombre, precio });
  total += precio;

  document.getElementById("contador").textContent = carrito.length;
  actualizarBoleta();
}

function actualizarBoleta() {
  const lista = document.getElementById("listaCarrito");
  lista.innerHTML = "";

  carrito.forEach(p => {
    const div = document.createElement("div");
    div.textContent = `${p.nombre} - S/ ${p.precio}`;
    lista.appendChild(div);
  });

  document.getElementById("total").textContent = total;
}
