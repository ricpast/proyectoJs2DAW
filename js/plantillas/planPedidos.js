/*
    Función de bibloteca:
        - Tiene como funcíon pintar todos los
        elementos de la página de pedidos.
*/


// Variables globales.
var d = document; // Acceso rapido.

// Pinta los productos del pedido.
export const pintarProductoEnCtnPedido = (productos) => {
    let html = "";
    productos.map((producto) => {
        html +=  `
        <div class="card mb-3" style="max-width: 540px;">
            <h5 class="card-title">Ref: ${producto.id}</h5>
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
        `;
    });

    return html;
}

// Pinta el contenedor del pedido, recibe el pedido por parámetro.
export const pintarPedidos = (pedido, contador) => {
        console.log(pedido);
        let ctnPedidos = d.createElement("div")
        ctnPedidos.setAttribute("id", "ctnPedidos");
        ctnPedidos.innerHTML = `
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-12">
                    <div class="card-body">
                    <h3 class="card-title">Pedido Nº: ${contador}</h3>
                </div>
            </div>
        </div>
        <div class="accordion accordion-flush" id="accordionFlushExample">
            <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingOne${contador}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne${contador}" aria-expanded="false" aria-controls="#flush-collapseOne${contador}">
                    Datos de facturación:
                </button>
                </h2>
                <div id="flush-collapseOne${contador}" class="accordion-collapse collapse" aria-labelledby="flush-headingOne${contador}" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p class="card-text"><strong>Nombre:</strong> ${pedido.apellidos}</p>
                        <p class="card-text"><strong>Apellidos:</strong> ${pedido.codPostal}</p>
                        <p class="card-text"><strong>Direccion:</strong> ${pedido.direccion}</p>
                        <p class="card-text"><strong>DNI:</strong> ${pedido.dni}</p>
                        <p class="card-text"><strong>Movil:</strong> ${pedido.movil}</p>
                        <p class="card-text"><strong>Pais:</strong> ${pedido.pais}</p>
                        <p class="card-text"><strong>Población:</strong> ${pedido.poblacion}</p>
                        <p class="card-text"><strong>Provincia:</strong> ${pedido.provincia}</p>
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingTwo${contador}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo${contador}" aria-expanded="false" aria-controls="flush-collapseTwo${contador}">
                    Productos:
                </button>
                </h2>
                <div id="flush-collapseTwo${contador}" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo${contador}" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        ${pintarProductoEnCtnPedido(pedido.productos)}
                    </div>
                </div>
            </div>
        </div>`
        ;

        return ctnPedidos;
}