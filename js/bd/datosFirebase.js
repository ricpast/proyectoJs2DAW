"use strict";

// Fecha de creación: 12/01/2022.
// Fecha ult. modificación: 12/01/2022.

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAd2tiyF2UyRAQV5-hem6cGLrlN6gJr7VY",
    authDomain: "proyectoservidor-ed45d.firebaseapp.com",
    projectId: "proyectoservidor-ed45d",
    storageBucket: "proyectoservidor-ed45d.appspot.com",
    messagingSenderId: "319544849968",
    appId: "1:319544849968:web:fd888184625ca515a21ff5"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Exportar el objeto aplicación.
const autentificacion = getAuth(app);
// Exportar el objeto aplicación.
export { app, autentificacion };