"use strict";

// *** Imports ********************** */
import { app, autentificacion } from "./datosFirebase.js";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  onSnapshot,
  doc,
  addDoc,
  query,
  where,
  updateDoc,
  arrayUnion,
  arrayRemove,
  orderBy,
  limit,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";


  // ****** Variables globales **************************/
  var d = document; // Acceso fácil dom.
  var usuarioLogueado; // Sesión del usuario logueado.

  export const getUsuarioLogueado = () => { 
    return usuarioLogueado;
  }

  export const setUsuarioLogueado = (usuarioJson) => { 
    usuarioLogueado = usuarioJson;
  }

  // ****** Firebase ************************************/
  // Conexión con la base de datos. 
  const db = getFirestore(app);

  // Obtenemos la referencia de la colección lista de la compra.
  const coleccionRef = collection(db, "usuarios");

  //*** Uso del doc *****************/
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

  // Devuelve en formato json los documentos de la colección usuarios.
  export async function obtenerListaJSON() {
    const listaSnapshot = await obtenerRefDocs();
    const listaJSON = listaSnapshot.docs.map(doc => doc.data());
    return listaJSON;
  }

  // Añadir usuarios a la colección de usuarios.
  export const anadirUsuarioAColeccion = async (usuarioJson) => {
    try {
      let nuevoUsuario = await addDoc(coleccionRef, usuarioJson);
      console.log(`Usuario añadido a la colección`);
      return nuevoUsuario;
    }

    catch (err) {
      console.log(err);
      console.log(err.name);
      console.log(err.stack);
    }    
  };

  // Crear usuario en el authentication de FireBase.
  export const crearUsuario = async (correo, pass) => {
    try {
      let credenciales = await createUserWithEmailAndPassword(autentificacion, correo, pass);
      console.log("Usuario registrado."); // Info.
      console.log(credenciales);
      return credenciales;
    }

    catch (err) {
        console.log(err);
        console.log(err.name);
        console.log(err.stack);
    }
    
  };

  // Realiza el log. Recibe el correo y la contraseña del usuario.
  export const iniciarSesion = async (usuario, contra)  => {
    let usuarioValido;

    try {
      let credenciales = await signInWithEmailAndPassword(autentificacion, usuario, contra);
      console.log("Sesión Iniciada");
      console.log(credenciales);
      usuarioValido = true;
    }

    catch (err) {
      console.log(err);
      console.log(err.name);
      console.log(err.stack);
      usuarioValido = false;
    }

    return usuarioValido;
  };

    /*
      Devuelve true si se encuentra una coincidencia en la base de datos.
      Recibe la clave (campo) de la bd y el valor que queremos buscar.
    */
    export const comprobarCampoEnBD = async (clave, valor) => {

      // Obtenemos la referencias filtradas.
      let colFiltrada = await query(coleccionRef, where(clave, "==", valor));
            
      // Obtenemos los documentos.
      let docsFiltrados = await getDocs(colFiltrada);
      
      return docsFiltrados;
    }

    /*
      Añade un pedido en formato json al array pedidos
      del usaurio, recibe el pedido.
    */
    export const addPedido = async (pedidoJson) => {
      console.log("Producto añadido");
      // Se obtiene la referencia del documento.
      const docRef = await doc(coleccionRef, getUsuarioLogueado().id);
      // Las claves nuevas se añaden al documento.
      await updateDoc(docRef, {
        pedidos: arrayUnion(pedidoJson),
      });

      // Añadimos el pedido a la sesión del usuario.
      let usuario = getUsuarioLogueado();
      usuario.data().pedidos.push(pedidoJson);
      setUsuarioLogueado(usuario);
    }
  

