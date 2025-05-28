import  mostrarLista  from './lista.js'; 

let digimonesData = [];

export default async function mostrarBuscador() {
  app.innerHTML = `
    <section class="buscador-section">
      <h2>Buscar Digimon</h2>
      <input type="text" id="inputBuscar" placeholder="Escribe el nombre de un Digimon...">
      <div id="resultadoBusqueda" class="resultado-busqueda"></div>
    </section>
  `;

  // Cargar los digimones solo una vez
  if (digimonesData.length === 0) {
    digimonesData = await conexionLista();
  }

  const inputBuscar = document.getElementById('inputBuscar');
  const resultadoBusqueda = document.getElementById('resultadoBusqueda');

  inputBuscar.addEventListener('input', function() {
    const texto = inputBuscar.value.toLowerCase();
    resultadoBusqueda.innerHTML = '';

    if (texto.length === 0) {
      return; // Si no escribe nada, no muestra nada
    }

    const filtrados = digimonesData.filter(digimon =>
      digimon.name.toLowerCase().includes(texto)
    );

    if (filtrados.length === 0) {
      resultadoBusqueda.innerHTML = `<p style="color: var(--primary-color); font-size: 1.6rem;">No se encontró ningún Digimon.</p>`;
      return;
    }

    filtrados.forEach(digimon => {
      const card = document.createElement('div');
      card.classList.add('digimon-card');
      card.innerHTML = `
        <h2 class="digimon-name">${digimon.name}</h2>
        <img class="digimon-img" src="${digimon.img}" alt="${digimon.name}">
        <p class="digimon-level">Nivel: ${digimon.level}</p>
        <button onclick="Favoritos()" class="digimon-favorito">❤️</button>
      `;
      resultadoBusqueda.appendChild(card);
    });
  });
}
window.mostrarBuscador = mostrarBuscador;