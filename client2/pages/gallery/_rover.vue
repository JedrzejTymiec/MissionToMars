<template>
  <div class="body">
    <PageHeader
      :title="`${
        this.$route.params.rover.charAt(0).toUpperCase() +
        this.$route.params.rover.slice(1)
      } gallery`"
      backLink="/rovers"
    />
    <Search
      :rover="
        this.$route.params.rover.charAt(0).toUpperCase() +
        this.$route.params.rover.slice(1)
      "
    />
    <PhotoList
      :rover="
        this.$route.params.rover.charAt(0).toUpperCase() +
        this.$route.params.rover.slice(1)
      "
    />
  </div>
</template>

<script>
import PageHeader from '../../components/layout/PageHeader'
import Search from '../../components/gallery/Search'
import PhotoList from '../../components/gallery/PhotoList'

export default {
  name: 'RoverGallery',
  components: {
    PageHeader,
    Search,
    PhotoList,
  },
}
</script>

<style>
</style>