<script>
import NavbarTracker from "../components/NavbarTracker.vue";
import ContainTracker from "../components/ContainTracker.vue";
export default {
  name: "App",
  components: {
    NavbarTracker,
    ContainTracker,
  },
  data() {
    return {};
  },
};
</script>

<template>
  <div class="backdrop">
    <NavbarTracker />
    <ContainTracker class="container" />
  </div>
</template>

<style scoped>
.NavbarTracker {
  background-color: rgb(220, 228, 234);
}
.container {
  margin-top: 5rem;
}
</style>
