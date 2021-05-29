<template>
  <div class="img-container">
    <img :src="photo.img_src" alt="Mars rover photo" />
  </div>
</template>

<script>
export default {
  name: 'Photo',
  props: {
    photo: Object,
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