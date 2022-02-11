"use strict";

/*
    Función de bibloteca:
        - Tiene como funcíon añadir los eventos
        a los elementos elementos de tengan que ver
        con formularios.
*/

/* *** Bibliotecas *** */
// Controladores.
import * as ctlInvitado from "../controladores/controladorInvitado.js";
import * as ctlUsuario from "../controladores/controladorUsuario.js";
// Estilos.
import * as planAlertas from "../plantillas/planAlertas.js";
// BD.
import * as bdUsuarios from "../bd/bdUsuarios.js";
import * as bdProductos from "../bd/bdProductos.js";
// Funciones varias.
import * as funcJquery from "../funciones/funcJquery.js";

// Variables globales.
var d = document; // Acceso rapido.

/*
    Botón de "Iniciar sesión" situado en el form de registro.
    Al pulsar sobre el, carga el form de login.
*/
export const cargarFormLogIn = () => {
    d.getElementById("btnCargarFormLogIn").addEventListener("click", e => {
        console.log("Has pulsado sobre el botón de 'Iniciar sesión' del formulario de registro.");
        ctlInvitado.cargarEstilosLogIn();
    });
}

/*
    Botón de "Crear cuenta" situado en el form de login.
    Al pulsar sobre el, carga el form de registro.
*/
export const cargarFormRegistro = () => {
    d.getElementById("btnCargarFormRegistro").addEventListener("click", e => {
        console.log("Has pulsado sobre el botón de 'crear cuenta' del formulario de login.");
        ctlInvitado.cargarEstilosRegistro();
    });
}

export const submitFormLogin = () => {
    d.getElementById("btnSbmLogin").addEventListener("click", async e => {
        console.log("Has pulsado sobre el botón submit (iniciar sesión) situado en el form de login.");
        
        // Obtenemos los datos del form.
        let correo = d.getElementById("iptEmail").value;
        let pass = d.getElementById("iptPass").value;

        // Validaciones.
        if (correo !== "" && pass !== "") { // -> Campos vacíos.

            if (pass.length >= 6) { // -> Contraseña mayor de 5 caracteres.

                if (await bdUsuarios.iniciarSesion(correo, pass) === true) { // -> Comprobamos que se ha rehalizado el inicio de sesión correctamente.
                    // Obtenemos los datos del usuario de la colección usuarios. Le pasamos como parámetro el correo introducido.
                    let usuarioLogueado = await bdUsuarios.comprobarCampoEnBD("correo", correo);

                    // Creamos la sesión del usuario logueado. Almacenamos el json en una variable global.
                    bdUsuarios.setUsuarioLogueado(usuarioLogueado.docs[0]);

                    // Cargamos una página u otra en función del rol del usuario logueado.
                    if (usuarioLogueado.docs[0].data().rol === "admin") { // Carga los estilos y eventos del administrador.
                        console.log("Has iniciado sesión con el rol de admin.");
                    } else if (usuarioLogueado.docs[0].data().rol === "usuario") { // Carga los estilos y eventos del usuario.
                        console.log("Has iniciado sesión con el rol de usuario.");
                        ctlUsuario.cargarEstilosUsuario(bdUsuarios.getUsuarioLogueado());
                    }
                }

                else {
                    // Informamos al usuario.
                    d.getElementById("infoForm").innerHTML = planAlertas.pintarAlertaNegativa("Error: la contraseña o el correo son incorrectos.");
                }
                
            }

            else {
                // Informamos al usuario.
                d.getElementById("infoForm").innerHTML = planAlertas.pintarAlertaNegativa("Error: contraseña inferior de 6 caracteres.");
            }
        }

        else {
            // Informamos al usuario.
            d.getElementById("infoForm").innerHTML = planAlertas.pintarAlertaNegativa("Error: no puede haber campos vacíos.");
        }

    });
}

