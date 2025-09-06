<script setup>


  const POKE_URL = "https://pokeapi.co/api/v2/pokemon/"

  async function getPokemon( n = 10 ) {
      const pokemons = []
      try {
          for (let i = 1; i <= n; i++) {
              console.log("sending a request")
              var response = await fetch(POKE_URL+(i.toString()))

              if (!response.ok) {
                  throw new Error("Could not fetch resource");
              }

              const data = await response.json()
              console.log(data)
              pokemons.push(parsePokemonData(data))
          }
      } catch(error) {
          console.error(error);
      }

      console.log(pokemons)

      // add data to inner html
      pokemons.forEach((pokemon) => {addHTMLPokemon(pokemon)})

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
          console.log(error)
          pokemonImage = pokemonObj.sprites.front_default
      }

      // TODO: get three important points except the demographic values
      const cries = pokemonObj.cries
      const abilities = pokemonObj.abilities

      const pokemonData = {
          name: name,
          height: height,
          experience: experience,
          species: species.name,
          pokemonImage: pokemonImage,
          cries: cries,
          abilities: abilities
      }
      return pokemonData
  }

  // TODO: create a function to display the pokemon information - or just use Vue?
  function addHTMLPokemon(parsedPokemon) {
      const pokemonCard = `
          <div class="p-4">
          <h3>${parsedPokemon.name}</h3>
          <img src=${parsedPokemon.pokemonImage}>
          <audio controls>
              <source src=${parsedPokemon.cries.latest} type="audio/ogg">
          </audio>
          <ul>
              <li>Height: ${parsedPokemon.height}</li>
              <li>Experience: ${parsedPokemon.experience}</li>
              <li>Species: ${parsedPokemon.species}</li>
              <li>Ability: ${parsedPokemon.abilities[1].ability.name} <sub>(more verbose information to come soon)</sub></li>
          </ul>
          </div>`
      document.getElementById("poke-grid").innerHTML += pokemonCard
  }
</script>

<template>
  <div>
    <div class=" d-flex justify-content-center flex-column">
      <div class="page-heading text-center p-2">
        <span class="h1"> PokeVue </span>
        <p>A fun way to explore the Pokemon world</p>
      </div>

      <div class="align-self-center">
          <button @click="getPokemon()" id="gotta-catch-em" class="btn btn-success">Get Pokemons</button>
      </div>
    </div>

    <div id="poke-grid" class="d-flex flex-wrap justify-content-center mt-5">
    </div>
  </div>
</template>


<style scoped>

</style>
