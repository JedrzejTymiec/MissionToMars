<template>
  <div class="body">
    <Spinner v-if="loading" />
    <div v-else>
      <PageHeader
        :title="`${this.photo.rover} gallery`"
        :backLink="`/gallery/${this.photo.rover}`"
      />
      <div class="photo-container">
        <img :src="photo.img_src" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Spinner from '../../../components/layout/Spinner'
import PageHeader from '../../../components/layout/PageHeader'

export default {
  name: 'SinglePhoto',
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
    console.log(this.$route)
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
</style>