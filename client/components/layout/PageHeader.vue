<template>
  <div class="header">
    <h1 class="page-title">{{ title }}</h1>
    <nuxt-link :to="backLink"><button class="btn">Go back</button></nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    title: String,
    backLink: String,
  },
}
</script>

<style scoped>
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.header .btn {
  padding: 0.5rem;
}

.btn {
  background-color: rgb(240, 240, 240);
}
</style>