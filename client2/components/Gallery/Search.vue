<template>
  <div class="search-bar">
    <form @submit="onSubmit($event)" class="form">
      <div class="form-group">
        <input class="input" v-model="sol" type="number" placeholder="Sol" />
        <small class="warning" v-if="alert">Type correct sol number</small>
      </div>
      <input
        class="input"
        v-model="camera"
        type="text"
        placeholder="Cameras by comma"
      />
      <button class="btn">Search!</button>
    </form>
    <div class="nav-buttons">
      <button class="btn">Next sol</button>
      <button class="btn">Previous sol</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Search',
  data() {
    return {
      sol: null,
      camera: [],
      alert: false,
    }
  },
  props: {
    rover: String,
    setSol: Function,
    getPhotos: Function,
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault()
      if (this.sol !== null && this.sol >= 0) {
        this.$store.commit('photos/clearPhotos')
        console.log(`/api/photos/100/${this.rover}/${this.sol}`)
        const res = await axios.get(`/api/photos/100/${this.rover}/${this.sol}`)
        console.log(res)
        this.$store.commit('photos/getPhotos', res.data)
        this.sol = null
      } else {
        this.alert = true
        setTimeout(() => (this.alert = false), 2000)
      }
    },
  },
}
</script>

<style>
.search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row-reverse;
}

.form {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.input {
  padding: 0.5rem;
  margin-right: 0.5rem;
}

.btn {
  padding: 0.5rem;
  margin: 0;
}

.nav-buttons {
  display: flex;
  padding: 0.5rem;
}

.nav-buttons .btn {
  width: 100px;
  margin-right: 0.5rem;
}

.form-group {
  position: relative;
}

.warning {
  color: red;
  position: absolute;
  bottom: -1rem;
  left: 0;
}
</style>