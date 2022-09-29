<template>
  <Dropdown
    v-model="selectedCity"
    :options="cities"
    optionLabel="name"
    placeholder="Tracker Type"
  />
</template>
<script>
export default {
  data() {
    return {
      selectedCity: null,
      cities: [
        { name: "Numerical", code: "NUM" },
        { name: "String", code: "STR" },
        { name: "Boolean", code: "BOOL" },
      ],
    };
  },
};
</script>
