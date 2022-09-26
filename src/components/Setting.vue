<template>
  <SpeedDial :model="items" direction="down" ButtonClass="p-button-sm"/>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          label: "Add",
          icon: "pi pi-pencil",
          command: () => {
            this.$toast.add({
              severity: "info",
              summary: "Add",
              detail: "Data Added",
            });
          },
        },
        {
          label: "Update",
          icon: "pi pi-refresh",
          command: () => {
            this.$toast.add({
              severity: "success",
              summary: "Update",
              detail: "Data Updated",
            });
          },
        },
        {
          label: "Delete",
          icon: "pi pi-trash",
          command: () => {
            this.$toast.add({
              severity: "error",
              summary: "Delete",
              detail: "Data Deleted",
            });
          },
        },
        {
          label: "Download",
          icon: "pi pi-download",
          command: () => {
            this.$router.pull("download");
          },
        },
      ],
    };
  },
};
</script>
<style>
    .p-speeddial-button.p-button.p-button-icon-only span.pi.pi-cog.p-button-icon{
        font-size: 1.3rem;
    }
    .p-button.p-component.p-button-icon-only.p-speeddial-button.p-button-rounded.p-speeddial-rotate{
        width: 2rem;
        height: 2rem;
    }   
</style>
