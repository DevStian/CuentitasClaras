const current_carrito = [];

const actualizarTotalCarrito = () => {
  const totalSpan = document.getElementById("TotalCarrito");
  if (!totalSpan) return;

  const subtotales = document.querySelectorAll(".subtotal-valor");
  let total = 0;

  subtotales.forEach((subtotal) => {
    const valor = parseFloat(subtotal.textContent.replace("$", ""));
    if (!isNaN(valor)) total += valor;
  });

  totalSpan.textContent = `$${total.toFixed(2)}`;
};

// Función para limpiar la tabla
const limpiarTabla = () => {
  const carritoBody = document.getElementById("carrito-body");
  if (carritoBody) {
    carritoBody.innerHTML = "";
  }

  // Limpiar current_carrito
  for (let key in current_carrito) {
    delete current_carrito[key];
  }
  current_carrito.length = 0;

  // Actualizar total a 0
  actualizarTotalCarrito();
  console.log("🧹 Carrito limpiado");
};

// AL crear dicha linea del carrito tambien debe cearla en el current_carrito.
const crearLineaCarrito = (producto, index) => {
  const cantidad = 1;
  const subtotal = producto.precio * cantidad;

  const fila = document.createElement("tr");
  fila.setAttribute("data-id", index);

  // Agregar evento click a toda la fila
  fila.onclick = () => decrementarCantidad(index);

  fila.innerHTML = `
                            <td class="producto-nombre">${producto.nombre}</td>
                            <td class="producto-precio">$${producto.precio.toFixed(2)}</td>
                            <td class="producto-cantidad">
                                <span class="cantidad-valor">${cantidad}</span>
                            </td>
                            <td class="subtotal-valor">$${subtotal.toFixed(2)}</td>
                         `;

  // Se agrega el item al current carrito.
  current_carrito.push({
    nombre: producto.nombre,
    precio: producto.precio,
    cantidad: 1,
  });

  return fila;
};

const encontrar = (nombre) => {
  let valor = current_carrito.findIndex((p) => p.nombre === nombre);
  console.log("EL producto " + nombre + "esta en " + valor);
  return valor;
};

// Función para actualizar una línea existente
const actualizarLineaCarrito = (fila, producto, aumento) => {
  const cantidadSpan = fila.querySelector(".cantidad-valor");
  let cantidad = parseInt(cantidadSpan.textContent);

  cantidad = cantidad + aumento;

  // Si la cantidad llega a 0, eliminar la fila
  let posicion = encontrar(producto.nombre);

  if (cantidad <= 0) {
    fila.remove();
    current_carrito.splice(posicion, 1);
  } else {
    current_carrito[posicion].cantidad = cantidad;
    cantidadSpan.textContent = cantidad;
    const subtotal = producto.precio * cantidad;
    fila.querySelector(".subtotal-valor").textContent =
      `$${subtotal.toFixed(2)}`;
  }

  // Actualizar total después de modificar la línea
  actualizarTotalCarrito();
};

// Función para decrementar cantidad (click en la línea)
const decrementarCantidad = (index) => {
  const carritoBody = document.getElementById("carrito-body");
  if (!carritoBody) return;

  const lineaCarrito = carritoBody.querySelector(`[data-id="${index}"]`);

  if (lineaCarrito) {
    actualizarLineaCarrito(lineaCarrito, productos[index], -1);
  }
};

// Función para agregar al carrito
const agregarAlCarrito = (index) => {
  const carritoBody = document.getElementById("carrito-body");
  if (!carritoBody) return;

  const lineaCarrito = carritoBody.querySelector(`[data-id="${index}"]`);

  if (!lineaCarrito) {
    const itemElement = crearLineaCarrito(productos[index], index);
    carritoBody.appendChild(itemElement);
  } else {
    actualizarLineaCarrito(lineaCarrito, productos[index], 1);
  }

  // Actualizar total después de agregar
  actualizarTotalCarrito();
};

const guardarCarrito = () => {
  if (current_carrito.length === 0) return;

  const venta = {
    id: Date.now(),
    fecha: new Date().toLocaleString("es-AR"),
    items: [...current_carrito], // copia para evitar referencias
    total: document.getElementById("TotalCarrito").textContent,
  };

  const historial = JSON.parse(localStorage.getItem("ventas") || "[]");
  historial.push(venta);
  localStorage.setItem("ventas", JSON.stringify(historial));

  limpiarTabla();
};
