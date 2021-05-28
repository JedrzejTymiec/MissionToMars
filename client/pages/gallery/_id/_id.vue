<template>
  <div class="body">
    <h1>Maritian rovers photo gallery</h1>
    <button @click="nextPhoto(index)" class="btn">Next photo</button>
    <div class="container">
      <div><img :src="this.photoToDisplay" /></div>
    </div>
    <button @click="prevPhoto(index)" class="btn">Prev photo</button>
  </div>
</template>

<script>
export default {
  name: "SinglePhoto",
  data() {
    return {
      photoToDisplay: "",
      index: null,
      photoID: null,
    }
  },
  computed: {
    photos() {
      return this.$store.state.pictures.photos
    },
  },
  methods: {
    findPhotoById(id) {
      const photo = this.photos.find((photo) => photo.id === parseInt(id))
      const index = this.photos.findIndex((photo) => photo.id === parseInt(id))
      this.photoToDisplay = photo.img_src
      this.index = index
    },
    nextPhoto(index) {
      this.photoToDisplay = this.photos[index + 1].img_src
      this.index = index + 1
    },
    prevPhoto(index) {
      this.photoToDisplay = this.photos[index - 1].img_src
      this.index = index - 1
    },
  },
  created() {
    this.findPhotoById(this.$route.params.id)
  },
}
</script>

<style scoped>
.container {
  margin-left: 5rem;
}
</style>