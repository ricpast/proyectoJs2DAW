"use strict";

/*
    Función de bibloteca:
        - Tiene como funcíon añadir los eventos
        a los elementos cuya temática tiene que ver
        con productos.
*/

// Imports Bibliotecas
// Controladores.
import * as ctlInvitado from "../controladores/controladorInvitado.js";
import * as ctlUsuario from "../controladores/controladorUsuario.js";
// Plantillas.
import * as planAlertas from "../plantillas/planAlertas.js";
import * as planProductos from "../plantillas/planProductos.js";
// DB.
import * as bdProductos from "../bd/bdProductos.js"; // -> Conexión a bd de productos.
import * as bdUsuarios from "../bd/bdUsuarios.js"; // -> Conexión a bd de usuarios.


// Variables globales.
var d = document; // Acceso rapido.

// Añade el evento click al botón de las tarjetas de productos.
// Carga la ficha del producto target.
export const cargarFichaProducto = () => {
    Array.from(d.getElementsByClassName("btn-card-product")).map((btn) => {
        btn.addEventListener("click", async e => {
            let idProducto = e.target.getAttribute("name"); // -> Id Producto.
            
            // Dependiendo de si hay un usuario logueado cargamos un controlador u otro.
            if (bdUsuarios.getUsuarioLogueado() === undefined || 
            bdUsuarios.getUsuarioLogueado() === "")
            {   
                ctlInvitado.cargarFichaProducto(idProducto);
            } 
            
            else {
                ctlUsuario.cargarFichaProducto(idProducto);
            }
            
        })
    });
}

// Añade el producto al carrito. Usa el target del botón para identificar el producto.
export const anadirProductoAlCarrito = () => {
    d.getElementById("btnCarrito").addEventListener("click", async e => {
        console.log("Has pulsado en el botón de añadir al carrito.");
        // Obtenemos el id del producto.
        let idProducto = e.target.getAttribute("name");
        // Obtenemos el documento del producto. Le pasamos el id del producto.
        let producto = await bdProductos.obtenerRefDoc(idProducto);
        // Obtenemos la cantidad a añadir seleccionada por el cliente.
        let cantidad = parseInt(d.getElementById("iptCantidad").value);

        /* 
            Comprobamos que el cliente no haya seleccionado una cantidad mayor
            al stock disponible del producto.
        */
        if (cantidad <= producto.data().stock) {
            console.log("Producto añadido al carrito.");

            // Informamos al usuario.
            d.getElementById("ctnInfo").innerHTML = planAlertas.pintarAlertaPositiva("Producto añadido al carrito.");

            // Creamos un json del producto con formato del carrito. Así añadimos la cantidad seleccionada.
            let productoCarritoJson = {
                "id" : idProducto,
                "nombre" : producto.data().nombre,
                "stock" : producto.data().stock,
                "cantidad" : cantidad,
                "precio" : producto.data().precio,
                "imgPrincipal" : producto.data().imgPrincipal,
            }

            // Creamos una sesión del carrito. Añadimos el producto añadido a la variable global de bdProductos.
            bdProductos.setCarrito(productoCarritoJson);

            // Obtenemos el carrito actual.
            let carrito = bdProductos.getCarrito();
            
            // Vacíamos el carrito de operaciones anteriores.
            d.getElementById("ctnCarrito").innerHTML = "";

            // Contendrán como valor los totales del carrito.
            let precioTotal = 0;
            let cantidadTotal = 0;

            // Pintamos el carrito.
            carrito.map((producto) => {
                precioTotal += producto.precio; // Sumamos el precio.
                cantidadTotal += producto.cantidad; // Sumamos la cantidad.
                d.getElementById("ctnCarrito").innerHTML += planProductos.pintarProductosCarrito(producto);
                d.getElementById("ctnCarritoTotales").innerHTML = planProductos.pintarTotalesCarrito(precioTotal, cantidadTotal);
            });
        }

        else {
            console.log("No hay stock disponible.");
            d.getElementById("ctnInfo").innerHTML = planAlertas.pintarAlertaNegativa("No hay stock suficiente, ajuste la cantidad.");
        }
    });
}

// Añade el evento al botón comprar de la ficha del producto. Al pulsar en el, realiza la compra.
export const comprar = () => {
    d.getElementById("btnComprar").addEventListener("click", async e=> {
        console.log("Has pulsado sobre el botón de comprar situado la ficha del producto.");

        // Comprobamos que hay un usuario logueado. Solo pueden comprar usuarios.
        if (bdUsuarios.getUsuarioLogueado() === undefined || bdUsuarios.getUsuarioLogueado() === "" ){
            console.log("Intenta comprar sin iniciar sesión");
            d.getElementById("ctnInfo").innerHTML = planAlertas.pintarAlertaNegativa("Para realizar una compra debe iniciar sesión.");
        }

        else { // Usuario logueado.
            // Obtenemos el id del producto.
            let idProducto = e.target.getAttribute("name");
            // Obtenemos el documento del producto. Le pasamos el id del producto.
            let producto = await bdProductos.obtenerRefDoc(idProducto);
            // Obtenemos la cantidad a añadir seleccionada por el cliente.
            let cantidad = parseInt(d.getElementById("iptCantidad").value);

            /* 
                Comprobamos que el cliente no haya seleccionado una cantidad mayor
                al stock disponible del producto.
            */
            if (cantidad <= producto.data().stock) {

                // Creamos un json del producto con formato del carrito. Así añadimos la cantidad seleccionada.
                let productoCarritoJson = {
                    "id" : idProducto,
                    "nombre" : producto.data().nombre,
                    "stock" : producto.data().stock,
                    "cantidad" : cantidad,
                    "precio" : producto.data().precio,
                    "imgPrincipal" : producto.data().imgPrincipal,
                }

                // Creamos una sesión del carrito. Añadimos el producto añadido a la variable global de bdProductos.
                bdProductos.setCarrito(productoCarritoJson);

                // Cargamos el formulario de pedidos.
                ctlUsuario.cargarFormPedidos();
                
            }
        }

    });
}

// Añade el evento al botón realizar pedido situado en el carrito. Al pulsar en el, realiza la compra.
export const realizarPedidoCarrito = () => {
    d.getElementById("btnRealizarPedido").addEventListener("click", async e=> {
        console.log("Has pulsado sobre el botón de realizar pedido situado en el carrito.");

        // Comprobamos que hay un usuario logueado. Solo pueden comprar usuarios.
        if (bdUsuarios.getUsuarioLogueado() === undefined || bdUsuarios.getUsuarioLogueado() === "" ){
            console.log("Intenta comprar sin iniciar sesión");
            d.getElementById("ctnInfo").innerHTML = planAlertas.pintarAlertaNegativa("Para realizar una compra debe iniciar sesión.");
        }

        else { // Usuario logueado.
                // Cargamos el formulario de pedidos.
                ctlUsuario.cargarFormPedidos(); 
            
        }
    });
}