<template>
  <div class="body">
    <h1>Mars rovers photo gallery</h1>
    <div class="rovers-container">
      <Spinner v-if="loading" />
      <RoverDescription
        v-else
        :key="rover.name"
        v-for="rover in manifests"
        :rover="rover"
      />
    </div>
  </div>
</template>

<script>
import RoverDescription from "../components/RoverDescription"
import { mapActions } from "vuex"
import Spinner from "../components/Spinner"

export default {
  components: {
    RoverDescription,
    Spinner,
  },

  computed: {
    loading() {
      return this.$store.state.manifest.loading
    },
    manifests() {
      return this.$store.state.manifest.manifests
    },
    called() {
      return this.$store.state.manifest.called
    },
  },

  methods: {
    ...mapActions({
      getManifests: "manifest/getManifests",
    }),
  },

  created() {
    !this.called && this.getManifests()
  },
}
</script>

<style>
.rovers-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
