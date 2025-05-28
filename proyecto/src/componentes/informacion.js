function mostrarDatos(){
    const app = document.getElementById("app");
    app.innerHTML = ""; // Limpiar antes de mostrar

    const tarjetaInformacion = document.createElement("div");
    tarjetaInformacion.classList.add("informacion");

    tarjetaInformacion.innerHTML = `
        <div class="overlay"></div>
        <div class="contenido">
            <h2>DIGIMON API</h2>
            <h3>Jose Luis Grass Murillo</h3>
            <img class="contenido-img" src="https://s0.smartresize.com/wallpaper/533/654/HD-wallpaper-angemo-angemon-digimon-patamon.jpg" alt="digimon">
            <p class="caja-azul">API con información de 239 digimones</p>
            <a href="https://github.com/JoseGrass/DigimonApi" target="_blank">
                <p class="link">github.com/JoseGrass/DigimonApi</p>
            </a>
            <p>V 1.0.1</p>

        </div>
    `;

    app.appendChild(tarjetaInformacion);
}