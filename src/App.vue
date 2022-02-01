<template>
  <v-select />
</template>

<script>
import {mapActions } from "vuex";
import vSelect from "./components/v-select.vue";

export default {
  name: "App",
  components: { vSelect },
  methods: mapActions(["getData"]),
  created() {
    this.getData();
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
