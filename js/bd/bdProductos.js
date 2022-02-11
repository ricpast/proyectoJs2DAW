"use strict";

// *** Imports ********************** */
import { app } from "./datosFirebase.js";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

  // ****** Variables globales **************************/
  var d = document; // Acceso fácil dom.

  var carrito = []; // Sesión del carrito.

  export const getCarrito = () => { 
    return carrito;
  }

  export const setCarrito = (nuevoProducto) => { 
    let productoRepetido = false;
    /*
      Recorremos el carrito y comprobamos si el producto nuevo coincide
      con algún producto del carrito, si es asi, ajustamos la cantidad
      y el precio.
    */
    carrito.map((producto) => {
      if (producto.id === nuevoProducto.id) {
        producto.cantidad += nuevoProducto.cantidad;
        producto.precio = producto.precio + (nuevoProducto.precio * nuevoProducto.cantidad);
        productoRepetido = true;
      }
    });

    // Si el producto no se encuentra en el carrito lo añadimos.
    if (productoRepetido === false) {
      nuevoProducto.precio = (nuevoProducto.precio * nuevoProducto.cantidad);
      // Añadimos el nuevo producto al carrito.
      carrito.push(nuevoProducto); 
    }
  }

  // ****** Firebase ************************************/
  // Conexión con la base de datos. 
  const db = getFirestore(app);

  //*** Uso del doc *****************/
  // Obtenemos la referencia de la colección lista de la compra.
  const coleccionRef = collection(db, "productos");

  // Obtener los documentos de una colección.
  export const obtenerRefDocs = async () => {
    return await getDocs(coleccionRef);
  };

  // Obtener un documento específico de una colección. Recibe el id del documento.
  export const obtenerRefDoc = async (id) => {
    const docRef = doc(coleccionRef, id);
    const docSnap = await getDoc(docRef);
    return docSnap;
  }
