<template>
  <div class="content">
    <h2>Выбранные категории</h2>

    <ul>
      <li
        v-for="option in getActiveOptions"
        :key="option.title"
        :id="option.title"
      >
        <p class="title">{{ option.value }}</p>
        <hr />
        <p class="body">{{ option.body }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "v-content",
  computed: mapGetters(["getOptions", "getActiveOptions"]),
};
</script>

<style scoped>
.content {
  align-self: flex-start;
  display: block;
  width: 60%;
}
ul {
  margin-top: 20px;
}
li {
  padding: 10px 80px 10px 30px;
  border-radius: 6px;
  background-color: #e0e0e0;
  list-style: none;
}
li + li {
  margin-top: 15px;
}
li .title {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 5px;
}
li hr {
  margin-bottom: 10px;
  height: 2px;
  border: none;
  width: 100%;
  background-color: #3b3b3b;
}
</style>