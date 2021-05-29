<template>
  <div class="body">
    <PageHeader
      :title="`${
        this.$route.params.rover.charAt(0).toUpperCase() +
        this.$route.params.rover.slice(1)
      } gallery`"
      backLink="/rovers"
    />
    <Spinner v-if="loading" />
    <div v-else class="gallery-container">
      <div class="gallery-header">
        <h2>
          Sol: {{ this.sol }}
          <span>- earth date: {{ this.photos[0].earth_date }}</span>
        </h2>
      </div>
      <div class="photos-container">
        <Photo :key="pic._id" v-for="pic in photos" :photo="pic" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Spinner from '../../components/layout/Spinner'
import PageHeader from '../../components/layout/PageHeader'
import Photo from '../../components/gallery/Photo'

export default {
  name: 'RoverGallery',
  components: {
    Spinner,
    PageHeader,
    Photo,
  },
  data() {
    return {
      sol: null,
    }
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
    async getPhotos() {
      this.$store.commit('photos/clearPhotos')
      this.$route.params.rover === 'curiosity'
        ? (this.sol = 3131)
        : (this.sol = 1)
      const res = await axios.get(
        `/api/photos/100/${
          this.$route.params.rover.charAt(0).toUpperCase() +
          this.$route.params.rover.slice(1)
        }/${this.sol}`
      )
      this.$store.commit('photos/getPhotos', res.data)
    },
  },
  created() {
    this.getPhotos()
  },
}
</script>

<style>
h2 span {
  font-weight: 400;
}

.photos-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}

.photo-list {
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
}
</style>