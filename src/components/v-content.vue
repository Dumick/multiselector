<template>
  <div class="content">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti, quae aliquam reiciendis saepe dicta magni vero. Totam hic eius quia non, culpa magnam voluptatum sequi incidunt veniam, numquam adipisci molestiae?
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
 name: "v-content",
 computed: mapGetters(['getOptions', 'getActiveOptions'])
}
</script>

<style scoped>
    .content {
        display: block;
    }
</style>