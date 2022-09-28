<template>
    <div>
      <div class="card">
        <Carousel :value="cards" :numVisible="3" :numScroll="3" :responsiveOptions="responsiveOptions">
          <template #header>
            <h2 class="text-pos">Daily Logs</h2>
          </template>
          <template #item="slotProps">
            <div class="product-item">
              <div class="product-item-content">
                  <div class="mb-3">
                      <img src="../assets/tracker_gnda_logo.svg" style="width:8rem" :alt="slotProps.data.name" class="product-image" />
                  </div>
                  <div>
                      <h4 class="mb-1">{{slotProps.data.value}}</h4>
                      <div class="car-buttons mt-5">
                          <Button icon="pi pi-pencil" class="p-button-success p-button-rounded mr-2"/>
                          <Button icon="pi pi-trash" class="p-button-danger p-button-rounded mr-2" @click="deleteCard(slotProps.data.id)"/>
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
    export default {
      props: {
        cards: Object
      },
      data() {
        return {
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
      deleteCard(id){
        let data = {
        "id": id
      }
      var authToken = localStorage.getItem("Auth");
      fetch("http://localhost:5000/tracker/"+this.$route.params.id, {
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
    }
  };
  </script>
  <style>
    .text-pos{
    text-align: center;
  }
  </style>