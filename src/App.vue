<script>
import Navbar from './components/Navbar.vue';
import Card from './components/Card.vue';
import Registration from './components/Registration.vue';
import TrackerContainer from './components/TrackerContainer.vue';
export default {
  name: 'App',
	components: {
    Navbar,
    Card,
    Registration,
    TrackerContainer
},
	data() {
    return {
      lst: [1,2,3]
    }
  }
};
</script>

<template>
  <div class="backdrop">
    <Navbar />
    <!-- <div v-for="ele in lst">
      <button>{{ele}}</button>
    </div> -->
    <TrackerContainer />
  </div>
</template>

<style scoped>
.Navbar {
  background-color: rgb(220, 228, 234);
}
/* .backdrop{
  top:0;
  position:fixed;
  width: 100%;
  height: 100%;
} */
</style>
