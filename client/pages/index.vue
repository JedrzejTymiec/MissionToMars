<template>
  <div class="body">
    <h1>Astrological Picture of the Day</h1>
    <Spinner v-if="loading" />
    <div v-else class="container">
      <div class="title">
        <h3>{{ apod.date }}</h3>
        <h3>{{ apod.title }}</h3>
      </div>
      <div class="apod-body">
        <div class="img-container">
          <img :src="apod.hdurl" :alt="apod.title" />
        </div>
        <p><span>Explanation:</span> {{ apod.explanation }}</p>
      </div>
      <!-- Prev Button -->
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"
import Spinner from "../components/Spinner"

export default {
  name: "APOD",
  components: {
    Spinner,
  },

  computed: {
    apod() {
      return this.$store.state.apod.apod
    },
    loading() {
      return this.$store.state.apod.loading
    },
  },

  methods: {
    ...mapActions({
      getLastApod: "apod/getLastApod",
      getManifests: "manifest/getManifests",
    }),
  },

  created() {
    this.getLastApod()
    this.getManifests()
    this.$store.commit("manifest/manifestCalled")
  },
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #ececec;
  padding: 1rem;
}

.title {
  margin-bottom: 1rem;
}

.title h3:first-child {
  font-weight: 400;
  font-size: 1rem;
}

.apod-body {
  margin: auto;
  display: flex;
}

.img-container {
  margin: auto;
}

.img-container img {
  width: 100%;
}

p {
  max-width: 50%;
  line-height: 1.5rem;
  padding: 0 1rem;
}

span {
  font-weight: bold;
  font-size: 1.5rem;
}
</style>