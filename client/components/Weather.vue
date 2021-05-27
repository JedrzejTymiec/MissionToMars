<template>
  <div class="weather-container">
    <h3>Weather on mars</h3>
    <WeatherPanel
      :key="weather.terrestrial_date"
      v-for="weather in weathers"
      :weather="weather"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex"
import WeatherPanel from "./WeatherPanel"

export default {
  name: "Weather",

  components: {
    WeatherPanel,
  },

  computed: {
    weathers() {
      return this.$store.state.weather.weathers
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