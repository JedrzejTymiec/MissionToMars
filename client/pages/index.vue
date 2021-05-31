<template>
  <div class="body">
    <div class="page-title">
      <h1>Mission to mars!</h1>
      <h2>Welcome aboard</h2>
    </div>
    <h2 class="header">Choose your destiny!</h2>
    <Navbar />
  </div>
</template>

<script>
import Navbar from '../components/layout/Navbar'

export default {
  components: {
    Navbar,
  },
}
</script>

<style scoped>
.page-title h1 {
  margin-bottom: 1rem;
}

.page-title h2 {
  font-size: 2rem;
}

.header {
  text-align: center;
  margin-top: 4rem;
}
</style>
