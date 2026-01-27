document.addEventListener("DOMContentLoaded", () => {

  const productos = [
    { id: 1, nombre: "Ventilador", precio: 22000, imagen: "img/ventilador.jpg" },
    { id: 2, nombre: "Audífonos", precio: 18000, imagen: "img/audifonos.jpg" },
    { id: 3, nombre: "Zapatos", precio: 35000, imagen: "img/zapatos.jpg" }
  ];

  let carrito = [];

  const contenedor = document.getElementById("productos");
  const contador = document.getElementById("contador");
  const lista = document.getElementById("lista-carrito");
  const total = document.getElementById("total");
  const modal = document.getElementById("modal-carrito");

  function mostrarProductos() {
    contenedor.innerHTML = "";
    productos.forEach(p => {
      contenedor.innerHTML += `
        <div class="producto">
          <img src="${p.imagen}">
          <h3>${p.nombre}</h3>
          <p>S/ ${p.precio}</p>
          <button onclick="agregarAlCarrito(${p.id})">Agregar</button>
        </div>
      `;
    });
  }

  window.agregarAlCarrito = (id) => {
    const producto = productos.find(p => p.id === id);
    carrito.push(producto);
    contador.textContent = carrito.length;
  };

  window.abrirCarrito = () => {
    modal.style.display = "flex";
    mostrarCarrito();
  };

  window.cerrarCarrito = () => {
    modal.style.display = "none";
  };

  function mostrarCarrito() {
    lista.innerHTML = "";
    let suma = 0;

    carrito.forEach(p => {
      lista.innerHTML += `<p>${p.nombre} - S/ ${p.precio}</p>`;
      suma += p.precio;
    });

    total.textContent = suma;
  }

  window.comprarWhatsApp = () => {
    let mensaje = "🧾 *Pedido*%0A";
    let suma = 0;

    carrito.forEach(p => {
      mensaje += `• ${p.nombre} - S/ ${p.precio}%0A`;
      suma += p.precio;
    });

    mensaje += `%0A*Total: S/ ${suma}*`;

    const numero = "5355030439"; // 👈 CAMBIA TU NÚMERO
    window.open(`https://wa.me/${numero}?text=${mensaje}`);
  };

  mostrarProductos();

});
