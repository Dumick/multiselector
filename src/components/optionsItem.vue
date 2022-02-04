<template>
   <div class="select-options__item" @click="this.$emit('addSelected', id)">
      {{ title }}
   </div>
</template>

<script>
export default {
   name: "optionsItem",
   props: {
      title: String,
      id: String
   }
}
</script>

<style scoped>
.select-options__item {
   width: 100%;
   transition: .3s;
   cursor: pointer;
   padding: 12px 8px;
   border-bottom: 1px solid #000;
}

.select-options__item:hover {
   background: #eee;
}
</style>
