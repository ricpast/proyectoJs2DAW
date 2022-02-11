/*
    Función de bibloteca:
        - Tiene como funcíon pintar todos los
        elementos de la página principal (index).
*/

// Variables globales.
var d = document; // Acceso rapido.

// Baner donde se muestra la descripción e imagen de la empresa.
export const pintarBannerPrincipal = () => {
    return `
        <section class="hero-banner bg-light py-5">
            <div class="container">
            <img id="logotipo-banner" src="../../img/fotosWeb/logotipos/logotipo.PNG" alt="logotipo principal">
                <div class="row row align-items-center">
                    <div class="col-lg-12">
                        <h4 class="display-4">¿Qué puedes esperar de storeBit?</h4>
                        <p class="lead text-secondary my-5">Llevamos más de 15 años a tu lado, construyendo y adaptándonos a lo que necesitas a medida que hemos ido avanzando.</p>
                        <p class="lead text-secondary my-5">El objetivo de la empresa no es sólo el de vender productos informáticos, sino ofrecer un servicio integrado a los posibles clientes independientemente de su situación como particular, PYMES e incluso organismos estatales.</p>
                        <a id="btnIdxCargarProductos" href="#" class="btn btn-outline-secondary btn-lg border">Ver productos</a>
                    </div>
                </div>
            </div>
        </section>
    `;
}

// Baner donde se muestra un carrousel con los distintos tipos de productos que se venden.
export const pintarBannerCategorias = () => {
    return `
    <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
        <h1 class="display-2">Categorías principales</h1>
        <div class="carousel-inner">
            <div class="carousel-item active" data-bs-interval="4000">
                <img src="../../img/fotosProductos/moviles/1/1.webp" class="d-block w-30" alt="Categoria moviles">
                <div class="carousel-caption d-none d-md-block">
                    <div class="info-item-carousel">
                        <h5>Movíles</h5>
                        <p>Móviles y smartphone libre de las mejores marcas y precios excepcionales.</p>
                    </div>
                </div>
            </div>
            <div class="carousel-item" data-bs-interval="4000">
                <img src="../../img/fotosProductos/sobremesa/1/1.webp" class="d-block w-30" alt="Categoria sobremesa">
                <div class="carousel-caption d-none d-md-block">
                    <div class="info-item-carousel">
                        <h5>Sobremesa</h5>
                        <p> Una selección con los <strong>mejores ordenadores de sobremesa</strong> que puedes encontrar en el mercado..</p>
                    </div>
                </div>
            </div>
            <div class="carousel-item" data-bs-interval="4000">
                <img src="../../img/fotosProductos/portatiles/1/1.webp" class="d-block w-30" alt="Categoria portatiles">
                <div class="carousel-caption d-none d-md-block">
                    <div class="info-item-carousel">
                        <h5>Portátiles</h5>
                        <p>En storeBit te ofrecemos <strong>el mayor catálogo de ordenadores portátiles</strong>.</p>
                    </div>
                </div>
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
  </div>
`;
}