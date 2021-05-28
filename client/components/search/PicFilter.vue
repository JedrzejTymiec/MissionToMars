<template>
  <div>
    <select v-model="camera">
      <option v-if="cameras.find((cam) => cam === 'FHAZ')" value="FHAZ">
        Front Hazard Avoidance Camera
      </option>
      <option v-if="cameras.find((cam) => cam === 'RHAZ')" value="RHAZ">
        Rear Hazard Avoidance Camera
      </option>
      <option v-if="cameras.find((cam) => cam === 'NAVCAM')" value="NAVCAM">
        Navigation Camera
      </option>
      <option v-if="cameras.find((cam) => cam === 'MAST')" value="MAST">
        Mast Camera
      </option>
      <option v-if="cameras.find((cam) => cam === 'CHEMCAM')" value="CHEMCAM">
        Chemistry and Camera Complex
      </option>
      <option v-if="cameras.find((cam) => cam === 'MAHLI')" value="MAHLI">
        Mars Hand Lens Imager
      </option>
      <option v-if="cameras.find((cam) => cam === 'MARDI')" value="MARDI">
        Mars Descent Imager
      </option>
      <option v-if="cameras.find((cam) => cam === 'PANCAM')" value="PANCAM">
        Panoramic Camera
      </option>
      <option v-if="cameras.find((cam) => cam === 'MINITES')" value="MINITES">
        Miniature Thermal Emission Spectrometer (Mini-TES)
      </option>
    </select>
    <button class="btn" type="submit" @click="onClick">Filter!</button>
  </div>
</template>

<script>
import { mapActions } from "vuex"
import axios from "axios"

export default {
  name: "PicFilter",
  props: {
    rover: String,
    sol: Number,
    cameras: Array,
  },
  data() {
    return {
      camera: "",
    }
  },
  methods: {
    async onClick() {
      switch (this.rover) {
        case "Spirit":
          let res = await axios.get(
            `/api/photos/sol/spirit/${this.sol}/${this.camera}`
          )
          this.$store.commit("pictures/setPictures", res.data.photos)
          break
        case "Opportunity":
          res = await axios.get(
            `/api/photos/sol/0pportunity/${this.sol}/${this.camera}`
          )
          this.$store.commit("pictures/setPictures", res.data.photos)
          break
        case "Curiosity":
          res = await axios.get(
            `/api/photos/sol/curiosity/${this.sol}/${this.camera}`
          )
          this.$store.commit("pictures/setPictures", res.data.photos)
          break
      }
      // this.$store.commit("pictures/removePictures")
      // this.setSol(parseInt(this.inputNr))

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