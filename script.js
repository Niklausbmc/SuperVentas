let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let productos = [];
let filtro = "Todos";

fetch("productos.csv")
.then(res => res.text())
.then(data => {
    let filas = data.split("\n");
    filas.shift();

    filas.forEach(fila => {
        let c = fila.split(",");
        if (c.length > 1) {
            productos.push({
                id: c[0],
                nombre: c[1],
                precio: Number(c[2]),
                stock: Number(c[3]),
                categoria: c[4],
                imagen: c[5]
            });
        }
    });

    mostrarProductos();
    actualizarCarrito();
});

function mostrarProductos() {
    let cont = document.getElementById("productos");
    cont.innerHTML = "";

    let texto = document.getElementById("buscador").value.toLowerCase();

    productos.forEach(p => {

        if (
            (filtro === "Todos" || p.categoria === filtro) &&
            p.nombre.toLowerCase().includes(texto)
        ) {
            cont.innerHTML += `
            <div class="card">
                <img src="${p.imagen}">
                <h4>${p.nombre}</h4>
                <p>$${p.precio}</p>
                <p>Stock: ${p.stock}</p>
                <button onclick="agregar(${p.id})" ${p.stock==0?"disabled":""}>
                    Agregar al carrito
                </button>
            </div>`;
        }
    });
}

function filtrar(cat) {
    filtro = cat;
    mostrarProductos();
}

document.getElementById("buscador").addEventListener("keyup", mostrarProductos);

function agregar(id) {
    let p = productos.find(x => x.id == id);
    if (p.stock > 0) {
        carrito.push(p);
        p.stock--;
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCarrito();
        mostrarProductos();
    }
}

function actualizarCarrito() {
    let lista = document.getElementById("lista");
    lista.innerHTML = "";
    let total = 0;

    carrito.forEach(p => {
        lista.innerHTML += `<p>${p.nombre} - $${p.precio}</p>`;
        total += p.precio;
    });

    document.getElementById("total").innerText = total;
    document.getElementById("cantidad").innerText = carrito.length;
}

document.getElementById("carritoBtn").onclick = () => {
    document.getElementById("carrito").style.right = "0";
};

function cerrarCarrito() {
    document.getElementById("carrito").style.right = "-400px";
}
function finalizarCompra() {
    if (carrito.length == 0) {
        alert("El carrito está vacío");
        return;
    }

    let fecha = new Date().toLocaleString();
    let csv = "Fecha,Producto,Precio\n";

    carrito.forEach(p => {
        csv += `${fecha},${p.nombre},${p.precio}\n`;
    });

    let blob = new Blob([csv], { type: "text/csv" });
    let url = URL.createObjectURL(blob);

    let a = document.createElement("a");
    a.href = url;
    a.download = "ventas.csv";
    a.click();

    carrito = [];
    localStorage.removeItem("carrito");
    actualizarCarrito();
    cerrarCarrito();

    alert("Compra registrada correctamente");
}