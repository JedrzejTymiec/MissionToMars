<template>
  <div class="body">
    <Spinner v-if="loading" />
    <div v-else>
      <PageHeader title="All Maritian Photos" backLink="/gallery/all" />
      <div class="photo-container">
        <img :src="photo.img_src" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Spinner from '../../../../components/layout/Spinner'
import PageHeader from '../../../../components/layout/PageHeader'

export default {
  name: 'AllSinglePhoto',
  components: {
    Spinner,
    PageHeader,
  },
  computed: {
    photo() {
      return this.$store.state.photos.photo
    },
    loading() {
      return this.$store.state.photos.photoLoad
    },
  },
  methods: {
    async getPhoto() {
      const res = await axios.get(`/api/photos/photo/${this.$route.params.id}`)
      this.$store.commit('photos/getPhoto', res.data)
    },
  },
  created() {
    this.$store.commit('photos/clearPhoto')
    this.getPhoto()
  },
}
</script>

<style>
.photo-container {
  min-height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  max-width: 70vw;
}
</style>