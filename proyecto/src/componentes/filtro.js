let digimonesFiltrables = [];

async function mostrarFiltro() {
  app.innerHTML = `
    <section class="buscador-section">
      <h2>Filtrar Digimon por Nivel</h2>
      <select id="selectNivel" class="select-filtro">
        <option value="">-- Selecciona un nivel --</option>
        <option value="Fresh">Fresh</option>
        <option value="In Training">In Training</option>
        <option value="Rookie">Rookie</option>
        <option value="Champion">Champion</option>
        <option value="Ultimate">Ultimate</option>
        <option value="Mega">Mega</option>
        <option value="Armor">Armor</option>
      </select>
      <div id="resultadoFiltro" class="resultado-busqueda"></div>
    </section>
  `;

  // Cargar datos solo si no están cargados aún
  if (digimonesFiltrables.length === 0) {
    const respuesta = await fetch('https://digimon-api.vercel.app/api/digimon');
    digimonesFiltrables = await respuesta.json();
  }

  const selectNivel = document.getElementById('selectNivel');
  selectNivel.addEventListener('change', filtrarPorNivel);
}

function filtrarPorNivel() {
  const nivelSeleccionado = document.getElementById('selectNivel').value;
  const resultado = document.getElementById('resultadoFiltro');
  resultado.innerHTML = '';

  if (!nivelSeleccionado) {
    resultado.innerHTML = `<p style="color: var(--primary-color); font-size: 1.6rem;">Selecciona un nivel para ver los Digimon.</p>`;
    return;
  }

  const filtrados = digimonesFiltrables.filter(d => d.level === nivelSeleccionado);

  if (filtrados.length === 0) {
    resultado.innerHTML = `<p style="color: var(--primary-color); font-size: 1.6rem;">No hay Digimon en este nivel.</p>`;
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
    resultado.appendChild(card);
  });
}
