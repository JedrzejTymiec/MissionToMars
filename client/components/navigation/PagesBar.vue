<template>
  <div class="pages-container">
    <p>Sort by date</p>
    <div class="icons-container">
      <font-awesome-icon
        @click="sort(true)"
        class="sort-icon"
        :icon="['fas', 'sort-numeric-up']"
      />
      <font-awesome-icon
        @click="sort(false)"
        class="sort-icon"
        :icon="['fas', 'sort-numeric-down-alt']"
      />
    </div>
    <ul class="pages">
      <li @click="setPage($event.target.innerText)" class="btn small-btn">1</li>
      <li @click="setPage($event.target.innerText)" class="btn small-btn">2</li>
      <li @click="setPage($event.target.innerText)" class="btn small-btn">3</li>
      <li @click="setPage($event.target.innerText)" class="btn small-btn">4</li>
      <li @click="setPage($event.target.innerText)" class="btn small-btn">5</li>
      <li @click="setPage($event.target.innerText)" class="btn small-btn">6</li>
      <li @click="setPage($event.target.innerText)" class="btn small-btn">7</li>
      <li @click="setPage($event.target.innerText)" class="btn small-btn">8</li>
      <li @click="setPage($event.target.innerText)" class="btn small-btn">9</li>
      <li @click="setPage($event.target.innerText)" class="btn small-btn">
        10
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PagesBar',
  props: {
    setPage: Function,
  },
  methods: {
    async sort(order) {
      try {
        this.$store.commit('photos/clearPhotos')
        let res
        if (order) {
          res = await axios.get('/api/photos/page/1')
        } else {
          res = await axios.get('/api/photos/page/a/1')
        }
        this.$store.commit('photos/getPhotos', res.data)
      } catch (err) {
        this.$store.commit('photos/errorPhoto', err.response.data.message)
      }
    },
  },
}
</script>

<style>
.pages-container {
  position: relative;
}

.pages-container p {
  letter-spacing: 2px;
  position: absolute;
  left: -10px;
  top: -10px;
}

.pages {
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

.small-btn {
  padding: 0.7rem 1rem;
  border-radius: 10px;
  border: 2px solid #999;
  margin: 0.2rem;
  margin-bottom: 0.5rem;
}

.icons-container {
  position: absolute;
  left: 0;
  bottom: 10px;
}

.sort-icon {
  font-size: 2rem;
  margin-right: 1rem;
  transition: 200ms;
  cursor: pointer;
}

.sort-icon:hover {
  color: #999;
}
</style>