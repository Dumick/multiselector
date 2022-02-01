<template>
  <div class="wrap">
    <v-select />
    <v-content />
  </div>
</template>

<script>
import { mapActions } from "vuex";

import vSelect from "./components/v-select.vue";
import vContent from "./components/v-content.vue";

export default {
  name: "App",
  components: { vSelect, vContent },
  methods: mapActions(["getData"]),
  created() {
    this.getData();
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: 'Roboto', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
}
.wrap {
  width: 80%;
  display: flex;
  align-items: center;
  margin-top: 40px;
  justify-content: space-around;
}
</style>
