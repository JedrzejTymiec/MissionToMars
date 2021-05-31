<template>
  <div class="search-bar">
    <form @submit="onSubmit($event)" class="form">
      <input
        v-if="this.$route.name !== 'gallery-all'"
        class="input"
        v-model="sol"
        type="number"
        placeholder="Sol"
        :min="rover === 'Curiosity' ? '0' : '1'"
        :max="rover === 'Opportunity' ? '5111' : 'Spirit' ? '2208' : ''"
      />
      <div class="form-group">
        <input
          class="input"
          v-model="camera"
          type="text"
          placeholder="Cameras by comma"
        />
        <small
          :class="
            this.$route.name === 'gallery-all' ? 'all warn' : 'rover warn'
          "
          v-if="alert"
          >{{ errorMsg }}
        </small>
      </div>
      <button class="btn">Search!</button>
    </form>
    <div v-if="this.$route.name !== 'gallery-all'" class="nav-buttons">
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
      errorMsg: '',
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
      if (this.$route.name !== 'gallery-all') {
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
          this.errorMsg = 'Type sol or camera you wanna search for!'

          setTimeout(() => (this.alert = false), 2000)
        }
      } else {
        if (this.camera.length > 0) {
          let arr = this.camera.split(',')
          let cameraArr = arr.map((cam) => cam.trim().toUpperCase())
          let queryString = cameraArr.join('/')
          this.$store.commit('photos/clearPhotos')
          this.getAllByCam(queryString)
        } else {
          this.alert = true
          this.errorMsg = 'Please type cameras you wanna filter by!'
          setTimeout(() => (this.alert = false), 2000)
        }
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
    async getAllByCam(cam) {
      const res = await axios.get(`/api/photos/camera/a/1/${cam}`)
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

.form .btn,
.nav-buttons .btn {
  padding: 0.5rem;
  margin: 0;
}

.nav-buttons {
  display: flex;
  flex-direction: row-reverse;
  padding: 0.5rem;
}

.nav-buttons .btn {
  width: 100px;
  margin-right: 0.5rem;
}

.form-group {
  position: relative;
}

.warn {
  color: red;
  position: absolute;
  bottom: -1rem;

  width: 300px;
}

.rover {
  right: 0;
}

.all {
  left: 0;
}
</style>