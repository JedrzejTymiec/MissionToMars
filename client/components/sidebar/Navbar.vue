<template>
  <div class="header">
    <div class="nav-container">
      <nuxt-link class="btn" to="/rovers">Mars gallery</nuxt-link>
      <nuxt-link class="btn" to="/">Astrological Picture of the day</nuxt-link>
    </div>
    <Weather />
  </div>
</template>

<script>
import Weather from "./Weather"

export default {
  name: "Navbar",
  components: {
    Weather,
  },
}
</script>

<style scoped>
.header {
  min-height: 100vh;
  background-color: #999;
  align-items: center;
  text-align: center;
}

.nav-container {
  margin-right: 1rem;
  max-width: 180px;
  margin: auto;
  border-bottom: 1px solid #fff;
}

a {
  display: block;
}
</style>