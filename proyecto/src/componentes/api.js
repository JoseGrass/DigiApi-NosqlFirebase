import  mostrarLista  from './lista.js'; // Importa solo lo necesario

// Función para obtener datos de la API
async function conexionLista() {
  const res = await fetch('https://digimon-api.vercel.app/api/digimon');
  const data = await res.json();
  return data;
}

// Función principal exportada por defecto
export default async function General() {
  const app = document.getElementById("app"); // ← asegúrate de definir esto
  app.innerHTML = ""; 

  const infoDigimones = await conexionLista();
  mostrarLista(infoDigimones); // Usa la función importada
}