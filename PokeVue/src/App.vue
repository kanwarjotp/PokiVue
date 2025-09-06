<script setup>
import NavBar from './components/NavBar.vue';
import 'bootstrap/dist/css/bootstrap.min.css'

</script>

<template>
  <NavBar />
  <main>
    <router-view></router-view>
  </main>
</template>

<style scoped></style>
