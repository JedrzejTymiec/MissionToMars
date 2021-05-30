<template>
  <div class="img-container">
    <nuxt-link :to="`/gallery/${photo.rover.toLowerCase()}/${photo._id}`"
      ><span>{{ this.photo.camera }}</span
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
    this.date && this.date()
  },
}
</script>

<style scoped>
.img-container {
  width: 200px;
  cursor: pointer;
  margin: 0.3rem;
  position: relative;
}

.img-container img {
  width: 100%;
}

.img-container span {
  position: absolute;
  top: 5px;
  left: 5px;
  color: #fff;
}
</style>