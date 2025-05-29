import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebaseConfig.js';

import General from './componentes/api.js';
import mostrarPerfil from './componentes/perfil.js';
import mostrarLogout from './componentes/logout.js';
import mostrarLogin from './componentes/login.js';
import mostrarRegistro from './componentes/registro.js';
import mostrarFiltro from './componentes/filtro.js';
import mostrarBuscador from './componentes/buscador.js';
import mostrarFavoritos from './componentes/favorito.js';
import batallaDigimon from './componentes/original.js'; // asumo que existe
import mostrarDatos from './componentes/informacion.js'; // asumo que existe

function renderMenu(usuario) {
  const menu = document.getElementById("menu");
  menu.innerHTML = "";

  let botones = [];

  if (usuario) {
    botones = [
      { texto: "Inicio", fn: General },
      { texto: "Filtrar", fn: mostrarFiltro },
      { texto: "Buscar", fn: mostrarBuscador },
      { texto: "Favoritos", fn: mostrarFavoritos },
      { texto: "Perfil", fn: mostrarPerfil },
      { texto: "Logout", fn: () => {
          signOut(auth).then(() => {
            mostrarLogin();
          });
        }
      },
    ];
  } else {
    botones = [
      { texto: "Login", fn: mostrarLogin },
      { texto: "Registro", fn: mostrarRegistro },
    ];
  }

  botones.forEach(({ texto, fn }) => {
    const btn = document.createElement("button");
    btn.textContent = texto;
    btn.addEventListener("click", () => {
      fn();
      // Ocultar menú en móvil al seleccionar opción
      document.getElementById('navMenu').classList.remove('active');
    });
    menu.appendChild(btn);
  });
}

// Menu toggle
const menuButton = document.getElementById("menuButton");
menuButton.addEventListener("click", () => {
  const navMenu = document.getElementById('navMenu');
  navMenu.classList.toggle('active');
});


// Botones del menú inferior
document.getElementById("btnInicio").addEventListener("click", General);
document.getElementById("btnFavoritos").addEventListener("click", mostrarFavoritos);
document.getElementById("btnBatalla").addEventListener("click", batallaDigimon);
document.getElementById("btnInfo").addEventListener("click", mostrarDatos);
document.getElementById("btnPerfil").addEventListener("click", mostrarPerfil);

document.getElementById("btnLogout").addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      mostrarLogin();
    })
    .catch((error) => {
      console.error("Error al cerrar sesión:", error);
    });
});
// Detectar estado de autenticación
onAuthStateChanged(auth, (user) => {
  renderMenu(user);

  const menuInferior = document.getElementById("menuInferior");

  if (user) {
    menuInferior.style.display = "flex"; // o "block", según tu diseño
    General();
  } else {
    menuInferior.style.display = "none";
    mostrarLogin();
  }
});
