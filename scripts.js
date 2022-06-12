if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", compra);
} else {
  compra();
}
//
function compra() {
  var removerItemDelCarritoBoton =
    document.getElementsByClassName("btn-danger");
  for (var i = 0; i < removerItemDelCarritoBoton.length; i++) {
    var button = removerItemDelCarritoBoton[i];
    button.addEventListener("click", removerItemDelCarrito);
  }

  var insumosCompra = document.getElementsByClassName("carrito-cantidad-input");
  for (var i = 0; i < insumosCompra.length; i++) {
    var input = insumosCompra[i];
    input.addEventListener("change", cambioDeCantidad);
  }

  var botoncomprarProducto = document.getElementsByClassName("producto-button");
  for (var i = 0; i < botoncomprarProducto.length; i++) {
    var button = botoncomprarProducto[i];
    button.addEventListener("click", agregadoAlCarrito);
  }

  document
    .getElementsByClassName("btn-purchase")[0]
    .addEventListener("click", comprarProducto);
}
// en esta funcion las usamos para darle finalizacion a la compra de todos los productos,llamando a la funcion totaldelacompra para saber cuanto fue el costo total de los productos seleccionados
function comprarProducto() {
  Swal.fire({
    title: "Gracias por tu compra.",
    width: 600,
    padding: "3em",
    color: "#716add",
    background: "#fff ",
    backdrop: `
          rgba(0,0,123,0.4)
          url("https://image.shutterstock.com/image-vector/vector-lettering-gracias-stars-handwritten-260nw-1502688671.jpg")
          left top
          no-repeat
        `,
  });

  var carritoItems = document.getElementsByClassName("carrito-items")[0];
  while (carritoItems.hasChildNodes()) {
    carritoItems.removeChild(carritoItems.firstChild);
  }
  totalDeLaCompra();
}
//con esta funcion removeremos el producto en su totalidad, se borran el producto en si sin importar la cantidad de producto seleccionado
function removerItemDelCarrito(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  let timerInterval;
  Swal.fire({
    title: "Eliminaste el producto con exito !",
    html: "I will close in <b></b> milliseconds.",
    timer: 900,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const b = Swal.getHtmlContainer().querySelector("b");
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft();
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
   
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log("I was closed by the timer");
    }
  });
  totalDeLaCompra();
}
//con esta funcion podemos por medio del input cambiar la canidad de cada producto seleccionado sin la necesidad de tener que sellecionar mas de una vez el mismo producto 
function cambioDeCantidad(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  totalDeLaCompra();
}

function agregadoAlCarrito(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement;
  var nombre = shopItem.getElementsByClassName("producto-nombre")[0].innerText;
  var costo = shopItem.getElementsByClassName("producto-costo")[0].innerText;
  var imagenSrc = shopItem.getElementsByClassName("producto-imagen")[0].src;
  agregarItemAlCarrito(nombre, costo, imagenSrc);
  totalDeLaCompra();
}

function agregarItemAlCarrito(nombre, costo, imagenSrc) {
  var carritoRow = document.createElement("div");
  carritoRow.classList.add("carrito-row");
  var carritoItems = document.getElementsByClassName("carrito-items")[0];
  var carritoItemNames = carritoItems.getElementsByClassName(
    "carrito-item-nombre"
  );
// cuando ya tenemos el producto seleccionado por medio de un if verificamos que ya este ese producto seleccionado y enviamos un alerta para que el cliente sepa que ya ha seleccionado el producto y que desde su carrito puede cambiar la cantida del producto 
  for (var i = 0; i < carritoItemNames.length; i++) {
    if (carritoItemNames[i].innerText == nombre) {
      let timerInterval;
      Swal.fire({
        title:
          "Ya agregaste este producto! si deseas agregar otro, haslo desde tu carrito",
        html: "I will close in <b></b> milliseconds.",
        timer: 1250,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const b = Swal.getHtmlContainer().querySelector("b");
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft();
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        }
      });
      return;
    }
  }
  //creamos por medio del ineerHTML una card donde apareceran todos los productos seleccionados por el cliente 
  var insumosContenido = `
        <div class="carrito-item carrito-column card-body carrito-total">
            <img class="carrito-item-imagen" src="${imagenSrc}" width="90" height="90">
            <p class="carrito-item-nombre card-tex">${nombre}</p>
        </div>
        <p class="carrito-costo carrito-column card-tex">${costo}</p>
        <div class="carrito-cantidad carrito-column">
            <input class="carrito-cantidad-input "  type="number" value="1"  >
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`;


  carritoRow.innerHTML = insumosContenido;
  carritoItems.append(carritoRow);
  carritoRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removerItemDelCarrito);
  carritoRow
    .getElementsByClassName("carrito-cantidad-input")[0]
    .addEventListener("change", cambioDeCantidad);
}

function totalDeLaCompra() {
  var carritoItemContainer =
    document.getElementsByClassName("carrito-items")[0];
  var carritoRows = carritoItemContainer.getElementsByClassName("carrito-row");
  var total = 0;
  for (var i = 0; i < carritoRows.length; i++) {
    var carritoRow = carritoRows[i];
    var costoElement = carritoRow.getElementsByClassName("carrito-costo")[0];
    var quantityElement = carritoRow.getElementsByClassName(
      "carrito-cantidad-input"
    )[0];
    var costo = parseFloat(costoElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + costo * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("carrito-total-costo")[0].innerText =
    "$" + total;
}

