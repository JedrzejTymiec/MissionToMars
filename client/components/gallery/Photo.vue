<template>
  <div class="img-container">
    <nuxt-link
      :to="
        this.$route.name === 'gallery-all'
          ? `/gallery/all/${photo._id}`
          : `/gallery/${photo.rover.toLowerCase()}/${photo._id}`
      "
      ><span class="camera">{{ this.photo.camera }}</span
      ><span v-if="this.$route.name === 'gallery-all'" class="rover">{{
        this.photo.rover
      }}</span
      ><span v-if="this.$route.name === 'gallery-all'" class="date">{{
        this.photo.earth_date
      }}</span
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
  color: #fff;
}

.img-container .camera {
  top: 5px;
  left: 5px;
}

.img-container .rover {
  top: 5px;
  right: 5px;
}

.img-container .date {
  top: 1.5rem;
  right: 0;
}
</style>