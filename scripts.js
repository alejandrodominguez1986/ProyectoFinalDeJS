if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', compra)
} else {
    compra()
}

function compra() {
    var removerItemDelCarritoBoton = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removerItemDelCarritoBoton.length; i++) {
        var button = removerItemDelCarritoBoton[i]
        button.addEventListener('click', removerItemDelCarrito)
    }

    var insumosCompra = document.getElementsByClassName('carrito-cantidad-input')
    for (var i = 0; i < insumosCompra.length; i++) {
        var input = insumosCompra[i]
        input.addEventListener('change', cambioDeCantidad)
    }

    var botoncomprarProducto = document.getElementsByClassName('producto-button')
    for (var i = 0; i < botoncomprarProducto.length; i++) {
        var button = botoncomprarProducto[i]
        button.addEventListener('click', agregadoAlCarrito)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', comprarProducto)
}

function comprarProducto() {
    alert('Thank you for your purchase')
    var carritoItems = document.getElementsByClassName('carrito-items')[0]
    while (carritoItems.hasChildNodes()) {
        carritoItems.removeChild(carritoItems.firstChild)
    }
    totalDeLaCompra()
}

function removerItemDelCarrito(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    totalDeLaCompra()
}

function cambioDeCantidad(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    totalDeLaCompra()
}

function agregadoAlCarrito(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var nombre = shopItem.getElementsByClassName('producto-nombre')[0].innerText
    var costo = shopItem.getElementsByClassName('producto-costo')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('producto-image')[0].src
    agregarItemAlCarrito(nombre, costo, imageSrc)
    totalDeLaCompra()
}

function agregarItemAlCarrito(nombre, costo, imageSrc) {
    var carritoRow = document.createElement('div')
    carritoRow.classList.add('carrito-row')
    var carritoItems = document.getElementsByClassName('carrito-items')[0]
    var carritoItemNames = carritoItems.getElementsByClassName('carrito-item-nombre')
    for (var i = 0; i < carritoItemNames.length; i++) {
        if (carritoItemNames[i].innerText == nombre) {
            alert(Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ya agregaste este producto!',
              })
               )
            return
        }
    }
    var insumosContenido = `
        <div class="carrito-item carrito-column">
            <img class="carrito-item-image" src="${imageSrc}" width="100" height="100">
            <p class="carrito-item-nombre">${nombre}</p>
        </div>
        <p class="carrito-costo carrito-column">${costo}</p>
        <div class="carrito-cantidad carrito-column">
            <input class="carrito-cantidad-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    carritoRow.innerHTML = insumosContenido
    carritoItems.append(carritoRow)
    carritoRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removerItemDelCarrito)
    carritoRow.getElementsByClassName('carrito-cantidad-input')[0].addEventListener('change', cambioDeCantidad)
}

function totalDeLaCompra() {
    var carritoItemContainer = document.getElementsByClassName('carrito-items')[0]
    var carritoRows = carritoItemContainer.getElementsByClassName('carrito-row')
    var total = 0
    for (var i = 0; i < carritoRows.length; i++) {
        var carritoRow = carritoRows[i]
        var costoElement = carritoRow.getElementsByClassName('carrito-costo')[0]
        var quantityElement = carritoRow.getElementsByClassName('carrito-cantidad-input')[0]
        var costo = parseFloat(costoElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (costo * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('carrito-total-costo')[0].innerText = '$' + total
}