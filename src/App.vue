<script setup>
import FooterComp from './components/FooterComp.vue';
import NavBar from './components/NavBar.vue';
</script>

<template>
  <section class="d-flex flex-column min-vh-100">
    <NavBar />
    <main class="flex-fill">
      <router-view></router-view>
    </main>
    <FooterComp class="mt-autio" />
  </section>
</template>

<style scoped>
html, body, #app {
  height: 100%;
}
</style>
