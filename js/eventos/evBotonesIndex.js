"use strict";

/*
    Función de bibloteca:
        - Tiene como funcíon añadir los eventos
        a los elementos elementos página principal
        (index).
*/

// BD.
import * as bdUsuarios from "../bd/bdUsuarios.js"; // -> Conexión a bd de usuarios.

// Controladores.
import * as ctlInvitado from "../controladores/controladorInvitado.js";
import * as ctlUsuario from "../controladores/controladorUsuario.js";


// Botón situado en index, carga los productos.
export const cargarProductos = () => {
    $("#btnIdxCargarProductos").click(function() {
        console.log("Has pulsado sobre el botón de productos situado en el index.");
        
        // Dependiendo de si hay un usuario logueado cargamos un controlador u otro.
        if (bdUsuarios.getUsuarioLogueado() === undefined || 
        bdUsuarios.getUsuarioLogueado() === "")
        {   
            ctlInvitado.cargarEstilosProductos();
        } 
        
        else {
            ctlUsuario.cargarEstilosProductos();
        }
      });

}