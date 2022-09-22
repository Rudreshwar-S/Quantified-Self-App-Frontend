<script>
  import Card from './Card.vue';
  export default {
      components: {
        Card
      },
    data() {
      return {
        displayTracker: false,
        // displayTracker,
        items: [
          {
            label: "File",
            items: [
              {
                label: "New",
                icon: "pi pi-fw pi-plus",
                command: () => {
                  this.toggleFile()
                }
              },
              {
                label: "Delete",
                icon: "pi pi-fw pi-trash",
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
            label: "Trackers",
          },
          {
            label: "Logout"
          }
        ],
      };
    },

    methods: {
      toggleFile: function() {
        this.displayTracker = !this.displayTracker
      }
    }
  };
</script>

<template>
  <Menubar :model="items" class="Menubar">
    <template #end>
      <InputText placeholder="Search" type="text" />
    </template>
  </Menubar>
  <div class="text-centerr">
    <Card v-if="displayTracker" ></Card>
  </div>
</template>
<style>
  /* .text-centerr{
    display: flex;
    align-items: center;
    justify-content: center;
  } */
</style>