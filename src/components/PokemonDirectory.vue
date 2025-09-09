<script setup>
import { ref } from 'vue';
import PokeCards from './PokeCards.vue';

  const POKE_URL = "https://pokeapi.co/api/v2/pokemon/"

  // pokemons global variable
  var pokemons = ref([])
  // noPokemons
  const noPokemons = ref(10)

  async function getPokemon( n = 10 ) {
      try {
          for (let i = 1; i <= n; i++) {
              console.log("sending a request")
              var response = await fetch(POKE_URL+(i.toString()))

              if (!response.ok) {
                  throw new Error("Could not fetch resource");
              }

              const data = await response.json()
              console.log(data)
              // pushing to the list as the pokemons starts being recievd
              pokemons.value.push(parsePokemonData(data))
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
          console.log(error)
          pokemonImage = pokemonObj.sprites.front_default
      }

      // TODO: get three important points except the demographic values
      let cries = pokemonObj.cries
      // set src to latest, or legacy as fallback
      if (cries.latest == "") {
        cries = cries.legacy
      } else {
        cries = cries.latest
      }
      const abilities = pokemonObj.abilities

      const pokemonData = {
          name: name,
          height: height,
          experience: experience,
          species: species.name,
          pokemonImage: pokemonImage,
          cries: cries,
          abilities: abilities[0].ability
      }

      return pokemonData
  }
</script>

<template>
  <div>
    <div class=" d-flex justify-content-center flex-column">
      <div class="page-heading text-center p-2">
        <span class="h1"> PokeVue </span>
        <p>A fun way to explore the Pokemon world</p>
      </div>

      <div class="d-flex justify-content-center input-group">
          <button @click="getPokemon(noPokemons)" id="gotta-catch-em" class="btn btn-success">Get Pokemons</button>
          <input type="text" id="noPokemons" class="form-control" placeholder="10" v-model="noPokemons" >
      </div>
    </div>

    <div id="poke-grid" class="d-flex flex-wrap justify-content-center mt-5">
    </div>
  </div>

  <div class=" d-flex justify-content-center flex-wrap">
    <PokeCards
    class="m-3"
    v-for="pokemon in pokemons"
    :key="pokemon.name"
    :name="pokemon.name"
    :abilities="pokemon.abilities"
    :cries="pokemon.cries"
    :experience="pokemon.experience"
    :height="pokemon.height"
    :pokemonImage="pokemon.pokemonImage"
    :species="pokemon.species"
    />
  </div>

</template>


<style scoped>
#noPokemons {
  max-width:fit-content
}

</style>
