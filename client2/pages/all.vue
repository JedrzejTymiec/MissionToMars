<template>
  <div class="body">
    <PageHeader title="All Maritian Photos" backLink="/rovers" />
    <Search />
    <AllPhotoList />
  </div>
</template>

<script>
import PageHeader from '../components/layout/PageHeader'
import Search from '../components/gallery/Search'
import AllPhotoList from '../components/gallery/AllPhotoList'

export default {
  name: 'AllPhotos',
  components: {
    PageHeader,
    Search,
    AllPhotoList,
  },
}
</script>

<style>
</style>