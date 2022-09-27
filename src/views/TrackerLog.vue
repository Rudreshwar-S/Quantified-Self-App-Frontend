<template>
  <div class="add-btn">
    <Button label="Add Tracker" icon="pi pi-download" @click="toggleFile"/>
  </div>
  <div class="export-btn">
    <Button label="Export" icon="pi pi-download" />
  </div>
  <AddCard v-if="displayCard"></AddCard>
  <DailyLogTrackers :cards="cards"></DailyLogTrackers>
</template>
<script>
import AddCard from '../components/AddCard.vue';
import DailyLogTrackers from "../components/DailyLogTrackers.vue";
export default {
  name: "App",
  components: {
    DailyLogTrackers,
    AddCard
  },
  data() {
    return {
      displayCard: false,
      cards: [],
    };
  },
  methods: {
    toggleFile: function() {
        this.displayCard = !this.displayCard
      }
  },
  beforeMount() {
    var authToken = localStorage.getItem("Auth");
    fetch("http://localhost:5000/tracker/" + this.$route.params.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: authToken,
      },
    })
      .then((data) => data.json())
      .then((cards) => {
        this.cards = cards;
      });
  },
};
</script>
<style>
  .add-btn{
    margin-top: 1rem;
  }
  .export-btn{
    margin-top: 2rem;
    margin-bottom: 3rem;
  }
</style>
