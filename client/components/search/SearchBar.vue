<template>
  <div class="navbar-container">
    <div>
      <button class="btn" v-if="sol > 1" @click="onPrev">Prev sol</button>
      <button class="btn" @click="onNext">Next sol</button>
    </div>
    <div class="search-container">
      <Search
        :maxSol="maxSol"
        :rover="rover"
        :setSol="setSol"
        :setDate="setDate"
      />
      <PicFilter :sol="sol" :rover="rover" :cameras="cameras" />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"
import Search from "./Search"
import PicFilter from "./PicFilter"

export default {
  name: "SearchBar",
  props: {
    sol: Number,
    rover: String,
    nextSolNr: Function,
    prevSolNr: Function,
    maxSol: Number,
    setSol: Function,
    cameras: Array,
  },
  data() {
    return {
      date: false,
      searchSol: true,
      cam: false,
    }
  },
  components: {
    Search,
    PicFilter,
  },
  methods: {
    nextSol(currentSol, rover) {
      const sol = currentSol + 1
      switch (rover) {
        case "Curiosity":
          this.getCuriosity(sol)
          break
        case "Spirit":
          this.getSpirit(sol)
          break
        case "Opportunity":
          this.getOpportunity(sol)
      }
    },
    prevSol(currentSol, rover) {
      const sol = currentSol - 1
      switch (rover) {
        case "Curiosity":
          this.getCuriosity(sol)
          break
        case "Spirit":
          this.getSpirit(sol)
          break
        case "Opportunity":
          this.getOpportunity(sol)
      }
    },
    onNext() {
      this.nextSol(this.sol, this.rover)
      this.nextSolNr()
    },
    onPrev() {
      this.prevSol(this.sol, this.rover)
      this.prevSolNr()
    },
    ...mapActions({
      getCuriosity: "pictures/getCuriosityBySol",
      getSpirit: "pictures/getSpiritBySol",
      getOpportunity: "pictures/getOpportunityBySol",
    }),
  },
}
</script>

<style>
select,
input {
  padding: 0.5rem;
  font-size: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
}

.search-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  align-items: flex-end;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 900px;
}
</style>