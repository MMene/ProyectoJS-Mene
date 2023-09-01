const lista = [
  { nombre: "Sueter", precio: 5000, stock: 10, imagen:"sueter.jpg"},
  { nombre: "Pantalon", precio: 10000, stock: 5, imagen: "pantalon.jpg"},
  { nombre: "Campera", precio: 50000, stock: 3, imagen: "campera.jpg" },
  { nombre: "Remera", precio: 2000, stock: 25, imagen: "remera.jpg" },
  { nombre: "Cadenita", precio: 1000, stock: 50, imagen: "cadenita.jpg" }
];

const carrito = [];

const productosDiv = document.getElementById("productos");
const carritoLista = document.getElementById("carrito-lista");
const precioTotalElement = document.getElementById("precio-total");
const finalizarCompraButton = document.getElementById("finalizar-compra");
const repetirCompraButton = document.getElementById("repetir-compra");
const mensajeCompra = document.getElementById("mensaje-compra");
const productosConInput = new Set(); // Usamos un Set para almacenar los productos con inputs

lista.forEach(producto => {
  const productoCard = document.createElement("div");
  productoCard.classList.add("col-lg-4", "col-md-6", "mb-4"); 
  productoCard.innerHTML = `
  <div class="card">
  <div class="card-body d-flex flex-column align-items-center">
    <h5 class="card-title">${producto.nombre}</h5>
    <img src="./assets/images/${producto.imagen}" alt="${producto.nombre}" class="card-image">
    <p class="card-text">$${producto.precio}</p>
    <p class="card-text stock-counter" data-producto="${producto.nombre}">Stock: ${producto.stock} unidades</p>
    <button class="btn btn-primary" data-producto="${producto.nombre}" data-precio="${producto.precio}">Agregar al Carrito</button>
  </div>
</div>
  `;
  productosDiv.appendChild(productoCard);
});

const agregarBotones = document.querySelectorAll("[data-producto]");
agregarBotones.forEach(button => {
  button.addEventListener("click", mostrarInputCantidad);
});

function mostrarInputCantidad(event) {
  const producto = event.target.getAttribute("data-producto");
  const precio = parseFloat(event.target.getAttribute("data-precio"));

  if (!productosConInput.has(producto)) { // Verificamos si ya se generó input
    const cantidadInput = document.createElement("input");
    cantidadInput.type = "number";
    cantidadInput.placeholder = "Ingrese la cantidad";

    const confirmarButton = document.createElement("button");
    confirmarButton.textContent = "Confirmar";

    confirmarButton.addEventListener("click", () => {
      const cantidad = parseInt(cantidadInput.value);
      if (!isNaN(cantidad) && cantidad > 0) {
        agregarAlCarrito(producto, precio, cantidad);
        cantidadInput.remove();
        confirmarButton.remove();
        productosConInput.delete(producto); // Eliminamos el producto del conjunto
      } else {
        mostrarError();
      }
    });

    const productoDiv = event.target.parentNode;
    productoDiv.appendChild(cantidadInput);
    productoDiv.appendChild(confirmarButton);

    productosConInput.add(producto); // Agregamos el producto al conjunto
  }
}


function cargarCarritoDesdeStorage() {
  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
    carrito.push(...JSON.parse(carritoGuardado));
  }
}

function agregarAlCarrito(producto, precio, cantidad) {
  const productoEncontrado = lista.find(item => item.nombre === producto);
  if (productoEncontrado.stock >= cantidad) {
    carrito.push({ producto, precio, cantidad });
    productoEncontrado.stock -= cantidad;
    actualizarCarrito();
    actualizarStockEnDOM(productoEncontrado.nombre, productoEncontrado.stock); // Actualizar el stock en el DOM
    guardarCarritoEnStorage();
  } else {
    mostrarStockNoDisponible();
  }
}

function actualizarStockEnDOM(producto, stock) {
  const stockCounter = document.querySelector(`.stock-counter[data-producto="${producto}"]`);
  if (stockCounter) {
    stockCounter.textContent = `Stock: ${stock} unidades`;
  }
}

function actualizarCarrito() {
  carritoLista.innerHTML = "";
  let precioTotal = 0;
  
  carrito.forEach(item => {
    const itemLi = document.createElement("li");
    itemLi.textContent = `${item.cantidad}x ${item.producto} - $${item.precio * item.cantidad}`;
    carritoLista.appendChild(itemLi);
    precioTotal += item.precio * item.cantidad;
  });

  precioTotalElement.textContent = `Precio total: $${precioTotal}`;
}

function guardarCarritoEnStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarMensajeCompra() {
  Swal.fire({
    icon: "success",
    title: "¡Compra realizada!",
    text: "¡Gracias por su compra!",
    timer: 3000,
    showConfirmButton: false
  });
}


function mostrarStockNoDisponible() {
  Swal.fire({
    icon: "error",
    title: "Stock no disponible",
    text: "No hay suficiente stock disponible",
    timer: 3000,
    showConfirmButton: false
  });
}

function mostrarError() {
  Swal.fire({
    icon: "warning",
    title: "Cantidad inválida",
    text: "Ingrese una cantidad válida",
    timer: 3000,
    showConfirmButton: false
  });
}

fetch("api.json")
.then(response => response.json())
.then(data => {
  const promo = data.promo
  
  const promoContainer = document.getElementById("promo-container")

  promo.forEach((x)=>{
    const promoElement = document.createElement("p")
    promoElement.textContent = `PROMO IMPERDIBLE: ${x.imperdible}, ${x.productos}, Ubicación: ${x.ubicacion}`
    promoContainer.appendChild(promoElement)
  })
})
.catch(error =>{
  console.log("exploto todo")
})


finalizarCompraButton.addEventListener("click", () => {
  guardarCarritoEnStorage();
  mostrarMensajeCompra();
  carrito.length = 0; // Vaciar el carrito en la interfaz
  actualizarCarrito();
});

repetirCompraButton.addEventListener("click", () => {
  cargarCarritoDesdeStorage();
  actualizarCarrito(true);
}); 


