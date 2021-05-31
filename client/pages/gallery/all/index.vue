<template>
  <div class="body">
    <PageHeader title="All Maritian Photos" backLink="/rovers" />
    <Search />
    <PagesBar :setPage="setPage" />
    <AllPhotoList :currentPage="currentPage" />
  </div>
</template>

<script>
import PageHeader from '../../../components/layout/PageHeader'
import Search from '../../../components/gallery/Search'
import AllPhotoList from '../../../components/gallery/AllPhotoList'
import PagesBar from '../../../components/gallery/PagesBar'

export default {
  name: 'AllPhotos',
  components: {
    PageHeader,
    Search,
    AllPhotoList,
    PagesBar,
  },
  data() {
    return {
      currentPage: '1',
    }
  },
  methods: {
    setPage(page) {
      this.currentPage = page
    },
  },
}
</script>

<style>
</style>