<template>
  <form class="form" @submit="onSubmit($event)">
    <input
      class="search"
      type="number"
      placeholder="Sol"
      v-model="inputNr"
      :min="rover === 'Curiosity' ? '0' : '1'"
      :max="
        rover === 'Spirit'
          ? '2208'
          : rover === 'Opportunity'
          ? '5111'
          : maxSol.toString()
      "
    />
    <button class="btn" type="submit">Search!</button>
  </form>
</template>

<script>
import { mapActions } from "vuex"

export default {
  name: "Search",
  props: {
    maxSol: Number,
    rover: String,
    setSol: Function,
  },
  data() {
    return {
      inputNr: null,
    }
  },
  methods: {
    ...mapActions({
      getCuriosityBySol: "pictures/getCuriosityBySol",
      getSpiritBySol: "pictures/getSpiritBySol",
      getOpportunityBySol: "pictures/getOpportunityBySol",
    }),
    onSubmit(e) {
      e.preventDefault()
      switch (this.rover) {
        case "Spirit":
          this.getSpiritBySol(parseInt(this.inputNr))
          break
        case "Opportunity":
          this.getOpportunityBySol(parseInt(this.inputNr))
          break
        case "Curiosity":
          this.getCuriosityBySol(parseInt(this.inputNr))
          break
      }
      this.$store.commit("pictures/removePictures")
      this.setSol(parseInt(this.inputNr))

      this.inputNr = null
    },
  },
}
</script>

<style>
</style>