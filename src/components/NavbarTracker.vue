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
              label: "Export",
              icon: "pi pi-fw pi-external-link",
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
  },
};
</script>

<style></style>
