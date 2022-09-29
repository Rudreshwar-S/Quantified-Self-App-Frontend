<template>
  <div class="parent_div" v-if="displayDiv">
    <div class="card">
      <Card style="width: 17rem">
        <template #content>
          <InputText
            placeholder="Name"
            style="margin-bottom: 0.8em"
            v-model="trackerName"
          ></InputText>
          <Textarea
            placeholder="Description"
            style="margin-bottom: 0.8em"
            v-model="description"
            rows="4"
            cols="22"
            >x``</Textarea
          >
        </template>
        <template #footer>
          <Button
            icon="pi pi-check"
            type="submit"
            label="Update"
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
import Dropdown from "./Dropdown.vue";
export default {
  props: ["tracker_id"],
  components: {
    Dropdown,
  },
  data() {
    return {
      trackerName: "",
      description: "",
      isValidTracker: false,
      displayDiv: true,
    };
  },
  methods: {
    onSubmit() {
      let data = {
        name: this.trackerName,
        description: this.description,
      };
      console.log("Okkkkk", this.tracker_id);
      if (!this.description || !this.trackerName) {
        alert("All fields required!");
      } else {
        var authToken = localStorage.getItem("Auth");
        fetch("http://localhost:5000/trackers/" + this.tracker_id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: authToken,
          },
          body: JSON.stringify(data),
        });
      }
      this.displayDiv = false;
      this.displayDiv = false;
      window.setTimeout(function () {
        location.reload();
      }, 1000);
    },
    onCancel() {
      this.displayDiv = false;
    },
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
