<template>
  <div class="header">
    <div class="nav-container">
      <nuxt-link to="/rovers"
        ><button class="btn">Mars gallery</button></nuxt-link
      >
      <nuxt-link to="/apod"
        ><button class="btn">Astrological picture of the day</button></nuxt-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
}
</script>

<style scoped>
.nav-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-container .btn {
  width: 250px;
  height: 100px;
  margin: 0 2rem;
  font-size: 1.5rem;
}
</style>