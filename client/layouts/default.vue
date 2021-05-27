<template>
  <div class="app">
    <Navbar />
    <Nuxt />
  </div>
</template>

<script>
import Navbar from "../components/Navbar"

export default {
  components: {
    Navbar,
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

html {
  font-family: Roboto, sans-serif;
  overflow-x: hidden;
}

a {
  text-decoration: none;
  color: #000;
}

h1 {
  font-size: 3rem;
  margin-bottom: 2rem;
}

.body {
  padding: 1rem 2rem;
  width: 100%;
}

.app {
  display: flex;
  position: relative;
  width: 100vw;
}

.btn {
  background-color: rgb(216, 216, 216);
  padding: 1rem;
  margin: 0.5rem;
  cursor: pointer;
  transition: 0.2s;
}

.btn:hover {
  background-color: rgb(189, 189, 189);
}
</style>
