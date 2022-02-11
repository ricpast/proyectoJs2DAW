"use strict";

/*
    Funciónes de la biblioteca:

    - La biblioteca tiene como función de manejar tanto las plantillas (estilos) como los
      eventos de las distintas páginas de la web orientadas al usuario.
    - La biblioteca depende de las distintas plantillas para cargar los estilos de la web.
    - La biblioteca depende de eventos para cargar y dar interacción a la web.
*/

/* *** Bibliotecas ********************************************************************* */
// Eventos.
import * as evProductos from "../eventos/evProductos.js"; // -> Conexión a bd de productos.
import * as evBtnNavUsuario from "../eventos/evBotonesNavUsuario.js"; // -> Eventos de la barra de navegación. (Usuario).
import * as evBtnForm from "../eventos/evBotonesForm.js"; // -> Eventos de formulario.
import * as evBtnIndex from "../eventos/evBotonesIndex.js"; // -> Eventos de index.
import * as evFichaUsuario from "../eventos/evFichaUsuario.js"; // -> Eventos de ficha usuario.

// Plantillas.
import * as planCabecera from "../plantillas/planCabeceras.js"; // -> Estilos de cabeceras.
import * as planPagPrincipal from "../plantillas/planPagPrincipal.js"; // -> Estilos de cabeceras.
import * as planProductos from "../plantillas/planProductos.js"; // -> Estilos sobre productos.
import * as planFormularios from "../plantillas/planFormularios.js"; // -> Estilos sobre formularios.
import * as planPedidos from "../plantillas/planPedidos.js"; // -> Estilos sobre pedidos.
import * as planUsuario from "../plantillas/planUsuario.js"; // -> Estilos destinados a usuarios.

// BD.
import * as bdProductos from "../bd/bdProductos.js"; // -> Conexión a bd de productos.
import * as bdUsuarios from "../bd/bdUsuarios.js"; // -> Conexión a bd de usuarios.

// Variables globales.
var d = document; // Acceso rapido.

// Carga los estilos de la página principal.
export const cargarEstilosIndex = () => {
    // Pintamos la barra de navegación. Le pasamos como parámetro el usuario logueado.
    d.getElementById("cabecera").innerHTML = planCabecera.barraNavUsuario(bdUsuarios.getUsuarioLogueado());

    // Pintamos el banner de la página principal.
    d.getElementById("cabecera").innerHTML += planPagPrincipal.pintarBannerPrincipal();

    // Cargamos los eventos de la barra de navegación (home, productos, categorías, etc...).
    evBtnNavUsuario.cargarIndex(); // Cargar index.
    evBtnNavUsuario.cargarProductos(); // Listar todos los productos.
    evBtnNavUsuario.cargarFichaUsuario(); // Carga la ficha del producto.
    evBtnNavUsuario.cargarPedidos(bdUsuarios.getUsuarioLogueado()) // Mostramos los pedidos del usuario.
    evBtnNavUsuario.cerrarSesion(); // Cerrar sesión.

    // Pintamos el banner de categorías de productos.
    d.getElementById("contenido").innerHTML = planPagPrincipal.pintarBannerCategorias();

    // Cargamos los eventos de los botones de la página.
    evBtnIndex.cargarProductos();
}