/*
    Botón submit de "Crear cuenta" situado en el form de registro.
    Al pulsar sobre el, recoge los datos del form, los valida y 
    los envia a la BD.
*/
export const submitFormRegistro = () => {
    d.getElementById("btnSbmRegistro").addEventListener("click", async e => {
        console.log("Has pulsado sobre el botón submit situado en el form registro.");
        
        // Obtenemos los datos del form.
        let nombre = d.getElementById("iptNombre").value;
        let correo = d.getElementById("iptEmail").value;
        let pass = d.getElementById("iptPass").value;

        // Validaciones.
        if (nombre !== "" && correo !== "" && pass !== "") { // -> Campos vacíos.

            if (pass.length >= 6) { // -> Contraseña mayor de 5 caracteres.

                let nombreComprobado = await bdUsuarios.comprobarCampoEnBD("nombre", nombre);
                if (nombreComprobado.docs.length === 0) { // -> Comprobamos que el nombre no exista en la bd.

                    let correoComprobado = await bdUsuarios.comprobarCampoEnBD("correo", correo);
                    if (correoComprobado.docs.length === 0) { // -> Comprobamos que el correo no exista en la bd.

                        // Registramos al usuario. Recibimos las credenciales del usuario creado.
                        let credenciales = await bdUsuarios.crearUsuario(correo, pass);

                        // Comprobamos que recibimos las credenciales.
                        if (credenciales !== 'undefined') {
                            /* 
                                Creamos un objeto json con los datos del usuario para almacenarlo
                                en la colección de usuarios de la bd.
                            */
                            let jsonUsuario = {
                                "nombre" : nombre,
                                "correo" : correo,
                                "fechaCreacion" : credenciales.user.metadata.creationTime,
                                "pedidos" : [],
                                "rol" : "usuario",
                                "imgUsuario" : "../../img/fotosUsuario/userDefault.png",
                            }

                            // Añadimos el usuario json a la colección de usuarios.
                            await bdUsuarios.anadirUsuarioAColeccion(jsonUsuario);

                            // Informamos al usuario.
                            d.getElementById("infoForm").innerHTML = planAlertas.pintarAlertaPositiva("Cuenta creada correctamente.");

                            // Vacíamos el formulario de registro.
                            d.getElementById("formulario-registro").reset();
                        }

                        else {
                            // Informamos al usuario.
                            d.getElementById("infoForm").innerHTML = planAlertas.pintarAlertaNegativa("Error: el usuario no se ha podido crear.");
                        }
                    }

                    else {
                        // Informamos al usuario.
                        d.getElementById("infoForm").innerHTML = planAlertas.pintarAlertaNegativa("Error: El correo introducido ya existe.");
                    }
                        
                }

                else {
                    // Informamos al usuario.
                    d.getElementById("infoForm").innerHTML = planAlertas.pintarAlertaNegativa("Error: El nombre introducido ya existe.");
                }
            }

            else {
                // Informamos al usuario.
                d.getElementById("infoForm").innerHTML = planAlertas.pintarAlertaNegativa("Error: contraseña inferior de 6 caracteres.");
            }
        }

        else {
            // Informamos al usuario.
            d.getElementById("infoForm").innerHTML = planAlertas.pintarAlertaNegativa("Error: no puede haber campos vacíos.");
        }
    });
}


/*
    Botón submit del form de pedidos situado en el form de pedidos.
    Al pulsar sobre el, recoge los datos del form, los valida y 
    los envia a la BD.
*/
export const submitFormPedidos = () => {
    d.getElementById("btnSbmPedido").addEventListener("click", e => {
        console.log("Has pulsado en realizar pedido.");

        // Obtenemos los datos del form y creamos un json.
        let pedidoJson = {
            "nombre" : d.getElementById("iptNombre").value,
            "apellidos" : d.getElementById("iptApellidos").value,
            "dni" : d.getElementById("iptDNI").value,
            "movil" : d.getElementById("iptMovil").value,
            "direccion" : d.getElementById("iptDirEnvio").value,
            "pais" : d.getElementById("iptPais").value,
            "codPostal" : d.getElementById("iptCodPostal").value,
            "poblacion" : d.getElementById("iptPoblacion").value,
            "provincia" : d.getElementById("iptProvincia").value,
            "productos" : bdProductos.getCarrito(), // Añadimos el carrito.
        }

        // Comprobamos que no hayan campos vacíos.
        if (pedidoJson.nombre !== "" && pedidoJson.apellidos !== "" && pedidoJson.dni !== "" && pedidoJson.movil !== ""
        && pedidoJson.direccion !== "" && pedidoJson.pais !== "" && pedidoJson.codPostal !== "" && pedidoJson.poblacion !== "" 
        && pedidoJson.provincia !== "") {
            try {
                bdUsuarios.addPedido(pedidoJson);
                // Informamos al usuario.
                d.getElementById("infoForm").innerHTML = planAlertas.pintarAlertaPositiva("Pedido realizado.");

                // Ocultamos el botón de realizar pedidos para que el usuario no realize dos veces el mismo pedido.
                funcJquery.ocultarElemento("#btnSbmPedido", 1500);
            }

            catch (err) {
                console.log(err);
                // Informamos al usuario.
                d.getElementById("infoForm").innerHTML = planAlertas.pintarAlertaNegativa("Error: ha ocurrido un fallo al realizar el pedido.");
            }
        }

        else {
            // Informamos al usuario.
            d.getElementById("infoForm").innerHTML = planAlertas.pintarAlertaNegativa("Error: no puede haber campos vacíos.");
        }
    });
}