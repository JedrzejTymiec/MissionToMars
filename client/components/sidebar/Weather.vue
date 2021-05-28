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
import { mapActions } from "vuex"
import WeatherPanel from "./WeatherPanel"
import Spinner from "../Spinner"

export default {
  name: "Weather",

  components: {
    WeatherPanel,
    Spinner,
  },

  computed: {
    weathers() {
      return this.$store.state.weather.weathers
    },
    loading() {
      return this.$store.state.weather.loading
    },
  },

  methods: {
    ...mapActions({
      getWeather: "weather/getWeather",
    }),
  },

  created() {
    this.getWeather()
  },
}
</script>

<style>
</style>