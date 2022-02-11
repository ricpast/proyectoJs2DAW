"use strict";

/*
    Función de bibloteca:
        - Tiene como funcíon incorporar funciones en Jquery.
*/

// Oculta un elemento con transicionado, recibe el selector y el tiempo.
export const ocultarElemento = (selector, tiempo) => {
    $(selector).hide(tiempo);
}
