const apiURL = "https://rickandmortyapi.com/api/character";
let currentPage = 1;


async function buscarPersonagem(page) {
    try {
        const response = await fetch(`${apiURL}?page=${page}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data.results)
        return data.results;

    } catch (error) {
        console.error(error);
        return null;
    }

}

async function exibirPersonagens(personagens) {
    const gridContainer = document.querySelector(".grid-container");
    if (!gridContainer) {
        return;
    }

    gridContainer.innerHTML = "";

    personagens.forEach((personagem, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        
        card.innerHTML = `
            <img src="${personagem.image}" alt="">
            <p><strong>Name:</strong> ${personagem.name}</p>
            <p><strong>Status:</strong> ${personagem.status}</p>
            <p><strong>Gender:</strong> ${personagem.gender}</p>
            <button class="botao"><a href="personagem.html?id=${personagem.id}">Detalhes</a></button>
        `;

        gridContainer.appendChild(card);
    });
}

function criarPaginacao() {
    const pageNumbersContainer = document.getElementById("pageNumbers");
    if (!pageNumbersContainer) {
        return;
    }

    pageNumbersContainer.innerHTML = "";

    for (let i = 1; i <= 34; i++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = i;
        pageButton.addEventListener("click", () => {
            currentPage = i;
            buscar();
        });
        pageNumbersContainer.appendChild(pageButton);
    }
}

async function buscar() {
    const personagens = await buscarPersonagem(currentPage);
    exibirPersonagens(personagens);
    criarPaginacao();
}

window.onload = buscar;