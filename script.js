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

  const contenedor = document.getElementById("productos");

  productos.forEach(producto => {
    const div = document.createElement("div");
    div.className = "producto";

    div.innerHTML = `
      <img src="${producto.imagen}">
      <h3>${producto.nombre}</h3>
      <p>S/ ${producto.precio}</p>
      <button>Agregar</button>
    `;

    contenedor.appendChild(div);
  });

});
