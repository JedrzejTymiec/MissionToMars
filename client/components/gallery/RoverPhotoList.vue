<template>
  <div>
    <Spinner v-if="loading" />
    <div v-else class="gallery-container">
      <div v-if="this.photos.length > 0" class="gallery-header">
        <h2>
          Sol: {{ this.sol }}
          <span v-if="!loading">- earth date: {{ date }}</span>
        </h2>
      </div>
      <div v-if="photos.length > 0" class="photos-container">
        <Photo
          :key="pic._id"
          v-for="pic in photos"
          :photo="pic"
          :date="getEarthDate"
        />
      </div>
      <div v-else class="no-photos"><h1>No photos fouond</h1></div>
    </div>
  </div>
</template>

<script>
import Photo from './Photo'
import Spinner from '../layout/Spinner'
import axios from 'axios'

export default {
  name: 'PhotoList',
  components: {
    Photo,
    Spinner,
  },
  data() {
    return {
      defaultSol: this.rover === 'Curiosity' ? 0 : 1,
      sol: null,
      date: '',
    }
  },
  props: {
    rover: String,
  },
  computed: {
    photos() {
      return this.$store.state.photos.list
    },
    loading() {
      return this.$store.state.photos.loading
    },
  },
  methods: {
    async fetchPhotos(sol) {
      const res = await axios.get(`/api/photos/100/${this.rover}/${sol}`)
      this.$store.commit('photos/getPhotos', res.data)
      this.sol = sol
    },
    getEarthDate() {
      this.date = this.photos[0].earth_date
      this.sol = this.photos[0].sol
    },
  },
  created() {
    if (process.browser) {
      this.sol = localStorage.getItem('sol')
    }
    this.$store.commit('photos/clearPhotos')

    this.sol >= 1
      ? this.fetchPhotos(this.sol)
      : this.fetchPhotos(this.defaultSol)
    this.sol === 0 && this.rover === 'Curiosity' && this.fetchPhotos(this.sol)
  },
}
</script>

<style>
.photos-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}

.no-photos {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}
</style>