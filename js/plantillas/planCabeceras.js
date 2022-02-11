"use strict";

/*
    Función de bibloteca:
        - Tiene como funcíon devolver pintar
        las barras de navegación tanto para
        el usuario como para el usuario invitado.

*/

// Cargar cabecera página principal.
export const barraNavPrincipal = () => {
    return `
    <nav id="navPrincipal">
      <ul>
        <li id="btnNavIndex"><i class="fas fa-home"></i> Home</li>
        <li id="btnNavAllProducts">Productos</li>
        <li id="btnNavLogIn"><i class="fas fa-user"></i> Mi cuenta</li>
      </ul>
    </nav>`;
}

// Pinta la barra de navegación del usuario. Recibe el json del usuario logueado.
export const barraNavUsuario = (usuario) => {
    return `
        <nav id="navPrincipal">
        <ul>
          <li id="btnNavIndex"><i class="fas fa-home"></i> Home</li>
          <li id="btnNavAllProducts">Productos</li>
          <li id="btnNavPedidos">Pedidos</li>
          <li id="btnNavFichaUser"><i class="fas fa-user"></i> ${usuario.data().nombre}</li>
          <li id="btnNavCerrarSesion">Cerrar sesión</li>
        </ul>
      </nav>;
    `
}

