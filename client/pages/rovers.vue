<template>
  <div class="body">
    <PageHeader title="Rovers" backLink="/" />
    <Spinner v-if="loading" />
    <div v-else class="container">
      <Rover :key="rover._id" v-for="rover in rovers" :rover="rover" />
    </div>
    <nuxt-link to="/gallery/all"
      ><button class="btn big-btn">Show all photos</button></nuxt-link
    >
  </div>
</template>

<script>
import PageHeader from '../components/layout/PageHeader'
import Rover from '../components/layout/Rover'
import Spinner from '../components/layout/Spinner'
import axios from 'axios'

export default {
  name: 'Rovers',
  components: {
    PageHeader,
    Rover,
    Spinner,
  },
  computed: {
    rovers() {
      return this.$store.state.rovers.list
    },
    loading() {
      return this.$store.state.rovers.loading
    },
  },
  methods: {
    async getRovers() {
      const res = await axios.get(`/api/manifest`)
      this.$store.commit('rovers/getRovers', res.data)
    },
  },
  created() {
    this.getRovers()
  },
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
}

.big-btn {
  width: 100%;
  font-size: 1rem;
  margin: 0;
  padding: 0.5rem;
}
</style>