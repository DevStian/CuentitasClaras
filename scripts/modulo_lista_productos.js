// Array de productos disponibl

let productos = [];

const cargarProductos = async () => {
  try {
    const response = await fetch("data/productos.json");
    const productos = await response.json();
    return productos;
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
};

const crearElementoDeLista = (prod, index) => {
  const div = document.createElement("div");
  div.classList.add("producto-item");

  const nameProduct = document.createElement("h4");
  nameProduct.textContent = prod.nombre;

  const button = document.createElement("button");
  button.classList.add("btn", "btn-success");
  button.textContent = `$${prod.precio.toFixed(2)}`;

  // Agregar onclick que llama a agregarAlCarrito con el índice
  button.onclick = (e) => {
    e.stopPropagation(); // Evitar que el evento burbujee
    agregarAlCarrito(index);
  };

  div.appendChild(nameProduct);
  div.appendChild(button);

  return div;
};

const agregarElementoALista = () => {
  const seccionProductos = document.getElementById("Lista-Productos");

  if (!seccionProductos) {
    console.error("No se encontró la sección con id 'Lista-Productos'");
    return;
  }

  const mainContainer = seccionProductos.querySelector("main");

  if (!mainContainer) {
    console.error("No se encontró el elemento <main> dentro de la sección");
    return;
  }

  // Agregar los productos al MAIN, pasando el índice
  productos.forEach((prod, index) => {
    mainContainer.appendChild(crearElementoDeLista(prod, index));
  });
};
