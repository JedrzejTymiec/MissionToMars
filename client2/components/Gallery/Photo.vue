<template>
  <div class="img-container">
    <nuxt-link :to="`/gallery/${photo.rover.toLowerCase()}/${photo._id}`"
      ><img :src="photo.img_src" alt="Mars rover photo"
    /></nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'Photo',
  props: {
    photo: Object,
    date: Function,
  },
  created() {
    this.date()
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
</style>