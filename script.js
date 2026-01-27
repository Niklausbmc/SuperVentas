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

  // =============================
  // MOSTRAR PRODUCTOS
  // =============================
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

  // =============================
  // AGREGAR AL CARRITO
  // =============================
  window.agregarAlCarrito = (id) => {
    const existe = carrito.find(p => p.id === id);

    if (existe) {
      existe.cantidad++;
    } else {
      const producto = productos.find(p => p.id === id);
      carrito.push({
        ...producto,
        cantidad: 1
      });
    }

    actualizarContador();
  };

  // =============================
  // MOSTRAR CARRITO
  // =============================
  function mostrarCarrito() {
    lista.innerHTML = "";
    let suma = 0;

    carrito.forEach(p => {
      suma += p.precio * p.cantidad;

      lista.innerHTML += `
        <div class="item-carrito">
          <strong>${p.nombre}</strong><br>
          S/ ${p.precio}

          <div class="cantidad">
            <button onclick="restar(${p.id})">−</button>
            <span>${p.cantidad}</span>
            <button onclick="sumar(${p.id})">+</button>
          </div>
        </div>
        <hr>
      `;
    });

    total.textContent = suma;
  }

  // =============================
  // SUMAR / RESTAR
  // =============================
  window.sumar = (id) => {
    const prod = carrito.find(p => p.id === id);
    prod.cantidad++;
    mostrarCarrito();
    actualizarContador();
  };

  window.restar = (id) => {
    const prod = carrito.find(p => p.id === id);
    prod.cantidad--;

    if (prod.cantidad <= 0) {
      carrito = carrito.filter(p => p.id !== id);
    }

    mostrarCarrito();
    actualizarContador();
  };

  // =============================
  // CONTADOR
  // =============================
  function actualizarContador() {
    let totalProductos = 0;
    carrito.forEach(p => totalProductos += p.cantidad);
    contador.textContent = totalProductos;
  }

  // =============================
  // MODAL
  // =============================
  window.abrirCarrito = () => {
    modal.style.display = "flex";
    mostrarCarrito();
  };

  window.cerrarCarrito = () => {
    modal.style.display = "none";
  };

  // =============================
  // WHATSAPP
  // =============================
  window.comprarWhatsApp = () => {
    let mensaje = "🧾 *Pedido*%0A";
    let suma = 0;

    carrito.forEach(p => {
      mensaje += `• ${p.nombre} x${p.cantidad} = S/ ${p.precio * p.cantidad}%0A`;
      suma += p.precio * p.cantidad;
    });

    mensaje += `%0A*Total: S/ ${suma}*`;

    const numero = "5355030439"; // 👈 TU NÚMERO
    window.open(`https://wa.me/${numero}?text=${mensaje}`);
  };

  mostrarProductos();

});
