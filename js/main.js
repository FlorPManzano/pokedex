const pokeList = document.querySelector("#pokeList")
const headerButtons = document.querySelectorAll(".btn-header")
let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 807; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => showPokemons(data))
}

function showPokemons(poke) {

    let pokeTypes = poke.types.map((type) => `<p class="${type.type.name} type">${type.type.name}</p>`)
    pokeTypes = pokeTypes.join('');

    let pokeId = poke.id.toString()
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId
    }

    let pokeStats = poke.stats.map((stat) => {
        return`
        <div class="other-stats">
            <h4 class="other-stats-name">${stat.stat.name}</h4>
            <p class="other-stats-value">${stat.base_stat}</p>
        </div>
        `
    })
    pokeStats = pokeStats.join('')


    const pokeCard = document.createElement("div")
    pokeCard.classList.add("pokemon")
    pokeCard.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-img">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="name-container">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-name">${poke.name}</h2>
            </div>
            <div class="pokemon-types">
                ${pokeTypes}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}kg</p>
            </div>
        </div>
        <div class="pokemon-other-stats">
                <h2>Stats</h2>
                <div class="other-stats-container">
                    ${pokeStats}
                </div>
        </div>
    `
    pokeList.append(pokeCard)
    
}

headerButtons.forEach(button => button.addEventListener("click", (event) => {
    const buttonId = event.currentTarget.id

    pokeList.innerHTML = ""

    for (let i = 1; i <= 807; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                if(buttonId === "show-all") {
                    showPokemons(data)
                } else {
                    const pokeTypes = data.types.map(type => type.type.name)
                    if (pokeTypes.some(type => type.includes(buttonId))) {
                        showPokemons(data)
                    }
                }

            })
    }
}))
