<template>
  <div class="search-bar">
    <form @submit="onSubmit($event)" class="form">
      <div class="form-group">
        <input
          class="input"
          v-model="sol"
          type="number"
          placeholder="Sol"
          :min="rover === 'Curiosity' ? '0' : '1'"
          :max="rover === 'Opportunity' ? '5111' : 'Spirit' ? '2208' : ''"
        />
        <small class="warning" v-if="alert"
          >Type sol or camera you want to search by
        </small>
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
      <button @click="nextSol" class="btn">Next sol</button>
      <button @click="prevSol" class="btn">Previous sol</button>
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
      camera: '',
      alert: false,
    }
  },
  props: {
    rover: String,
    setSol: Function,
    getPhotos: Function,
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      if (this.sol !== null || this.camera.length > 0) {
        const sol = this.sol
          ? this.sol
          : localStorage.sol != 'null'
          ? localStorage.sol
          : this.rover === 'Curiosity'
          ? 0
          : 1
        this.$store.commit('photos/clearPhotos')
        if (this.camera.length > 0) {
          let arr = this.camera.split(',')
          let cameraArr = arr.map((cam) => cam.trim().toUpperCase())
          let queryString = cameraArr.join('/')
          this.filterByCam(sol, queryString)
        } else {
          this.getPhotosBySol(sol)
        }
        localStorage.setItem('sol', sol)
        this.sol = null
      } else {
        this.alert = true
        setTimeout(() => (this.alert = false), 2000)
      }
    },
    async getPhotosBySol(sol) {
      await axios.get(`/api/photos/100/${this.rover}/${sol}`)
      const res = await axios.get(`/api/photos/100/${this.rover}/${sol}`)
      this.$store.commit('photos/getPhotos', res.data)
    },
    async filterByCam(sol, cam) {
      const res = await axios.get(
        `/api/photos/100/camera/${this.rover}/${sol}/${cam}`
      )
      this.$store.commit('photos/getPhotos', res.data)
    },
    nextSol() {
      let sol =
        localStorage.sol && localStorage.sol != 'null'
          ? localStorage.sol
          : this.rover === 'Curiosity'
          ? 0
          : 1
      sol = parseInt(sol) + 1
      this.$store.commit('photos/clearPhotos')
      this.getPhotosBySol(sol)
      localStorage.setItem('sol', sol)
    },
    prevSol() {
      let sol =
        localStorage.sol && localStorage.sol != 'null'
          ? localStorage.sol
          : this.rover === 'Curiosity'
          ? 0
          : 1
      sol = parseInt(sol) - 1
      this.$store.commit('photos/clearPhotos')
      this.getPhotosBySol(sol)
      localStorage.setItem('sol', sol)
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