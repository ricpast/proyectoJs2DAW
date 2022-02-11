"use strict";

/*
    Función de bibloteca:
        - Tiene como funcíon pintar todos los
        elementos de los productos.
*/

var d = document;

// Pinta el contenedor con los productos disponibles, recibe los productos en formato json.
export const pintarCajaProductos = (docProductos, titulo) => {
    let secProductos = d.createElement("section")
    secProductos.setAttribute("id", "secProductos");
    secProductos.innerHTML = `<h1 class="display-3">Productos</h1>`;
    let cajaProductos = d.createElement("div")
    cajaProductos.setAttribute("id", "cajaProductos");

    docProductos.docs.map((producto) => {

        cajaProductos.innerHTML += `
        <div class="card card-product" style="width: 18rem; max-height: 33rem;">
            <img src="${producto.data().imgPrincipal}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${producto.data().nombre}</h5>
                <p class="card-text"></p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">${producto.data().precio}€</li>
            </ul>
            <div class="card-body">
                <button type="button" class="btn btn-outline-primary btn-card-product" name="${producto.id}">Ver detalles</button>           
            </div>
        </div>
        `;
    });

    secProductos.appendChild(cajaProductos);

    return secProductos;
}

// Pinta una ficha con los datos del producto. Recibe el producto en formato json.
export const pintarFichaProducto = (producto) => {
    console.log(producto.data());
    let fichaProducto = d.createElement("div")
    fichaProducto.setAttribute("id", "fichaProducto");
    fichaProducto.innerHTML = `
    <div class="card mb-3">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${producto.data().imgPrincipal}" class="img-fluid rounded-start" alt="Imagen del producto">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                <h3 class="card-title">${producto.data().nombre}</h3>
                <h4 class="card-title">${producto.data().precio}€</h4>
                <p class="card-text"><strong>Marca:</strong> <small class="text-muted">${producto.data().marca}</small></p>
                <p class="card-text"><strong>Stock:</strong> <small class="text-muted">${producto.data().stock}</small></p>
                <p class="card-text"><strong>Cantidad:</strong> <input id="iptCantidad" type="number" min="1" value="1"></p>
                <button id="btnCarrito" class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" name="${producto.id}">
                <i class="fas fa-shopping-basket"></i> Añadir al carrito</button>
                <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                    <div class="offcanvas-header">
                        <h5 id="offcanvasRightLabel">Carrito</h5>
                        <button name="${producto.id} type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div id="ctnCarrito" class="offcanvas-body">
                        No hay productos en el carrito.
                    </div>
                    <div id="ctnCarritoTotales" class="offcanvas-body">
                    </div>
                    <button id="btnRealizarPedido" name="${producto.id}  type="button" class="btn btn-success">Realizar Pedido</button>
                </div>
                <button id="btnComprar" type="button" class="btn btn-success" name="${producto.id}">Comprar</button>
                <img id="logotipo-ficha-producto" src="../../img/fotosWeb/logotipos/logotipo.PNG">
                <div id="ctnInfo"></div>
            </div>
        </div>
    </div>
    <div class="accordion" id="accordionPanelsStayOpenExample">
        <div class="accordion-item">
            <h2 class="accordion-header" id="panelsStayOpen-headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                Especificaciones:
            </button>
            </h2>
            <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                <div class="accordion-body">
                    <p class="card-text"><small class="text-muted">${producto.data().descripcion}</small></p>
                    <p class="card-text">${producto.data().infoHTML}</p>
                </div>
            </div>
        </div>
    </div>
    `;

    return fichaProducto;
}

// Pinta los productos en el carrito.
export const pintarProductosCarrito = (producto) => {
    return `
    <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                <img src="${producto.imgPrincipal}" class="img-fluid rounded-start" alt="Imagen del producto">
            </div>
            <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text"><small class="text-muted">Unidades ${producto.cantidad}</small></p>
                <p class="card-text">${producto.precio}€</p>
            </div>
            </div>
        </div>
    </div>
    `
}

// Pinta los totales del carrito en el carrito. Recibe precio total y cantidad total.
export const pintarTotalesCarrito = (precioTotal, cantidadTotal) => {
    return `
        <div>
            <small class="text-muted">
                Unidades
            </small>
        </div>
        <div>
            <small class="text-muted">
                ${cantidadTotal}
            </small>
        </div>
        <div>
            <strong>
                TOTAL
            </strong>
        </div>
        <div>
            <strong>
                ${precioTotal}€
            </strong>
        </div>
    `;
}