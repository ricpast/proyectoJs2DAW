"use strict";

// Controlador.
import * as ctlInvitado from "./controladores/controladorInvitado.js";

window.onload = () => {
    // Variables globales.
    var d = document; // Acceso rapido.

    // Cargamos los datos de la página principal por defecto. Controlador invitado por defecto.
    ctlInvitado.cargarEstilosIndex();
}