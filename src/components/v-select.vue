<template>
  <div class="select">
    <p class="title" @click="this.toggleSelect">Выберите категории</p>
    <div class="options">
      <p
        v-for="option in getOptions"
        :key="option.title"
        :id="option.title"
        :class="getIsShowSelect ? 'show' : ''"
        @click="clickOnOption(option)"
      >
        {{ option.value }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "v-select",
  methods: {
    ...mapMutations(["toggleShowSelect", "toggleOption"]),
    async toggleSelect() {
      await this.toggleShowSelect();

      if (this.getIsShowSelect === true && this.getActiveOptions.length !== 0)
        this.getActiveOptions.forEach((option) => {
          document.getElementById(option).classList.toggle("active");
        });
    },
    clickOnOption(option) {
      document.getElementById(option.title).classList.toggle("active");
      this.toggleOption(option);
    },
  },
  computed: mapGetters(["getOptions", "getIsShowSelect", "getActiveOptions"]),
};
</script>

<style scoped>
.select {
  position: relative;
  width: 200px;
  height: 100px;
  align-self: flex-start;
  display: flex;
  flex-direction: column;
}
.title {
  z-index: 10;
  width: 100%;
  padding: 15px 20px;
  cursor: pointer;
  background-color: #3b3b3b;
  text-align: center;
  color: rgb(255, 214, 214);
}
.options p {
  width: 100%;
  position: absolute;
  top: 0;
  cursor: pointer;
  padding: 9px 0;
  text-align: center;
  border: 1px solid #3b3b3b;
  transition: 0.4s;
}

.options p.show:nth-child(1) {
  top: 60px;
}
.options p.show:nth-child(2) {
  top: 100px;
}
.options p.show:nth-child(3) {
  top: 140px;
}
.options p.show:nth-child(4) {
  top: 180px;
}
.options p.active {
  background-color: #6f6fe9;
}
.options p.show.active:hover {
   background-color: #3c3ca1;
}
.options p.show:hover {
  background-color: #e0e0e0;
}
</style>