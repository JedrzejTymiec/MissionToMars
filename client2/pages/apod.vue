<template>
  <div class="body">
    <PageHeader title="Astrological picture of the day" />
    <Spinner v-if="loading" />
    <div v-else class="container">
      <div class="title">
        <div class="description">
          <h3>{{ this.apod.date }}</h3>
          <h3>{{ this.apod.title }}</h3>
          <p v-if="this.apod.copyright">by {{ this.apod.copyright }}</p>
        </div>
        <div class="buttons-container">
          <button @click="getPrevious" class="btn">Show previous</button>
          <button
            v-if="this.apod.date !== this.today"
            @click="getNext"
            class="btn"
          >
            Show next
          </button>
        </div>
      </div>
      <div class="apod-body">
        <div class="img-container">
          <img
            v-if="this.apod.media_type === 'image'"
            :src="this.apod.url"
            alt="apod.title"
          />
          <div v-else>
            <iframe width="500" height="350" :src="apod.url"></iframe>
          </div>
        </div>
        <p><span>Explanation:</span> {{ this.apod.explanation }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Spinner from '../components/Spinner'
import PageHeader from '../components/PageHeader'

export default {
  name: 'APOD',
  components: {
    Spinner,
    PageHeader,
  },
  data() {
    return {
      today: '',
    }
  },
  computed: {
    apod() {
      return this.$store.state.apod.apod
    },
    loading() {
      return this.$store.state.apod.loading
    },
  },
  methods: {
    async getToday() {
      const res = await axios.get('/api/apod')
      this.$store.commit('apod/getApod', res.data)
    },
    todayDate() {
      const date = new Date()
      this.today = date.toISOString().slice(0, 10)
    },
    async getPrevious() {
      if (this.apod.date) {
        let date = new Date(this.apod.date)
        this.$store.commit('apod/clearApod')
        date.setDate(date.getDate() - 1)
        date = date.toISOString().slice(0, 10)
        const res = await axios.get(`/api/apod/${date}`)
        this.$store.commit('apod/getApod', res.data)
      }
    },
    async getNext() {
      if (this.apod.date) {
        let date = new Date(this.apod.date)
        this.$store.commit('apod/clearApod')
        date.setDate(date.getDate() + 1)
        date = date.toISOString().slice(0, 10)
        const res = await axios.get(`/api/apod/${date}`)
        this.$store.commit('apod/getApod', res.data)
      }
    },
  },
  created() {
    this.getToday()
    this.todayDate()
  },
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #ececec;
  padding: 1rem;
}

.title {
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title .description p {
  width: 100%;
}

.title h3:first-child {
  font-weight: 400;
  font-size: 1rem;
}

.apod-body {
  margin: auto;
  display: flex;
}

.img-container {
  margin: auto;
}

.img-container img,
.img-container div {
  width: 100%;
}

.apod-body p {
  max-width: 50%;
  line-height: 1.5rem;
  padding: 0 1rem;
  margin-left: 1rem;
}

span {
  font-weight: bold;
  font-size: 1.5rem;
}

.buttons-container {
  display: flex;
  justify-content: space-between;
}

.buttons-container button {
  width: 150px;
  font-size: 1rem;
}
</style>