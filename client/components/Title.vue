<template>
  <div class="title-container">
    <div class="title">
      <h1>
        {{ rover }}
      </h1>
      <h2>
        Sol - {{ currentSol }} <span>{{ currentDate }}</span>
      </h2>
    </div>
    <SearchBar
      :sol="currentSol"
      :rover="rover"
      :nextSolNr="this.nextSol"
      :prevSolNr="this.prevSol"
      :maxSol="maxSolCurio"
      :setSol="setSol"
    />
  </div>
</template>

<script>
import SearchBar from "./search/SearchBar"

export default {
  name: "Title",
  components: {
    SearchBar,
  },
  props: {
    rover: String,
    currentSol: Number,
    currentDate: String,
    nextSol: Function,
    prevSol: Function,
    maxSolCurio: Number,
    setSol: Function,
    setDate: Function,
  },
}
</script>

<style scoped>
span {
  font-weight: 400;
}

.title-container {
  display: flex;
  justify-content: space-between;
}
</style>