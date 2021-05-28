<template>
  <div class="weather-panel">
    <div class="date-container">
      <p>Sol {{ weather.sol }}</p>
      <p>{{ weather.terrestrial_date }}</p>
    </div>
    <div class="temp-container">
      <div>
        <p>min</p>
        <p>{{ weather.min_temp }}</p>
      </div>
      <p>Temp</p>
      <div>
        <p>max</p>
        <p>{{ weather.max_temp }}</p>
      </div>
    </div>
    <div class="pressure-container">
      <p>Pressure</p>
      <p>{{ weather.pressure }}</p>
    </div>
    <div class="sun-time">
      <div>
        <p>sunrise</p>
        <p>{{ weather.sunrise }}</p>
      </div>
      <div>
        <p>sunset</p>
        <p>{{ weather.sunset }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WeatherPanel",
  props: {
    weather: Object,
  },
}
</script>

<style scoped>
.weather-panel {
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: rgb(236, 202, 202);
  border-radius: 10px;
  width: 150px;
}

p {
  font-size: 0.8rem;
}

.date-container {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgb(201, 179, 179);
}

.date-container p:first-child {
  font-size: 0.9rem;
}

.temp-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pressure-container {
  text-align: center;
}

.sun-time {
  display: flex;
  justify-content: space-between;
}
</style>