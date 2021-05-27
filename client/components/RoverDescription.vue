<template>
  <div class="rover">
    <div class="rover-desc">
      <h3>{{ rover.name }}</h3>
      <div class="desc-group">
        <p>Launch date:</p>
        <p>{{ rover.launch_date }}</p>
      </div>
      <div class="desc-group">
        <p>Landing date:</p>
        <p>{{ rover.landing_date }}</p>
      </div>
      <div class="desc-group">
        <p>Max sol:</p>
        <p>{{ rover.max_sol }}</p>
      </div>
      <div class="desc-group">
        <p>Max date:</p>
        <p>{{ rover.max_date }}</p>
      </div>
      <div class="desc-group">
        <p>Status:</p>
        <p>{{ rover.status }}</p>
      </div>
      <div class="desc-group">
        <p>total photos:</p>
        <p>{{ rover.total_photos }}</p>
      </div>
      <ul v-if="rover.name === 'Curiosity'">
        Cameras:
        <li><span>FHAZ </span>(Front Hazard Avoidance Camera)</li>
        <li><span>RHAZ </span>(Rear Hazard Avoidance Camera)</li>
        <li><span>NAVCAM </span>(Navigation Camera)</li>
        <li><span>MAST </span>(Mast Camera)</li>
        <li><span>CHEMCAM </span>(Chemistry and Camera Complex)</li>
        <li><span>MAHLI </span>(Mars Hand Lens Imager)</li>
        <li><span>MARDI </span>(Mars Descent Imager)</li>
      </ul>
      <ul v-else>
        Cameras:
        <li><span>FHAZ </span>(Front Hazard Avoidance Camera)</li>
        <li><span>RHAZ </span>(Rear Hazard Avoidance Camera)</li>
        <li><span>NAVCAM </span>(Navigation Camera)</li>
        <li><span>PANCAM </span>(Panoramic Camera)</li>
        <li>
          <span>MINITES </span>Miniature Thermal Emission Spectrometer
          (Mini-TES)
        </li>
      </ul>
    </div>
    <nuxt-link :to="'/' + rover.name.toLowerCase()" class="btn"
      >Show photos</nuxt-link
    >
  </div>
</template>

<script>
export default {
  name: "RoverDescription",
  props: {
    rover: Object,
  },
}
</script>

<style scoped>
.rover {
  background-color: rgb(230, 227, 227);
  margin: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.desc-group {
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  margin-top: 1rem;
}

ul span {
  font-weight: 700;
}

.btn {
  margin-top: 1rem;
}
</style>