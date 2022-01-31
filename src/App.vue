<template></template>

<script>
import {mapMutations, mapActions} from 'vuex'

export default {
  name: "App",
  methods: {
    ...mapActions(['getData']),
    ...mapMutations(['showData'])
  },
  created() {
    this.getData();
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
