const POKE_URL = "https://pokeapi.co/api/v2/pokemon/"

async function getPokemon( n = 5 ) {
    const pokemons = []
    try {
        for (let i = 1; i <= n; i++) {
            console.log("sending a request")
            var response = await fetch(POKE_URL+(i.toString()))

            if (!response.ok) {
                throw new error("Could not fetch resource");
            }

            const data = await response.json()
            console.log(data)
            pokemons.push(data)
        }
    } catch(error) {
        console.error(error);
    }

    // console.log(pokemons)
}

const getPokemonBtn = document.getElementById("gotta-catch-em")
// creating an event listener for clicks
getPokemonBtn.addEventListener('click', () => {getPokemon()})
