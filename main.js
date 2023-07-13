const tortas = 1000;
const budines = 500;
const desayunos = 2500;
let precioTotal = 0;
function calcularPrecio(producto, cantidad) {
  let precio = 0;
  switch (producto.toLowerCase()) {
    case "tortas":
      precio = tortas * cantidad;
      break;
    case "budines":
      precio = budines * cantidad;
      break;
    case "desayunos":
      precio = desayunos * cantidad;
      break;
    default:
      console.log("Producto inválido");
      break;
  }
  return precio;
}
function mostrarMensaje(mensaje) {
  console.log(mensaje);
}
function realizarPedido() {
  let productos = prompt("Por favor, ingrese el producto que desea agregar al carro: Tortas, Budines, Desayunos");
  let cantidad = parseInt(prompt("¿Cuántas unidades?"));
  while (cantidad <= 0) {
    cantidad = parseInt(prompt("Por favor, ingrese un número válido para la cantidad:"));
  }
  let precio = calcularPrecio(productos, cantidad);
  if (precio > 0) {
    precioTotal += precio;
    mostrarMensaje("El precio es: "+ precio);
  }

  let quiereMas = confirm("¿Desea agregar algo más?");
  if (quiereMas == false) {
    mostrarMensaje("Precio total de todos los productos: " + precioTotal);
  } else {
    realizarPedido();
  }
}

realizarPedido();