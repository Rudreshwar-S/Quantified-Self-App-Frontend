<template>
  <div>
    <div class="card">
      <Carousel :value="Trackers" :numVisible="1" :numScroll="1" >
        <template #header>
          <h2>Your Trackers</h2>
        </template>
        <template #item="slotProps">
            <div class="Trackers-item">
                <div class="Trackers-item-content">
                    Content
                </div>
            </div>
        </template>
        <template #footer>
          <h2>---------</h2>
        </template>
      </Carousel>
    </div>
  </div>
</template>
<script>
import Card from "./Card.vue";
export default {
  components: {
    Card,
  },
  data() {
    return {
        Trackers: [],
      responsiveOptions: [
        {
          breakpoint: "1024px",
          numVisible: 3,
          numScroll: 3,
        },
        {
          breakpoint: "600px",
          numVisible: 2,
          numScroll: 2,
        },
        {
          breakpoint: "480px",
          numVisible: 1,
          numScroll: 1,
        },
      ],
    };
  },
};
</script>

