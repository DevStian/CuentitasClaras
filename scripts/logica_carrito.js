// Carrito de compras (array de objetos)
let carrito = [];

// Función para crear una línea de tabla (fila)
const crearLineaTabla = (producto, cantidad = 1) => {
  const precio = producto.precio;
  const subtotal = precio * cantidad;

  return `
          <tr data-producto="${producto.producto}" onclick="cambiarCantidad('${producto.producto}', -1)">
            <td>
              ${producto.producto} 
            </td>
            <td>
              <span class="cantidad">${cantidad}</span>
            </td>
            <td>$${precio.toFixed(2)}</td>
            <td>$${subtotal.toFixed(2)}</td>
          </tr>
        `;
};

// Función para actualizar toda la tabla del carrito
const actualizarTabla = () => {
  const tbody = document.getElementById("carrito-body");
  let total = 0;

  if (carrito.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="5" style="text-align: center;">El carrito está vacío</td></tr>';
  } else {
    let filas = "";
    carrito.forEach((item) => {
      filas += crearLineaTabla(
        { producto: item.producto, precio: item.precio },
        item.cantidad,
      );
      total += item.precio * item.cantidad;
    });
    tbody.innerHTML = filas;
  }

  // Actualizar el total
  document.getElementById("Total").textContent = `$${total.toFixed(2)}`;
};

// Función para agregar un producto al carrito
const agregarAlCarrito = (producto) => {
  const existente = carrito.find((item) => item.producto === producto.producto);

  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({
      producto: producto.producto,
      precio: producto.precio,
      cantidad: 1,
    });
  }

  actualizarTabla();
};

// Función para cambiar la cantidad de un producto
const cambiarCantidad = (nombreProducto, cambio) => {
  const item = carrito.find((item) => item.producto === nombreProducto);

  if (item) {
    item.cantidad += cambio;

    if (item.cantidad <= 0) {
      // Eliminar si la cantidad es 0 o negativa
      carrito = carrito.filter((item) => item.producto !== nombreProducto);
    }

    actualizarTabla();
  }
};

// Función para eliminar un producto del carrito
const eliminarProducto = (nombreProducto) => {
  carrito = carrito.filter((item) => item.producto !== nombreProducto);
  actualizarTabla();
};

// Función para limpiar todo el carrito
const limpiarCarrito = () => {
  carrito = [];
  actualizarTabla();
};

// Función para cargar los productos en la sección Productos
const cargarProductos = () => {
  const contenedor = document.getElementById("productos-lista");

  productos.forEach((prod) => {
    const div = document.createElement("div");
    div.className = "producto-item";

    div.innerHTML = `
            <h4>${prod.producto}</h4>
            <button class="btn btn-success" onclick="agregarAlCarrito(${JSON.stringify(prod).replace(/"/g, "&quot;")})">
              $${prod.precio.toFixed(2)}
            </button>
          `;

    contenedor.appendChild(div);
  });
};

// Inicializar la página
document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();
  actualizarTabla();
});
