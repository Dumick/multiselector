<template>
  <label for="hash">
    <span><b>Хэш:</b></span>
    <p id="hash">{{ getHash }}</p>
  </label>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "v-footer",
  computed: mapGetters(["getHash"])
};
</script>

<style scoped>
label {
    position: fixed;
    bottom: 20px;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
label span,
label p {
    background-color: #e0e0e0;
    padding: 10px;
    border-radius: 4px;
    text-align: center;
}

label p {
    width: 87%;
}
</style>