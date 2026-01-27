fetch("productos.csv")
  .then(response => response.text())
  .then(data => {
    const filas = data.split("\n").slice(1);
    const contenedor = document.getElementById("productos");

    contenedor.innerHTML = "";

    filas.forEach(fila => {
      if (fila.trim() === "") return;

      const columnas = fila.split(",");

      const nombre = columnas[1];
      const precio = columnas[2];
      const stock = columnas[3];
      const categoria = columnas[4];
      const imagen = columnas[5];

      const card = document.createElement("div");
      card.className = "producto";

      card.innerHTML = `
        <img src="${imagen}" alt="${nombre}">
        <h3>${nombre}</h3>
        <p>Precio: $${precio}</p>
        <p>Stock: ${stock}</p>
        <button>Comprar</button>
      `;

      contenedor.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Error cargando productos:", error);
  });
