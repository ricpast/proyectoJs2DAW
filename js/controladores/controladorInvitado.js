"use strict";

/*
    Funciónes de la biblioteca:

    - La biblioteca tiene como función de manejar tanto las plantillas (estilos) como los
      eventos de las distintas páginas de la web.
    - La biblioteca depende de las distintas plantillas para cargar los estilos de la web.
    - La biblioteca depende de eventos para cargar y dar interacción a la web.
*/

/* *** Bibliotecas *** */
// Eventos.
import * as evProductos from "../eventos/evProductos.js"; // -> Conexión a bd de productos.
import * as evBtnNav from "../eventos/evBotonesNav.js"; // -> Eventos de la barra de navegación.
import * as evBtnForm from "../eventos/evBotonesForm.js"; // -> Eventos de formulario.
import * as evBtnIndex from "../eventos/evBotonesIndex.js"; // -> Eventos de index.

// Plantillas.
import * as planCabecera from "../plantillas/planCabeceras.js"; // -> Estilos de cabeceras.
import * as planPagPrincipal from "../plantillas/planPagPrincipal.js"; // -> Estilos de cabeceras.
import * as planProductos from "../plantillas/planProductos.js"; // -> Estilos sobre productos.
import * as planFormularios from "../plantillas/planFormularios.js"; // -> Estilos sobre formularios.
import * as planUsuario from "../plantillas/planUsuario.js"; // -> Estilos destinados a usuarios.

// BD.
import * as bdProductos from "../bd/bdProductos.js"; // -> Conexión a bd de productos.

// Variables globales.
var d = document; // Acceso rapido.

// Carga los estilos de la página principal.
export const cargarEstilosIndex = () => {
    // Pintamos la barra de navegación.
    d.getElementById("cabecera").innerHTML = planCabecera.barraNavPrincipal();

    // Pintamos el banner de la página principal.
    d.getElementById("cabecera").innerHTML += planPagPrincipal.pintarBannerPrincipal();

    // Cargamos los eventos de la barra de navegación (home, productos, categorías, etc...).
    evBtnNav.cargarIndex(); // Listar todos los productos.
    evBtnNav.cargarProductos(); // Listar todos los productos.
    evBtnNav.cargarLogin(); // Cargar login.

    // Pintamos el banner de categorías de productos.
    d.getElementById("contenido").innerHTML = planPagPrincipal.pintarBannerCategorias();

    // Cargamos los eventos de los botones de la página.
    evBtnIndex.cargarProductos();
}

// Carga los estilos y los eventos de la página de productos.
export const cargarEstilosProductos = async ()  => {
    // Pintamos la barra de navegación.
    d.getElementById("cabecera").innerHTML = planCabecera.barraNavPrincipal();

    // Cargamos los eventos de la barra de navegación (home, productos, categorías, etc...).
    evBtnNav.cargarIndex(); // Listar todos los productos.
    evBtnNav.cargarProductos(); // Listar todos los productos.
    evBtnNav.cargarLogin(); // Cargar login.

    // Obtenemos la referencia de los productos.
    let docProductos = await bdProductos.obtenerRefDocs();

    // Pintamos la caja de productos.
    d.getElementById("contenido").textContent = "";
    d.getElementById("contenido").appendChild(planProductos.pintarCajaProductos(docProductos));
    
    // Añadimos el evento click al botón "ver detalles" de la tarjeta del producto.
    evProductos.cargarFichaProducto();
}

// Carga los estilos y eventos de la página de ficha de productos.
export const cargarFichaProducto = async (idProducto)  => {
    // Pintamos la barra de navegación.
    d.getElementById("cabecera").innerHTML = planCabecera.barraNavPrincipal();

    // Cargamos los eventos de la barra de navegación (home, productos, categorías, etc...).
    evBtnNav.cargarIndex(); // Listar todos los productos.
    evBtnNav.cargarProductos(); // Listar todos los productos.
    evBtnNav.cargarLogin(); // Cargar login.

    // Obtenemos la referencia del producto.
    let docProducto = await bdProductos.obtenerRefDoc(idProducto);

    // Pintamos la ficha del producto.
    d.getElementById("contenido").textContent = "";
    d.getElementById("contenido").appendChild(planProductos.pintarFichaProducto(docProducto));

    // Cargamos los eventos de la ficha del producto.
    evProductos.anadirProductoAlCarrito(); // Añadir producto al carrito.
    evProductos.comprar(); // Comprar producto.
    evProductos.realizarPedidoCarrito(); // Realizar pedido.
}

export const cargarEstilosLogIn = async () => {
    // Pintamos la barra de navegación.
    d.getElementById("cabecera").innerHTML = planCabecera.barraNavPrincipal();

    // Cargamos los eventos de la barra de navegación (home, productos, categorías, etc...).
    evBtnNav.cargarIndex(); // Cargar index.
    evBtnNav.cargarProductos(); // Listar todos los productos.
    evBtnNav.cargarLogin(); // Cargar login.

    // Pintamos el contenedor del formulario logín.
    d.getElementById("contenido").textContent = "";
    d.getElementById("contenido").appendChild(planFormularios.pintarFormLogin());

    // Cargamos los eventos del formulario.
    evBtnForm.cargarFormRegistro();
    evBtnForm.submitFormLogin(); // -> Login.
}

export const cargarEstilosRegistro = async () => {
    // Pintamos la barra de navegación.
    d.getElementById("cabecera").innerHTML = planCabecera.barraNavPrincipal();

    // Cargamos los eventos de la barra de navegación (home, productos, categorías, etc...).
    evBtnNav.cargarIndex(); // Cargar index.
    evBtnNav.cargarProductos(); // Listar todos los productos.
    evBtnNav.cargarLogin(); // Cargar login.

    // Pintamos el contenedor del formulario logín.
    d.getElementById("contenido").textContent = "";
    d.getElementById("contenido").appendChild(planFormularios.pintarFormRegistro());

    // Cargamos los eventos del formulario.
    evBtnForm.cargarFormLogIn();
    evBtnForm.submitFormRegistro();
}