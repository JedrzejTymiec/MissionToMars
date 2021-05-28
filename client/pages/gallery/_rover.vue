<template>
  <div class="body">
    <h1>Maritian rovers photo gallery</h1>
    <div class="container">
      <Title
        :rover="this.rover"
        :currentSol="this.currentSol"
        :currentDate="this.currentDate"
        :nextSol="nextSol"
        :prevSol="prevSol"
        :maxSolCurio="this.manifest && this.manifest.max_sol"
        :setSol="setSol"
        :manifest="this.currentSolObj"
      />
      <Spinner v-if="loading" />
      <PhotosList :photos="this.photos" />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"
import Spinner from "../../components/Spinner"
import Title from "../../components/Title"
import PhotosList from "../../components/PhotosList"

export default {
  name: "Gallery",

  data() {
    return {
      rover:
        this.$route.params.rover.charAt(0).toUpperCase() +
        this.$route.params.rover.slice(1),
      currentSol: null,
      currentSolObj: {},
      currentDate: "",
    }
  },

  components: {
    Spinner,
    Title,
    PhotosList,
  },

  methods: {
    ...mapActions({
      getSpiritBySol: "pictures/getSpiritBySol",
      getOpportunityBySol: "pictures/getOpportunityBySol",
      getCuriosityBySol: "pictures/getCuriosityBySol",
      getManifests: "manifest/getManifests",
    }),
    setSol(sol) {
      sol === undefined
        ? (this.currentSol = this.$route.params.rover === "curiosity" ? 0 : 1)
        : (this.currentSol = sol)
      this.manifest && this.setDate(this.currentSol)
    },
    setDate(sol) {
      const element = this.manifest.photos.find(
        (element) => element.sol === sol
      )
      this.currentDate = element.earth_date
      this.currentSolObj = element
    },
    nextSol() {
      this.currentSol++
      this.setDate(this.currentSol)
      this.$store.commit("pictures/removePictures")
    },
    prevSol() {
      this.currentSol--
      this.setDate(this.currentSol)
      this.$store.commit("pictures/removePictures")
    },
  },

  computed: {
    photos() {
      return this.$store.state.pictures.photos
    },
    loading() {
      return this.$store.state.pictures.loading
    },
    called() {
      return this.$store.state.manifest.called
    },
    manLoading() {
      return this.$store.state.manifest.loading
    },
    manifest() {
      switch (this.rover) {
        case "Spirit":
          return this.$store.state.manifest.manifests[1]
        case "Opportunity":
          return this.$store.state.manifest.manifests[2]
        case "Curiosity":
          return this.$store.state.manifest.manifests[0]
      }
    },
  },

  created() {
    this.manLoading && !this.called && this.getManifests()
    this.$store.commit("pictures/removePictures")
    this.setSol()
    this.manifest && this.setDate(this.currentSol)
    switch (this.rover) {
      case "Spirit":
        this.getSpiritBySol(this.currentSol)
        break
      case "Opportunity":
        this.getOpportunityBySol(this.currentSol)
        break
      case "Curiosity":
        this.getCuriosityBySol(this.currentSol)
        break
    }
  },
}
</script>

<style scoped>
</style>