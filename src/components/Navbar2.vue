<template>
  <Menubar :model="items" class="Menubar">
    <template #end>
      <InputText placeholder="Search" type="text" />
    </template>
  </Menubar>
  <div class="text-centerr">
    <AddCard v-if="displayCard"></AddCard>
  </div>
</template>
<script>
import AddCard from "./AddCard.vue";
export default {
  components: {
    AddCard,
  },
  data() {
    return {
      displayCard: false,
      items: [
        {
          label: "Daily Logs",
          items: [
            {
              label: "New",
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
      ],
    };
  },

  methods: {
    toggleFile: function () {
      this.displayCard = !this.displayCard;
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
