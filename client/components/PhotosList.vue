<template>
  <div class="photo-list">
    <div
      :key="pic.img_src"
      v-for="pic in photos.length > 100 ? photos.slice(0, 100) : photos"
      class="img-container"
    >
      <img :src="pic.img_src" alt="Mars rover photo" />
    </div>
  </div>
</template>

<script>
export default {
  name: "PhotosList",

  props: {
    photos: Array,
  },

  methods: {
    limitPhotos() {
      console.log(this.photos.length)
      if (this.photos.length > 100) {
        this.listOfPhotos = this.photos.slice(0, 100)
      }
    },
  },
}
</script>

<style scoped>
.img-container {
  width: 200px;
  cursor: pointer;
  margin: 0.3rem;
}

.img-container img {
  width: 100%;
}

.photo-list {
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
}
</style>