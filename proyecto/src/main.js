import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig.js';

import General from './componentes/api.js';
import batallaDigimon from './componentes/original.js';
import mostrarPerfil from './componentes/perfil.js';
import mostrarLogout from './componentes/logout.js';
import mostrarLogin from './componentes/login.js';
import mostrarRegistro from './componentes/registro.js';
import { agregarAFavoritos, eliminarFavorito } from './componentes/favorito.js';


import mostrarFiltro from './componentes/filtro.js';
import mostrarBuscador from './componentes/buscador.js';
import mostrarFavoritos from './componentes/favorito.js';
import mostrarDatos from './componentes/informacion.js';

function renderMenu(usuario) {
  const menu = document.getElementById("menu");
  menu.innerHTML = "";

  let botones = [];

  if (usuario) {
    botones = [
      { texto: "Inicio", fn: () => General() },
      { texto: "Filtrar", fn: () => mostrarFiltro() },
      { texto: "Buscar", fn: () => mostrarBuscador() },
      { texto: "Favoritos", fn: () => mostrarFavoritos() },
      { texto: "Perfil", fn: mostrarPerfil },
      { texto: "Logout", fn: mostrarLogout },
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
    btn.onclick = fn;
    menu.appendChild(btn);
  });
}

onAuthStateChanged(auth, (user) => {
  renderMenu(user);

  const app = document.getElementById("app");
  if (user) {
    General();
  } else {
    mostrarLogin();
  }
});