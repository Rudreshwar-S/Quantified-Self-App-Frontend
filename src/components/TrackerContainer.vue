<template>
  <div>
    <div class="card">
      <Carousel :value="Trackers" :numVisible="3" :numScroll="3" :responsiveOptions="responsiveOptions">
        <template #header>
          <h2>Your Trackers</h2>
        </template>
        <template #item="slotProps">
          <div class="Tracker-item">
            <div class="Tracker-item-content">
                <div class="mb-3">
                    <img src="../assets/tracker_gnda_logo.svg" style="height:7rem" :alt="slotProps.data.name" class="Tracker-image" />
                </div>
                <div>
                    <h3 class="mb-1">{{slotProps.data.name}}</h3>
                    <div class="car-buttons mt-5">
                        <Button icon="pi pi-pencil" class="p-button-success p-button-rounded mr-2"/>
                        <Button icon="pi pi-trash" class="p-button-danger p-button-rounded mr-2" @click="deleteTracker(slotProps.data.id)"/>
                        <Button icon="pi pi-info-circle" class="p-button-help p-button-rounded" />
                    </div>
                </div>
            </div>
          </div>
        </template>
        <template #footer>
        </template>
      </Carousel>
    </div>
  </div>
</template>
<script>
  let Trackers = [];
  export default {
    data() {
      return {
        Trackers,
        trackersObj: null,
        trackerStringify: null,
        slotProps:{
        label: "One"
      },
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
  methods: {
    deleteTracker(id){
      let data = {
        "id": id
      }
      var authToken = localStorage.getItem("Auth");
      fetch("http://localhost:5000/trackers", {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Authorization': authToken
            },
            body: JSON.stringify(data) 
          })
          window.setTimeout(function(){location.reload()},1000)
    }
  },
  beforeMount(){
      var authToken = localStorage.getItem("Auth");
      fetch("http://localhost:5000/trackers", {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Authorization': authToken
            }, 
          })
          .then((data) => data.json())
          .then((trakers) => {
            this.Trackers = trakers
          })
  }
};
</script>