<script setup>
// a pokemon object
const props = defineProps(
  {
    name: String,
    height: Number,
    experience: Number,
    species: String,
    pokemonImage: String,
    cries: String,
    abilities: String
  }
)

console.log(props.cries)
console.log("hell")

</script>


<template>
  <div class="card" style="width: 18rem;">
    <img :src="pokemonImage" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">{{ name }}</h5>
      <div class="card-text">
        <ul>
          <li>{{ height / 10  * 3.28 }}  ft</li>
          <li>{{ species }}</li>
          <li>{{ experience }} ex</li>
          <!-- <li>{{ abilities[0] }}</li> -->
        </ul>
      </div>
      <button class="btn btn-primary" v-on:click="playSound(name)">Play Sound</button>
      <audio :id="name" class="d-none" :src="cries"></audio>
    </div>
  </div>
</template>

<script>
  function playSound(id) {
    const sound = document.getElementById(id);
    sound.play()
  }
</script>
