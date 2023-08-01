const Producto = function(nombre, precio, stock) {
  this.nombre = nombre;
  this.precio = precio;
  this.stock = stock;
}

let producto1 = new Producto("sueter", 5000, 10);
let producto2 = new Producto("pantalon", 10000, 5);
let producto3 = new Producto("campera", 50000, 3);
let producto4 = new Producto("remera", 2000, 25);
let producto5 = new Producto("cadenita", 1000, 50);

let lista = [producto1, producto2, producto3, producto4, producto5];

function buscarProducto() {
  let palabraClave = prompt("Ingrese el producto que desea buscar");
  let resultado = lista.filter((producto) => producto.nombre.includes(palabraClave));

  if (resultado.length > 0) {
    console.table(resultado);
    return true;
  } else {
    alert("No se encontro ninguna coincidencia con: " + palabraClave);
    return false;
  }
}

function calcularPrecio(producto, cantidad) {
  let productoEncontrado = lista.find((p) => p.nombre.toLowerCase() === producto.toLowerCase());

  if (productoEncontrado) {
    return productoEncontrado.precio * cantidad;
  } else {
    console.log("Producto inválido");
    return 0;
  }
}

function mostrarMensaje(mensaje) {
  console.log(mensaje);
}

function realizarPedido() {
  let productos = prompt("Por favor, ingrese el producto que desea agregar al carro: Sueter, Pantalon, Campera, Remera, Cadenita");
  let cantidad = parseInt(prompt("¿Cuántas unidades?"));
  while (cantidad <= 0) {
    cantidad = parseInt(prompt("Por favor, ingrese un número válido para la cantidad:"));
  }
  let precio = calcularPrecio(productos, cantidad);
  if (precio > 0) {
    precioTotal += precio;
    mostrarMensaje("El precio es: " + precio);
  }

  let quiereMas = confirm("¿Desea agregar algo más?");
  if (quiereMas === true) {
    realizarPedido();
  } else {
    mostrarMensaje("El precio total de todos los productos es: " + precioTotal);
  }
}

let precioTotal = 0;

if (buscarProducto()) {
  realizarPedido();
}
