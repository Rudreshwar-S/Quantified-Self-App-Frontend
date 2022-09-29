<template>
  <Menubar :model="items" class="Menubar">
    <template #end>
      <InputText placeholder="Search" type="text" />
    </template>
  </Menubar>
  <div class="text-centerr">
    <AddTracker v-if="displayTracker"></AddTracker>
  </div>
</template>
<script>
import AddTracker from "./AddTracker.vue";
export default {
  components: {
    AddTracker,
  },
  data() {
    return {
      displayTracker: false,
      progressReport: "",
      csvFile: "",
      items: [
        {
          label: "Tracker",
          items: [
            {
              label: "Add Tracker",
              icon: "pi pi-fw pi-plus",
              command: () => {
                this.toggleFile();
              },
            },
            {
              separator: true,
            },
            {
              label: "Progress-Report",
              icon: "pi pi-fw pi-download",
              command: () => {
                this.exportReport();
              },
            },
            {
              label: "Export CSV",
              icon: "pi pi-fw pi-external-link",
              command: () => {
                this.exportCsv();
              },
            },
          ],
        },
        {
          label: "Dashboard",
          to: "/dashboard",
        },
        {
          label: "About",
          to: "/about",
        },
        {
          label: "Logout",
          command: () => {
            this.handleLogout();
          },
        },
      ],
    };
  },

  methods: {
    toggleFile: function () {
      this.displayTracker = !this.displayTracker;
    },
    handleLogout: function () {
      localStorage.removeItem("Auth");
      localStorage.removeItem("Tracks");
      this.$router.push("/");
    },
    exportCsv(){
      var authToken = localStorage.getItem("Auth");
      fetch("http://localhost:5000/export_csv", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: authToken,
        },
      })
      .then((data) => data.json())
      .then((csv) => {
        this.csvFile = csv.filename;
        window.open("http://localhost:5000/download_file/"+this.csvFile, '_blank') 
      })
    },
    exportReport(){
      var authToken = localStorage.getItem("Auth");
      fetch("http://localhost:5000/create_report", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: authToken,
        },
      })
      .then((data) => data.json())
      .then((report) => {
        this.progressReport = report.filename;
        console.log(this.progressReport)
        window.open("http://localhost:5000/download_file/"+this.progressReport, '_blank')  
      })
    }
  },
};
</script>

<style></style>
