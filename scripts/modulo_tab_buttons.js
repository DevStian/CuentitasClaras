const buttons = document.querySelectorAll(".btn-less");
const vistas = document.querySelectorAll(".vista");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // Quitar active de todos los botones
    buttons.forEach((btn) => btn.classList.remove("selected"));
    // Quitar active de todas las vistas
    vistas.forEach((vista) => vista.classList.add("non-visible"));

    // // Activar el botón clicado
    button.classList.add("selected");
    if (button.textContent == "Carrito") {
      agregarElementoALista();
      document.getElementById("Carrito").classList.remove("non-visible");
      document
        .getElementById("Lista-Productos")
        .classList.remove("non-visible");
    } else if (button.textContent == "Historial") {
      cargarHistorial();
      document.getElementById("Historial").classList.remove("non-visible");
    } else if (button.textContent == "Inicio") {
      document.getElementById("Inicio").classList.remove("non-visible");
    }

    // Mostrar la vista correspondiente
    const targetId = button.getAttribute("data-target");
    const targetVista = document.getElementById(`vista-${targetId}`);
    if (targetVista) {
      targetVista.classList.add("active");
    }
  });
});
