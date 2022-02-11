"use strict";

/*
    Función de bibloteca:
        - Tiene como funcíon añadir los eventos
        a los elementos elementos de la ficha
        del usuario.
*/

// Bibliotecas
import * as ctlUsuario from "../controladores/controladorUsuario.js"; // Controlador.

/*
    Botón de "Ver pedidos" situado en la ficha del usuario.
    Al pulsar sobre el, carga sus pedidos.
*/
export const btnListarPedidos = () => {
    document.getElementById("btnListarPedidos").addEventListener("click", e => {
        console.log("Has pulsado sobre el botón de listar pedidos situado en la ficha de usuario.");
        ctlUsuario.cargarEstilosPedidos();
    });
}