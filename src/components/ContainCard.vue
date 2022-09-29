<template>
  <div>
    <div class="card">
      <Dialog
        header="Note"
        v-model:visible="displayDesc"
        :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ width: '20vw' }"
      >
        <p>
          {{ dialogDesc }}
        </p>
      </Dialog>
      <Carousel
        :value="cards"
        :numVisible="3"
        :numScroll="1"
        :responsiveOptions="responsiveOptions"
        :circular="true"
      >
        <template #header>
          <h2 class="text-pos">Daily Logs</h2>
        </template>
        <template #item="slotProps">
          <div class="card-item">
            <div class="card-item-content">
              <div class="mb-3">
                <img
                  src="../assets/QuantifieldSelfAppLogo.svg"
                  style="width: 8rem"
                  :alt="slotProps.data.name"
                  class="card-image"
                />
              </div>
              <div>
                <h2 class="mb-1">Value: {{ slotProps.data.value }}</h2>
                <div class="car-buttons mt-5">
                  <Button
                    icon="pi pi-pencil"
                    class="p-button-success p-button-rounded mr-2"
                  />
                  <Button
                    icon="pi pi-trash"
                    class="p-button-danger p-button-rounded mr-2"
                    @click="deleteCard(slotProps.data.id)"
                  />
                  <Button
                    icon="pi pi-info-circle"
                    class="p-button-help p-button-rounded"
                    @click="showDesc(slotProps.data.note)"
                  />
                </div>
              </div>
            </div>
          </div>
        </template>
        <template #footer> </template>
      </Carousel>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    cards: Object,
  },
  data() {
    return {
      trackersObj: null,
      dialogDesc: "",
      displayDesc: false,
      trackerStringify: null,
      slotProps: {
        label: "One",
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
    showDesc(note) {
      this.dialogDesc = note;
      this.displayDesc = !this.displayDesc;
    },
    deleteCard(id) {
      let data = {
        id: id,
      };
      var authToken = localStorage.getItem("Auth");
      fetch("http://localhost:5000/tracker/" + this.$route.params.id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: authToken,
        },
        body: JSON.stringify(data),
      });
      window.setTimeout(function () {
        location.reload();
      }, 1000);
    },
  },
};
</script>
<style lang="scss" scoped>
.text-pos {
  text-align: center;
}
.card-item {
  .card-item-content {
    border: 3px solid var(--surface-border);
    border-radius: 20px;
    margin: 0.7rem;
    text-align: center;
    padding: 2rem 0;
  }
  .card-image {
    width: 40%;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
}
</style>
