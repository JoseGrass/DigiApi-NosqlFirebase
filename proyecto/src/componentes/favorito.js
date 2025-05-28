function agregarAFavoritos(digimon) {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  if (!favoritos.includes(digimon.name)) {
    favoritos.push(digimon.name);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    alert(`${digimon.name} fue agregado a favoritos`);
  } else {
    alert(`${digimon.name} ya está en favoritos`);
  }
}


function eliminarFavorito(nombre) {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  favoritos = favoritos.filter(fav => fav !== nombre);
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
  mostrarFavoritos();
}



let listaGlobal = []; // ← Guarda la lista completa

export default function mostrarFavoritos() {
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  // Filtra los que están en la lista original
  const digimonFavoritos = listaGlobal.filter(d => favoritos.includes(d.name));

  if (digimonFavoritos.length === 0) {
    document.getElementById("app").innerHTML = "<p>No hay favoritos aún 😢</p>";
    return;
  }

  mostrarLista(digimonFavoritos, true); // true para mostrar ❌
}

fetch("https://digimon-api.vercel.app/api/digimon")
  .then(res => res.json())
  .then(data => {
    listaGlobal = data;
    mostrarLista(listaGlobal);
  });

  window.mostrarFavoritos = mostrarFavoritos;