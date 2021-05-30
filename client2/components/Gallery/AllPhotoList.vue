<template>
  <div class="photos-container">
    <Photo :key="pic._id" v-for="pic in photos" :photo="pic" />
  </div>
</template>

<script>
import axios from 'axios'
import Photo from '../../components/gallery/Photo'

export default {
  name: 'AllPhotoList',
  components: {
    Photo,
  },
  data() {
    return {
      currentPage: 1,
    }
  },
  computed: {
    photos() {
      return this.$store.state.photos.list
    },
    loading() {
      return this.$store.state.photos.list
    },
  },
  methods: {
    async getPhotosPage(page) {
      const res = await axios.get(`/api/photos/page/${page}`)
      this.$store.commit('photos/getPhotos', res.data)
    },
  },
  created() {
    this.getPhotosPage(1)
  },
}
</script>

<style>
.photos-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}
</style>