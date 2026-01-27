document.addEventListener("DOMContentLoaded", () => {

  const productos = [
    {
      id: 1,
      nombre: "Ventilador",
      precio: 22000,
      imagen: "img/ventilador.jpg"
    },
    {
      id: 2,
      nombre: "Audífonos",
      precio: 18000,
      imagen: "img/audifonos.jpg"
    },
    {
      id: 3,
      nombre: "Zapatos",
      precio: 35000,
      imagen: "img/zapatos.jpg"
    }
  ];

  let carrito = [];

  const contenedor = document.getElementById("productos");
  const contador = document.getElementById("contador");

  function mostrarProductos() {
    contenedor.innerHTML = "";

    productos.forEach(producto => {
      const div = document.createElement("div");
      div.className = "producto";

      div.innerHTML = `
        <img src="${producto.imagen}">
        <h3>${producto.nombre}</h3>
        <p>S/ ${producto.precio}</p>
        <button onclick="agregarAlCarrito(${producto.id})">
          Agregar al carrito
        </button>
      `;

      contenedor.appendChild(div);
    });
  }

  window.agregarAlCarrito = function(id) {
    const producto = productos.find(p => p.id === id);
    carrito.push(producto);
    contador.textContent = carrito.length;
  };

  mostrarProductos();

});
