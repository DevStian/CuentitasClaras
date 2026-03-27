const cargarHistorial = () => {
  const historial = JSON.parse(localStorage.getItem("ventas") || "[]");
  const section = document.getElementById("Historial");
  const contenedor = section.querySelector("main");
  contenedor.innerHTML = "";

  if (historial.length === 0) {
    contenedor.innerHTML =
      '<p class="historial-vacio" style="text-align: center; margin: 50px auto;" >Sin ventas registradas todavía.</p>';
    return;
  }

  // Mostrar las ventas de la más reciente a la más antigua
  [...historial].reverse().forEach((venta) => {
    const card = document.createElement("div");
    card.className = "venta-card";

    // Generar el texto de los productos (ej: "Manzana x2 · Banana x1")
    const itemsTexto = venta.items
      .map((item) => `${item.nombre} x${item.cantidad}`)
      .join(" · ");

    // Construir el contenido de la tarjeta
    card.innerHTML = `
      <div class="venta-fecha">🕐 ${venta.fecha}</div>
      <button class="btn-little btn-warning" onclick="borrarVenta(${venta.id})">Borrar Venta</button>
      <div class="venta-items">${itemsTexto}</div>
      <div class="venta-total">Total: ${venta.total}</div>
    `;

    contenedor.appendChild(card);
  });
};

function borrarVenta(id) {
  let historial = JSON.parse(localStorage.getItem("ventas") || "[]");
  historial = historial.filter((v) => v.id !== id);
  localStorage.setItem("ventas", JSON.stringify(historial));
  cargarHistorial();
}

function limpiarTODO() {
  localStorage.clear();
  limpiarTabla();
  cargarHistorial();
}
