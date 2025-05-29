import mostrarLista from './lista.js';
import { auth } from '../firebaseConfig.js'; // para validar autenticación

// Función para obtener datos de la API
async function conexionLista() {
  const res = await fetch('https://digimon-api.vercel.app/api/digimon');
  const data = await res.json();
  return data;
}

// Función principal que solo se ejecuta si hay usuario autenticado
export default async function General() {
  if (!auth.currentUser) {
    console.warn("⚠️ Usuario no autenticado. General() no se ejecutará.");
    return;
  }

  const app = document.getElementById("app");
  app.innerHTML = "";

  try {
    const infoDigimones = await conexionLista();
    mostrarLista(infoDigimones);
  } catch (error) {
    app.innerHTML = `<p>Error al cargar los Digimon: ${error.message}</p>`;
  }
}
