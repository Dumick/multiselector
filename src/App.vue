<template>
  <div class="wrap">
    <v-select />
    <v-content />
  </div>
  <v-footer />
</template>

<script>
import { mapActions } from "vuex";

import vSelect from "./components/v-select.vue";
import vContent from "./components/v-content.vue";
import vFooter from "./components/v-footer.vue";

export default {
  name: "App",
  components: { vSelect, vContent, vFooter },
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
  font-family: "Roboto", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.wrap {
  width: 60%;
  display: flex;
  align-items: center;
  margin-top: 40px;
  justify-content: space-around;
}
</style>
