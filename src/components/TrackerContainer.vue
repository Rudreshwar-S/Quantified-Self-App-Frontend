<template>
  <div>
    <div class="card">
      <Carousel :value="Trackers" :numVisible="3" :numScroll="3" :responsiveOptions="responsiveOptions">
        <template #header>
          <h2>Your Trackers</h2>
        </template>
        <template #item="slotProps">
          <div class="product-item">
            <div class="product-item-content">
                <div class="mb-3">
                    <img src="../assets/tracker_gnda_logo.svg" style="width:8rem" :alt="slotProps.data.name" class="product-image" />
                </div>
                <div>
                    <h4 class="mb-1">{{slotProps.data.name}}</h4>
                    <div class="car-buttons mt-5">
                        <Button icon="pi pi-pencil" class="p-button-success p-button-rounded mr-2"/>
                        <Button icon="pi pi-trash" class="p-button-danger p-button-rounded mr-2" />
                        <Button icon="pi pi-download" class="p-button-help p-button-rounded" />
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
  (async function fetch_trackers(){
      var authToken = localStorage.getItem("Auth");
      let data1 = await fetch("http://localhost:5000/trackers", {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Authorization': authToken
            }, 
          })
          .then((data) => data.json())
          .then((responseJSON) => {
            return responseJSON
    })
    localStorage.setItem('Tracks', JSON.stringify(data1))
    })()
    var getTrackers = JSON.parse(localStorage.getItem('Tracks'))
    console.log(getTrackers["0"].name)
    for(var i in getTrackers){
      Trackers.push({name: getTrackers[i].name})
    }
    console.log(Trackers)
  export default {
    components: {
    },
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
  }
};
</script>