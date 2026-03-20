const buttons = document.querySelectorAll(".tab-btn");
const vistas = document.querySelectorAll(".vista");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // Quitar active de todos los botones
    buttons.forEach((btn) => btn.classList.remove("active"));
    // Quitar active de todas las vistas
    vistas.forEach((vista) => vista.classList.add("no-visible"));

    // // Activar el botón clicado
    button.classList.add("active");
    if (button.textContent == "Cuentas") {
        document.getElementById("Carrito").classList.remove("no-visible");
        document.getElementById("Productos").classList.remove("no-visible");
    } else if (button.textContent == "Historial") {
        document.getElementById("Historial").classList.remove("no-visible");
    }
    console.log(document.getElementById("Carrito"))
    // Mostrar la vista correspondiente
    const targetId = button.getAttribute("data-target");
    const targetVista = document.getElementById(`vista-${targetId}`);
    if (targetVista) {
      targetVista.classList.add("active");
    }
  });
});
