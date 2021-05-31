<template>
  <div>
    <Spinner v-if="loading" />
    <div v-else class="gallery-container">
      <div v-if="photos.length > 0" class="photos-container">
        <Photo :key="pic._id" v-for="pic in photos" :photo="pic" />
      </div>
      <div class="not-found" v-else><h1>No photos found!</h1></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Photo from '../../components/gallery/Photo'
import Spinner from '../../components/layout/Spinner'

export default {
  name: 'AllPhotoList',
  components: {
    Photo,
    Spinner,
  },
  props: {
    currentPage: String,
  },
  watch: {
    currentPage: function (newProp) {
      this.getPhotosPage(newProp)
    },
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
    async getPhotosPage(page) {
      const res = await axios.get(`/api/photos/page/${page}`)
      this.$store.commit('photos/getPhotos', res.data)
    },
  },
  created() {
    this.getPhotosPage(this.currentPage)
  },
}
</script>

<style>
.photos-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}

.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}
</style>