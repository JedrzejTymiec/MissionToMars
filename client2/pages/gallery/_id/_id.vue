<template>
  <div>
    <p>XXX</p>
    <Spinner v-if="loading" />
    <img v-else :src="photo.img_src" />
  </div>
</template>

<script>
import axios from 'axios'
import Spinner from '../../../components/layout/Spinner'

export default {
  name: 'SinglePhoto',
  components: {
    Spinner,
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
    this.getPhoto()
    console.log(this.photo.img_src)
  },
}
</script>

<style>
</style>