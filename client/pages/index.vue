<template>
  <div class="body">
    <h1>Astrological Picture of the Day</h1>
    <Spinner v-if="loading" />
    <div v-else class="container">
      <div class="title">
        <h3>{{ apod.date }}</h3>
        <h3>{{ apod.title }}</h3>
      </div>
      <div class="apod-body">
        <div class="img-container">
          <img
            v-if="apod.media_type === 'image'"
            :src="apod.url"
            :alt="apod.title"
          />
          <div v-else>
            <iframe width="500" height="350" :src="apod.url"></iframe>
          </div>
        </div>
        <p><span>Explanation:</span> {{ apod.explanation }}</p>
      </div>
      <div class="buttons-container">
        <button class="btn" @click="showPreviousApod">Show previous</button>
        <button v-if="this.nextButton" class="btn" @click="showNextApod">
          Show next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"
import Spinner from "../components/Spinner"

export default {
  name: "APOD",
  components: {
    Spinner,
  },

  computed: {
    apod() {
      return this.$store.state.apod.apod
    },
    loading() {
      return this.$store.state.apod.loading
    },
  },

  data() {
    return {
      nextButton: false,
      date: "",
    }
  },

  methods: {
    ...mapActions({
      getLastApod: "apod/getLastApod",
      getManifests: "manifest/getManifests",
      getApodByDate: "apod/getApodByDate",
    }),
    async getTodayApod() {
      await this.getLastApod()
      this.date = this.apod.date
    },
    showPreviousApod() {
      let date = new Date(this.apod.date)
      date.setDate(date.getDate() - 1)
      date = date.toISOString().slice(0, 10)
      this.getApodByDate(date)
      this.$store.commit("apod/apodUpdating")
      !this.nextButton && (this.nextButton = true)
    },
    todayApodDate() {
      this.date = this.apod.date
    },
    showNextApod() {
      let date = new Date(this.apod.date)
      date.setDate(date.getDate() + 1)
      date = date.toISOString().slice(0, 10)
      this.getApodByDate(date)
      this.$store.commit("apod/apodUpdating")
      let dateToCompare = new Date(this.date)
      dateToCompare.setDate(dateToCompare.getDate() - 1)
      dateToCompare = dateToCompare.toISOString().slice(0, 10)
      this.apod.date === dateToCompare && (this.nextButton = false)
    },
  },

  created() {
    this.getTodayApod()
    this.$store.commit("manifest/manifestCalled")
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

p {
  max-width: 50%;
  line-height: 1.5rem;
  padding: 0 1rem;
}

span {
  font-weight: bold;
  font-size: 1.5rem;
}

.buttons-container {
  display: flex;
  justify-content: space-between;
}
</style>