// Carga los estilos y los eventos de la página de productos.
export const cargarEstilosProductos = async ()  => {
    // Pintamos la barra de navegación. Le pasamos como parámetro el usuario logueado.
    d.getElementById("cabecera").innerHTML = planCabecera.barraNavUsuario(bdUsuarios.getUsuarioLogueado());

    // Cargamos los eventos de la barra de navegación (home, productos, categorías, etc...).
    evBtnNavUsuario.cargarIndex(); // Cargar index.
    evBtnNavUsuario.cargarProductos(); // Listar todos los productos.
    evBtnNavUsuario.cargarFichaUsuario(); // Carga la ficha del producto.
    evBtnNavUsuario.cargarPedidos(bdUsuarios.getUsuarioLogueado()) // Mostramos los pedidos del usuario.
    evBtnNavUsuario.cerrarSesion(); // Cerrar sesión.

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
    // Pintamos la barra de navegación. Le pasamos como parámetro el usuario logueado.
    d.getElementById("cabecera").innerHTML = planCabecera.barraNavUsuario(bdUsuarios.getUsuarioLogueado());

    // Cargamos los eventos de la barra de navegación (home, productos, categorías, etc...).
    evBtnNavUsuario.cargarIndex(); // Cargar index.
    evBtnNavUsuario.cargarProductos(); // Listar todos los productos.
    evBtnNavUsuario.cargarFichaUsuario(); // Carga la ficha del producto.
    evBtnNavUsuario.cargarPedidos(bdUsuarios.getUsuarioLogueado()) // Mostramos los pedidos del usuario.
    evBtnNavUsuario.cerrarSesion(); // Cerrar sesión.

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

// Carga los estilos y eventos de la página de login.
export const cargarEstilosLogIn = async () => {
    // Pintamos la barra de navegación. Le pasamos como parámetro el usuario logueado.
    d.getElementById("cabecera").innerHTML = planCabecera.barraNavUsuario(bdUsuarios.getUsuarioLogueado());

    // Cargamos los eventos de la barra de navegación (home, productos, categorías, etc...).
    evBtnNavUsuario.cargarIndex(); // Cargar index.
    evBtnNavUsuario.cargarProductos(); // Listar todos los productos.
    evBtnNavUsuario.cargarFichaUsuario(); // Carga la ficha del producto.
    evBtnNavUsuario.cargarPedidos(bdUsuarios.getUsuarioLogueado()) // Mostramos los pedidos del usuario.
    evBtnNavUsuario.cerrarSesion(); // Cerrar sesión.

    // Pintamos el contenedor del formulario logín.
    d.getElementById("contenido").textContent = "";
    d.getElementById("contenido").appendChild(planFormularios.pintarFormLogin());

    // Cargamos los eventos del formulario.
    evBtnForm.cargarFormRegistro();
    evBtnForm.submitFormLogin(); // -> Login.
}

// Carga los estilos y eventos de la página de registro.
export const cargarEstilosRegistro = async () => {
    // Pintamos la barra de navegación. Le pasamos como parámetro el usuario logueado.
    d.getElementById("cabecera").innerHTML = planCabecera.barraNavUsuario(bdUsuarios.getUsuarioLogueado());

    // Cargamos los eventos de la barra de navegación (home, productos, categorías, etc...).
    evBtnNavUsuario.cargarIndex(); // Cargar index.
    evBtnNavUsuario.cargarProductos(); // Listar todos los productos.
    evBtnNavUsuario.cargarFichaUsuario(); // Carga la ficha del producto.
    evBtnNavUsuario.cargarPedidos(bdUsuarios.getUsuarioLogueado()) // Mostramos los pedidos del usuario.
    evBtnNavUsuario.cerrarSesion(); // Cerrar sesión.

    // Pintamos el contenedor del formulario logín.
    d.getElementById("contenido").textContent = "";
    d.getElementById("contenido").appendChild(planFormularios.pintarFormRegistro());

    // Cargamos los eventos del formulario.
    evBtnForm.cargarFormLogIn();
    evBtnForm.submitFormRegistro();
}

// Carga los estilos y eventos de usuario.
export const cargarEstilosUsuario = () => {
    // Pintamos la barra de navegación. Le pasamos como parámetro el usuario logueado.
    d.getElementById("cabecera").innerHTML = planCabecera.barraNavUsuario(bdUsuarios.getUsuarioLogueado());

    // Cargamos los eventos de la barra de navegación (home, productos, categorías, etc...).
    evBtnNavUsuario.cargarIndex(); // Cargar index.
    evBtnNavUsuario.cargarProductos(); // Listar todos los productos.
    evBtnNavUsuario.cargarFichaUsuario(); // Carga la ficha del producto.
    evBtnNavUsuario.cargarPedidos(bdUsuarios.getUsuarioLogueado()) // Mostramos los pedidos del usuario.
    evBtnNavUsuario.cerrarSesion(); // Cerrar sesión.

    // Pintamos la ficha del usuario.
    d.getElementById("contenido").textContent = "";
    d.getElementById("contenido").appendChild(planUsuario.cargarFichaUsuario(bdUsuarios.getUsuarioLogueado()));

    // Añadimos los eventos de la ficha de usuario.
    evFichaUsuario.btnListarPedidos();
}

// Carga los estilos y eventos de la página form pedidos.
export const cargarFormPedidos = () => {
        // Pintamos la barra de navegación. Le pasamos como parámetro el usuario logueado.
        d.getElementById("cabecera").innerHTML = planCabecera.barraNavUsuario(bdUsuarios.getUsuarioLogueado());

        // Cargamos los eventos de la barra de navegación (home, productos, categorías, etc...).
        evBtnNavUsuario.cargarIndex(); // Cargar index.
        evBtnNavUsuario.cargarProductos(); // Listar todos los productos.
        evBtnNavUsuario.cargarFichaUsuario(bdUsuarios.getUsuarioLogueado()); // Carga la ficha del producto.
        evBtnNavUsuario.cargarPedidos(bdUsuarios.getUsuarioLogueado()) // Mostramos los pedidos del usuario.
        evBtnNavUsuario.cerrarSesion(); // Cerrar sesión.

        // Pintamos el form de pedidos.
        d.getElementById("contenido").textContent = "";
        d.getElementById("contenido").appendChild(planFormularios.pintarFormPedidos());

        // Añadimos los eventos del form.
        evBtnForm.submitFormPedidos();
}

// Carga los estilos y eventos de la página de pedidos.
export const cargarEstilosPedidos = () => {
    // Pintamos la barra de navegación. Le pasamos como parámetro el usuario logueado.
    d.getElementById("cabecera").innerHTML = planCabecera.barraNavUsuario(bdUsuarios.getUsuarioLogueado());

    // Cargamos los eventos de la barra de navegación (home, productos, categorías, etc...).
    evBtnNavUsuario.cargarIndex(); // Cargar index.
    evBtnNavUsuario.cargarProductos(); // Listar todos los productos.
    evBtnNavUsuario.cargarFichaUsuario(bdUsuarios.getUsuarioLogueado()); // Carga la ficha del producto.
    evBtnNavUsuario.cargarPedidos(bdUsuarios.getUsuarioLogueado()) // Mostramos los pedidos del usuario.
    evBtnNavUsuario.cerrarSesion(); // Cerrar sesión.

    // Obtenemos los pedidos del usuario logeado.
    let usuarioLogueado = bdUsuarios.getUsuarioLogueado();

    // Pintamos los pedidos. Pasamos como parámetro el pedido y un contador para el componente acordeon de boostrap.
    let contador = 0;
    d.getElementById("contenido").textContent = "";
    usuarioLogueado.data().pedidos.map((pedido) => {
        contador ++;
        d.getElementById("contenido").appendChild(planPedidos.pintarPedidos(pedido, contador));
    });
}


