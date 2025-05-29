
import { auth } from '../firebaseConfig.js';
import { getAuth, onAuthStateChanged } from "firebase/auth";


export default function mostrarLista(digimones, esFavorito = false) {
  const app = document.getElementById("app");

  // Verificar si el usuario está autenticado
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      app.innerHTML = "<p>Debes iniciar sesión para ver la lista de Digimon.</p>";
      return;
    }

    // Mostrar los Digimon si el usuario está logueado
    app.innerHTML = ""; // Limpiar antes de mostrar

    digimones.forEach(digimon => {
      const card = document.createElement("div");
      card.classList.add("digimon-card");

      const boton = esFavorito
        ? `<button onclick='eliminarFavorito("${digimon.name}")' class="digimon-favorito">❌</button>`
        : `<button onclick='agregarAFavoritos(${JSON.stringify(digimon)})' class="digimon-favorito">❤️</button>`;

      card.innerHTML = `
        <h2 class="digimon-name">${digimon.name}</h2> 
        <img class="digimon-img" src="${digimon.img}" alt="${digimon.name}">
        <p class="digimon-level">Nivel: ${digimon.level}</p>
        ${boton}
      `;

      app.appendChild(card);
    });
  });
}

window.mostrarLista = mostrarLista;
