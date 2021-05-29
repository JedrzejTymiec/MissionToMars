<template>
  <div class="app">
    <Weather />
    <Nuxt />
  </div>
</template>

<script>
import Weather from '../components/Weather'

export default {
  components: {
    Weather,
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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
}

.body {
  padding: 1rem 2rem;
  width: 100%;
}

.app {
  display: flex;
  position: relative;
  width: 100vw;
  background-color: #e0e0e0;
}

.btn {
  background-color: rgb(240, 240, 240);
  padding: 1rem;
  margin: 0.5rem;
  cursor: pointer;
  transition: 0.2s;
}

.btn:hover {
  background-color: rgb(189, 189, 189);
}
</style>
