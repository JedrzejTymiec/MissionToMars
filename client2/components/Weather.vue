<template>
  <div class="weather-container">
    <h3>Weather on mars</h3>
    <Spinner v-if="loading" />
    <WeatherPanel
      v-else
      :key="weather.terrestrial_date"
      v-for="weather in weathers"
      :weather="weather"
    />
  </div>
</template>

<script>
import WeatherPanel from './WeatherPanel'
import Spinner from './Spinner'
import axios from 'axios'

export default {
  name: 'Weather',

  components: {
    WeatherPanel,
    Spinner,
  },

  computed: {
    weathers() {
      return this.$store.state.weather.list
    },
    loading() {
      return this.$store.state.weather.loading
    },
  },

  methods: {
    async getWeathers() {
      const res = await axios.get('/api/weather')
      this.$store.commit('weather/setWeather', res.data)
    },
  },

  created() {
    this.getWeathers()
  },
}
</script>

<style>
.weather-container {
  padding-top: 1rem;
  min-height: 100vh;
  background-color: #999;
  align-items: center;
  text-align: center;
  max-width: 200px;
}

.weather-container h3 {
  margin-bottom: 1px solid #3f3f3f;
  width: 160px;
}
</style>