"use strict";

/*
    Función de bibloteca:
        - Tiene como funcíon añadir los eventos
        a los elementos elementos de la barra de navegación
        del usuario invitado.
*/

// Bibliotecas
import * as ctlInvitado from "../controladores/controladorInvitado.js";
import * as ctlUsuario from "../controladores/controladorUsuario.js";
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
        ctlInvitado.cargarEstilosIndex();
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
        ctlInvitado.cargarEstilosProductos();
    });
}

/*
    Botón de "Mi cuenta" situado en el NAV principal.
    Al pulsar sobre el, carga el formulario de inicio
    de sesión.
*/
export const cargarLogin = () => {
    d.getElementById("btnNavLogIn").addEventListener("click", e => {
        console.log("Has pulsado sobre el botón de logIn en el nav.");
        ctlInvitado.cargarEstilosLogIn();
    });
}
