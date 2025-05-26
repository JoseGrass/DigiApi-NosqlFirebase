async function  conexionLista() {
    const res = await fetch('https://digimon-api.vercel.app/api/digimon')
    const data = await res.json()
    return data;
}

async function General() {
    app.innerHTML = "";
    const infoDigimones = await conexionLista();
    mostrarLista(infoDigimones)
}