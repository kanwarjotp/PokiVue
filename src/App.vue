<script setup>
import FooterComp from './components/FooterComp.vue';
import NavBar from './components/NavBar.vue';
</script>

<template>
  <NavBar />
  <main>
    <router-view></router-view>
  </main>
  <FooterComp />
</template>

<style scoped>
main {
  height: 100vh;
}
</style>
