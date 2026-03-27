// Array de productos disponibles
const productos = [
  { nombre: "Coca Cola", precio: 190 },
  { nombre: "Coca Zero", precio: 190 },
  { nombre: "Sprite", precio: 190 },
  { nombre: "Monster Energy", precio: 260 },
  { nombre: "Agua", precio: 170 },
  { nombre: "Nescafe", precio: 170 },
  { nombre: "Burger Simple", precio: 260 },
  { nombre: "Burger Completa", precio: 320 },
  { nombre: "Pancho", precio: 160 },
  { nombre: "Scones", precio: 210 },
  { nombre: "Bon o Bon x3", precio: 70 },
  { nombre: "Cofler", precio: 190 },
  { nombre: "Mogul pie", precio: 130 },
  { nombre: "Chicle", precio: 60 },
  { nombre: "Menthoplus", precio: 60 },
  { nombre: "Turron", precio: 50 },
  { nombre: "Alfajor Triple", precio: 100 },
  { nombre: "Alfajor Simple", precio: 60 },
  { nombre: "Porteñitas", precio: 140 },
  { nombre: "Opera", precio: 140 },
  { nombre: "Rellena", precio: 140 },
  { nombre: "Papas", precio: 160 },
  { nombre: "Kesitas", precio: 160 },
  { nombre: "Saladix", precio: 160 },
  { nombre: "Pop", precio: 160 },
  { nombre: "Pizza", precio: 900 },
  { nombre: "Campeon Gourmet", precio: 2500 },
  { nombre: "Picada Carbonara", precio: 2300 },
  { nombre: "Sweet Time", precio: 1000 },
  { nombre: "Cervezas 0.0%", precio: 200 },
  { nombre: "Tubo Mogul", precio: 60 },
  { nombre: "Waffle", precio: 160 },
  { nombre: "Papas", precio: 160 },
  { nombre: "Papas tubo", precio: 300 },
];


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
