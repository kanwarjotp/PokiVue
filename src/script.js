const POKE_URL = "https://pokeapi.co/api/v2/pokemon/"

async function getPokemon( n = 1 ) {
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
            pokemons.push(parsePokemonData(data))
        }
    } catch(error) {
        console.error(error);
    }

    console.log(pokemons)
    
}

function parsePokemonData(pokemonObj) {
    const name = pokemonObj.name
    const height = pokemonObj.height
    const experience = pokemonObj.base_experience
    const species = pokemonObj.species
    
    // TODO: get pokemon image
    let pokemonImage = ""
    try{
        pokemonImage = pokemonObj.sprites.other.official_artwork.front_default 

    } catch (error) {
        pokemonImage = pokemonObj.sprites.front_default
    }

    // TODO: get three important points except the demographic values
    const cries = pokemonObj.cries
    const abilities = pokemonObj.abilities

    const pokemonData = {
        name: name,
        height: height,
        experience: experience,
        species: species,
        pokemonImage: pokemonImage,
        cries: cries,
        abilities: abilities
    }
    return pokemonData
}


// TODO: create a function to display the pokemon information - or just use Vue?

const getPokemonBtn = document.getElementById("gotta-catch-em")
// creating an event listener for clicks
getPokemonBtn.addEventListener('click', () => {getPokemon()})
