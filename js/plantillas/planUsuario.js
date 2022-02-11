"use strict";

/*
    Función de bibloteca:
        - Tiene como funcíon pintar todos los
        elementos de la página de usuarios.
*/

// Bibliotecas
import * as bdUsuarios from "../bd/bdUsuarios.js"; // -> Conexión a bd de usuarios.

// Variables globales.
var d = document; // Acceso rapido.

// Pinta la dicha del usuario. Es decir, sus datos personales.
export const cargarFichaUsuario = () => {
    let usuario = bdUsuarios.getUsuarioLogueado();
    let secUsuario = d.createElement("section")
    secUsuario.setAttribute("id", "secUsuario");
    secUsuario.innerHTML = `<h1 class="display-3">${usuario.data().nombre}</h1>`;
    let cajaFichaUsuario = d.createElement("div")
    cajaFichaUsuario.setAttribute("id", "cajaFichaUsuario");

    cajaFichaUsuario.innerHTML += `
        <div class="card card-product" style="width: 18rem; max-height: 33rem;">
            <img src="${usuario.data().imgUsuario}" class="card-img-top" alt="Logo usuario">
            <div class="card-body">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><strong>Nick: </strong>${usuario.data().nombre}</li>
                    <li class="list-group-item"><strong>Correo: </strong>${usuario.data().correo}</li>
                    <li class="list-group-item"><strong>Fecha de creación: </strong>${usuario.data().fechaCreacion}</li>
                    <button id="btnListarPedidos" class="btn btn-outline-secondary btn-lg border">
                        Ver pedidos <span id="span-cant-pedi">${usuario.data().pedidos.length}</span>
                    </button>
                </ul>
            </div>
        </div>
        `;

    secUsuario.appendChild(cajaFichaUsuario);

    return secUsuario;
}