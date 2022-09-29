<script>
import NavbarTracker from "../components/NavbarTracker.vue";
export default {
  components: {
    NavbarTracker,
  },
};
</script>
<template>
  <NavbarTracker></NavbarTracker>
  <div class="abt_des">
    <p>Hi, I am Rudreshwar. I did this project as a part of Modern Application Development 2 course. </p>
    <p>I have used <a href="https://vuejs.org/">Vue3</a> for UI and <a href="https://flask.palletsprojects.com/en/2.2.x/">Flask</a> for Backend</p>
    <p>For ease and styling, I have used a comprehensive UI library for Vue CLI which is <a href="https://www.primefaces.org/primevue/">PrimeVue</a></p>
  </div>
</template>
<style>
.abt_des {
  text-align: center;
  padding: 100px;
}
</style>
