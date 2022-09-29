<template>
  <div class="card">
    <Dialog
      header="Description"
      v-model:visible="displayDesc"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '20vw' }"
    >
      <p>
        {{ dialogDesc }}
      </p>
    </Dialog>
    <EditTracker
      v-if="displayEditTracker"
      :tracker_id="tracker_id"
    ></EditTracker>
    <Carousel
      :value="Trackers"
      :numVisible="3"
      :numScroll="1"
      :responsiveOptions="responsiveOptions"
      :circular="true"
    >
      <template #header>
        <h2 class="text-pos">Your Trackers</h2>
      </template>
      <template #item="slotProps">
        <div class="Tracker-item">
          <div class="Tracker-item-content">
            <div class="mb-3" @click="gotoCard(slotProps.data.id)">
              <img
                src="../assets/QuantifieldSelfAppLogo.svg"
                style="height: 7rem"
                :alt="slotProps.data.name"
                class="Tracker-image"
              />
            </div>
            <div>
              <h3 class="mb-1">{{ slotProps.data.name }}</h3>
              <div class="car-buttons mt-5">
                <Button
                  icon="pi pi-pencil"
                  class="p-button-success p-button-rounded mr-2"
                  @click="onEdit(slotProps.data.id)"
                />
                <Button
                  icon="pi pi-trash"
                  class="p-button-danger p-button-rounded mr-2"
                  @click="deleteTracker(slotProps.data.id)"
                />
                <Button
                  icon="pi pi-info-circle"
                  class="p-button-help p-button-rounded"
                  @click="showDesc(slotProps.data.description)"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>
<script>
import EditTracker from "./EditTracker.vue";
let Trackers = [];
export default {
  components: {
    EditTracker,
  },
  data() {
    return {
      tracker_id: null,
      displayEditTracker: false,
      Trackers,
      dialogDesc: "",
      displayDesc: false,
      trackersObj: null,
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
    onEdit(t_id) {
      this.displayEditTracker = !this.displayEditTracker;
      this.tracker_id = t_id;
    },
    gotoCard(id) {
      this.$router.push("/dashboard/" + id);
    },
    showDesc(desc) {
      this.dialogDesc = desc;
      this.displayDesc = !this.displayDesc;
    },
    deleteTracker(id) {
      let data = {
        id: id,
      };
      var authToken = localStorage.getItem("Auth");
      fetch("http://localhost:5000/trackers", {
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
  beforeMount() {
    var authToken = localStorage.getItem("Auth");
    fetch("http://localhost:5000/trackers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: authToken,
      },
    })
      .then((data) => data.json())
      .then((trakers) => {
        this.Trackers = trakers;
      });
  },
};
</script>
<style lang="scss" scoped>
.text-pos {
  text-align: center;
  margin-bottom: 5rem;
}
</style>
