<template>
  <div class="body">
    <div>
      <h1>Maritian rovers photo gallery</h1>
      <nuxt-link :to="`/gallery/${this.currentPhoto.rover.name}/`"
        ><button class="btn">Back to gallery</button></nuxt-link
      >
    </div>
    <div>
      <button
        v-if="this.photos.length > index + 1"
        @click="nextPhoto(index)"
        class="btn"
      >
        Next photo
      </button>
      <div class="container">
        <div><img :src="this.currentPhoto.img_src" /></div>
      </div>
      <button v-if="index > 0" @click="prevPhoto(index)" class="btn">
        Prev photo
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SinglePhoto",
  data() {
    return {
      currentPhoto: {},
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
      this.currentPhoto = photo
      this.index = index
    },
    nextPhoto(index) {
      if (this.photos.length > index + 1) {
        this.photoToDisplay = this.photos[index + 1].img_src
        this.index = index + 1
      }
    },
    prevPhoto(index) {
      if (index > 0) {
        this.photoToDisplay = this.photos[index - 1].img_src
        this.index = index - 1
      }
    },
  },
  created() {
    console.log(this.$route.params)
    this.findPhotoById(this.$route.params.id)
  },
}
</script>

<style scoped>
.body > div:first-child {
  display: flex;
  justify-content: space-between;
  text-align: center;
}

.body > div:last-child {
  position: relative;
  height: 50vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row-reverse;
}

.container {
  margin-left: 5rem;
}

img {
  position: absolute;
  top: 0;
  left: 250px;
}
</style>