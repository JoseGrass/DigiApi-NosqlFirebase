import { auth, db } from '../firebaseConfig.js';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function batallaDigimon() {
  fetch("https://digimon-api.vercel.app/api/digimon")
    .then(res => res.json())
    .then(data => {
      const digimon1 = data[Math.floor(Math.random() * data.length)];
      const digimon2 = data[Math.floor(Math.random() * data.length)];

      // Seleccionar aleatoriamente un ganador
      const ganador = Math.random() > 0.5 ? digimon1 : digimon2;

      const app = document.getElementById("app");
      app.innerHTML = `
        <div class="batalla">
          <h2>¡Batalla Digimon!</h2>
          <div class="batalla-digimones">
            <div>
              <h3>${digimon1.name}</h3>
              <img src="${digimon1.img}" alt="${digimon1.name}">
              <p>Nivel: ${digimon1.level}</p>
            </div>
            <p class="vs">⚔️ VS ⚔️</p>
            <div>
              <h3>${digimon2.name}</h3>
              <img src="${digimon2.img}" alt="${digimon2.name}">
              <p>Nivel: ${digimon2.level}</p>
            </div>
          </div>
          <h3 class="ganador">🏆 ¡Ganador: ${ganador.name}! 🏆</h3>
        </div>
      `;
    })
    .catch(err => {
      console.error("Error en batalla:", err);
    });
}