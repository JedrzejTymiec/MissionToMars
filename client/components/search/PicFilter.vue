<template>
  <form class="form" @sumit="onSubmit($event)">
    <select v-model="camera">
      <option value="FHAZ">Front Hazard Avoidance Camera</option>
      <option value="RHAZ">Rear Hazard Avoidance Camera</option>
      <option value="NAVCAM">Navigation Camera</option>
      <option v-if="rover === 'Curiosity'" value="MAST">Mast Camera</option>
      <option v-if="rover === 'Curiosity'" value="CHEMCAM">
        Chemistry and Camera Complex
      </option>
      <option v-if="rover === 'Curiosity'" value="MAHLI">
        Mars Hand Lens Imager
      </option>
      <option v-if="rover === 'Curiosity'" value="MARDI">
        Mars Descent Imager
      </option>
      <option v-if="rover !== 'Curiosity'" value="PANCAM">
        Panoramic Camera
      </option>
      <option v-if="rover !== 'Curiosity'" value="MINITES">
        Miniature Thermal Emission Spectrometer (Mini-TES)
      </option>
    </select>
    <button class="btn" type="submit">Filter!</button>
  </form>
</template>

<script>
import { mapActions } from "vuex"

export default {
  name: "PicFilter",
  props: {
    rover: String,
    sol: Number,
  },
  data() {
    return {
      camera: "",
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      switch (this.rover) {
        case "Spirit":
          console.log("switch filter")
          this.spiritFilter({ sol: this.sol, rover: this.rover })
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
    ...mapActions({
      getCuriosityBySol: "pictures/getCuriosityBySol",
      spiritFilter: "pictures/spiritFilter",
      getOpportunityBySol: "pictures/getOpportunityBySol",
    }),
  },
}
</script>

<style>
</style>