"use strict";

/*
    Función de bibloteca:
        - Tiene como funcíon devolver alertas para 
        mostrar en el dom.

*/

// Variables globales.
var d = document; // Acceso rapido.

// Pinta una alerta de color amigable. recibe el texto.
export const pintarAlertaPositiva = (texto) => {
    return `
        <div class="alert alert-success" role="alert">
            ${texto}
        </div>
    `;
}

// Pinta una alerta de color no amigable. recibe el texto.
export const pintarAlertaNegativa = (texto) => {
    return `
        <div class="alert alert-danger" role="alert">
            ${texto}
        </div>
    `;
}