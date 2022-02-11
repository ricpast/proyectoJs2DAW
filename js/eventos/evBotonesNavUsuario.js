"use strict";

/*
    Función de bibloteca:
        - Tiene como funcíon añadir los eventos
        a los elementos elementos de la barra de navegación
        del usuario.
*/

// Bibliotecas
import * as ctlUsuario from "../controladores/controladorUsuario.js";
import * as ctlInvitado from "../controladores/controladorInvitado.js";
import * as bdUsuarios from "../bd/bdUsuarios.js"; // -> Conexión a bd de usuarios.

// Variables globales.
var d = document; // Acceso rapido.

/*
    Botón de "Home" situado en el NAV principal.
    Al pulsar sobre el, carga el index.
*/
export const cargarIndex = () => {
    d.getElementById("btnNavIndex").addEventListener("click", e => {
        console.log("Has pulsado sobre el botón de home.");
        ctlUsuario.cargarEstilosIndex();
    });
}

/*
    Botón de "Productos" situado en el NAV principal.
    Al pulsar sobre el, carga todos los productos
    de la BD.
*/
export const cargarProductos = () => {
    d.getElementById("btnNavAllProducts").addEventListener("click", e => {
        console.log("Has pulsado sobre el botón de productos.");
        ctlUsuario.cargarEstilosProductos();
    });
}

/*
    Botón de "ficha usuario" situado en el NAV de usuarios.
    Al pulsar sobre el, carga la ficha del usuario.
*/
export const cargarFichaUsuario = () => {
    d.getElementById("btnNavFichaUser").addEventListener("click", e => {
        console.log("Has pulsado sobre el botón de ficha de usuario.");
        ctlUsuario.cargarEstilosUsuario();
    });
}

/*
    Botón de "pedidos" situado en el NAV de usuario.
    muestra los pedidos del usuario.
*/
export const cargarPedidos = () => {
    d.getElementById("btnNavPedidos").addEventListener("click", e=> {
        console.log("Has pulsado sobre el botón de mostrar pedidos");
        ctlUsuario.cargarEstilosPedidos();
    })
}


/*
    Botón de "Mi cerrar sesión" situado en el NAV de usuario y de admin.
    Al pulsar sobre el cierra la sesión.
*/
export const cerrarSesion = () => {
    d.getElementById("btnNavCerrarSesion").addEventListener("click", e => {
        console.log("Has pulsado sobre cerrar sesión del nav.");
        bdUsuarios.setUsuarioLogueado(""); // --> Eliminamos el usuario.
        ctlInvitado.cargarEstilosIndex(); // --> Cargamos el index.
    });
}