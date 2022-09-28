<script>
import Navbar from "../components/Navbar.vue";
import Registration from "../components/Registration.vue";
import TrackerContainer from "../components/TrackerContainer.vue";
export default {
  name: "App",
  components: {
    Navbar,
    Registration,
    TrackerContainer,
  },
  data() {
    return {
    };
  },
};
</script>

<template>
  <div class="backdrop">
    <Navbar />
    <TrackerContainer class="container"/>
  </div>
</template>

<style scoped>
.Navbar {
  background-color: rgb(220, 228, 234);
}
.container{
  margin-top: 5rem;
}
</style>
