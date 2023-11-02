const apiURL = "https://rickandmortyapi.com/api/character/";

async function buscarDetalhesPersonagem() {
    const urlParams = new URLSearchParams(window.location.search);
    const characterId = urlParams.get("id");

    try {
        const response = await fetch(`${apiURL}${characterId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const personagem = await response.json();

        const personagemContainer = document.getElementById("personagem");
        if (personagemContainer) {
            personagemContainer.innerHTML = `
                <h1><strong>Name:</strong> ${personagem.name}</h1>
                <h3>${personagem.location.name}</h3>
                <img src="${personagem.image}" alt="">
                <section class="detalhesPersonagem">
                    <p><strong>Status:</strong> ${personagem.status}</p>
                    <p><strong>Specie:</strong> ${personagem.species}</p>
                    <p><strong>Gender:</strong> ${personagem.gender}</p>
                    <p><strong>Episodes that appeared:</strong> ${personagem.episode.length} episodes</p>
                </section>
            `;
        }
    } catch (error) {
        console.error(error);
    }
}

window.onload = buscarDetalhesPersonagem;