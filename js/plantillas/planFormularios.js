"use strict";

/*
    Función de bibloteca:
        - Tiene como funcíon pintar todos
        los formularios de la web.

*/

// Variables globales.
var d = document; // Acceso rapido.

// Cargar formulario de logIn.
export const pintarFormLogin = () => {
  let ctnLogin = d.createElement("div");
  ctnLogin.setAttribute("id", "ctnForm");
  ctnLogin.innerHTML = `
      <div id="cabeceraFormLogin">
        <h4 class="card-title">Iniciar sesión</h4>
      </div>
      <form onsubmit="return false">
      <div class="form-group">
        <label for="exampleInputEmail1">E-mail</label>
        <input type="email" class="form-control" id="iptEmail" aria-describedby="emailHelp" placeholder="Introduzca su E-mail *" required>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Contraseña</label>
        <input type="password" class="form-control" id="iptPass" placeholder="Introduzca su contraseña *" required>
      </div>
      <button id="btnSbmLogin" type="submit" class="btn btn-success btn-lg btn-block">Iniciar sesión</button>
      <p>No dispongo de cuenta</p>
      <button id="btnCargarFormRegistro" type="button" class="btn btn-primary btn-lg btn-block">Crear cuenta</button>
      <div id="infoForm"></div>
    </form>
  `;
  return ctnLogin;
}

// Cargar formulario de registro.
export const pintarFormRegistro = () => {
  let ctnRegistro = d.createElement("div");
  ctnRegistro.setAttribute("id", "ctnForm");
  ctnRegistro.innerHTML = `
      <div id="cabeceraFormLogin">
        <h4 class="card-title">Crear cuenta</h4>
      </div>
      <form id="formulario-registro" onsubmit="return false">
        <div class="form-group">
          <label for="iptNombre">Nombre</label>
          <input id="iptNombre" type="text" class="form-control" placeholder="Nombre" aria-label="Username" aria-describedby="basic-addon1" required>
        </div>
        <div class="form-group">
          <label for="iptEmail">E-mail</label>
          <input type="email" class="form-control" id="iptEmail" aria-describedby="emailHelp" placeholder="Introduzca su E-mail *" required>
        </div>
        <div class="form-group">
          <label for="iptPass">Contraseña</label>
          <input type="password" class="form-control" id="iptPass" placeholder="Introduzca su contraseña *" required>
        </div>
        <button id="btnSbmRegistro" type="submit" class="btn btn-success btn-lg btn-block">Crear cuenta</button>
        <p>Ya tengo una cuenta</p>
        <button id="btnCargarFormLogIn" type="button" class="btn btn-primary btn-lg btn-block">Iniciar sesión</button>
        <div id="infoForm"></div>
      </form>
  `;
  return ctnRegistro;
}

// Cargar formulario de pedido.
export const pintarFormPedidos = () => {
  let ctnPedido = d.createElement("div");
  ctnPedido.setAttribute("id", "ctnForm");
  ctnPedido.innerHTML = `
      <form id="formulario-pedidos" onsubmit="return false">
        <div id="gridForm">
          <div class="form-group">
            <h4 class="card-title">Datos personales</h4>
            <label for="iptNombre">Nombre</label>
            <input id="iptNombre" type="text" class="form-control" placeholder="Nombre*" aria-label="Username" aria-describedby="basic-addon1" required>
            <label for="iptApellidos">Apellidos</label>
            <input id="iptApellidos" type="text" class="form-control" placeholder="Apellidos*" aria-label="Username" aria-describedby="basic-addon1" required>
            <label for="iptDNI">DNI</label>
            <input id="iptDNI" type="text" class="form-control" placeholder="DNI*" aria-label="Username" aria-describedby="basic-addon1" 
            pattern="[0-9]{8}[A-Za-z]{1}" title="Debe poner 8 números y una letra" required>
            <label for="iptMovil">Movil</label>
            <input id="iptMovil" type="number" class="form-control" placeholder="Movil*" aria-label="Username" aria-describedby="basic-addon1" 
            pattern="[0-9]{8}" required>
          </div>

          <div class="form-group">
            <h4 class="card-title">Dirección de envío</h4>
            <label for="iptDirEnvio">Dirección</label>
            <input id="iptDirEnvio" type="text" class="form-control" placeholder="Dirección*" aria-label="Username" aria-describedby="basic-addon1" required>
            <label for="iptPais">País</label>
            <input id="iptPais" type="text" class="form-control" aria-describedby="basic-addon1" placeholder="País*" required>
            <label for="iptCodPostal">Código postal</label>
            <input id="iptCodPostal" type="text" class="form-control" aria-describedby="basic-addon1" placeholder="Código postal*" required>
            <label for="iptPoblacion">Población</label>
            <input id="iptPoblacion" type="text" class="form-control" aria-describedby="basic-addon1" placeholder="Población*" required>
            <label for="iptProvincia">Provincia</label>
            <input id="iptProvincia" type="text" class="form-control" aria-describedby="basic-addon1" placeholder="Provincia*" required>
          </div>
        </div>
        <button id="btnSbmPedido" type="submit" class="btn btn-success btn-lg btn-block">Realizar pedido</button>
        <div id="infoForm"></div>
      </form>
  `;
  return ctnPedido;
}



