<template>
  <div class="parent_div" v-if="displayDiv">
    <div class="card">
      <Card style="width: 17rem">
        <template #title>
          Card Details
        </template>
        <template #content>
          <h3>Tracker ID: {{ this.$route.params.id }}</h3>
          <h5>{{ tracker_obj.tracker_type }}</h5>
          <div style="margin-bottom: 0.8em">
            <InputNumber
              placeholder="Value"
              v-model="cardValue"
              v-if="track_type == 1"
              :minFractionDigits="0"
              :maxFractionDigits="5"
            ></InputNumber>
            <Dropdown
              v-model="cardValue"
              v-if="track_type == 2"
              :options="bool_val"
              placeholder="Yes/No"
            >
            </Dropdown>
            <InputText
              v-model="cardValue"
              v-if="track_type == 3"
              placeholder="Value"
            ></InputText>
          </div>
          <Textarea placeholder="Note" v-model="note" rows="4" cols="22"
            >x``</Textarea
          >
        </template>
        <template #footer>
          <Button
            icon="pi pi-check"
            type="submit"
            label="Save"
            @click="onSubmit"
          />
          <Button
            icon="pi pi-times"
            label="Cancel"
            class="p-button-secondary"
            style="margin-left: 0.5em"
            @click="onCancel"
          />
        </template>
      </Card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tracker_obj: [],
      cardValue: "",
      note: "",
      isValidTracker: false,
      displayDiv: true,
      track_type: null,
      bool_val: ["Yes", "No"],
    };
  },
  methods: {
    onSubmit() {
      var timeStamp = new Date().getTime();
      let data = {
        time_stamp: timeStamp,
        value: this.cardValue,
        note: this.note,
      };
      if (!this.note || !this.cardValue) {
        alert("All fields required!");
      } else {
        var authToken = localStorage.getItem("Auth");
        fetch("http://localhost:5000/tracker/" + this.$route.params.id, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: authToken,
          },
          body: JSON.stringify(data),
        });
      }
      this.displayDiv = false;
      window.setTimeout(function () {
        location.reload();
      }, 1000);
    },
    onCancel() {
      this.displayDiv = false;
    },
  },
  beforeMount() {
    var authToken = localStorage.getItem("Auth");
    fetch("http://localhost:5000/trackers/" + this.$route.params.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: authToken,
      },
    })
      .then((data) => data.json())
      .then((traker) => {
        this.tracker_obj = traker;
        if (this.tracker_obj.tracker_type == "Numerical") {
          this.track_type = 1;
        } else if (this.tracker_obj.tracker_type == "Boolean") {
          this.track_type = 2;
        } else {
          this.track_type = 3;
        }
      });
  },
};
</script>

<style scoped>
.parent_div {
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  padding-bottom: 10%;
}
.card {
  margin-bottom: 2rem;
}
</style>
