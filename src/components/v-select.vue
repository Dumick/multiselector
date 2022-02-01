<template>
   <div class="select">
      <p class="title" @click="this.toggleShowSelect">Выберите категории</p>
      <div class="options">
         <p 
            v-for="(option, index) in getOptions"
            :key="option.title"
            :class="getIsShowSelect ? `option-${index + 1} show` : '' "
         >
            {{option.value}}
         </p>
      </div>
   </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';

export default {
   name: 'v-select',
   methods: mapMutations(['toggleShowSelect']),
   computed: mapGetters(['getOptions', 'getIsShowSelect'])
}
</script>

<style scoped>
.select {
   position: relative;
   width: 200px;
   height: 100px;
   display: flex;
   flex-direction: column;
}
.title {
   width: 100%;
   height: 40px;
   padding: 15px 20px;
   cursor: pointer;
   
}

.options {
   position: absolute;
   top: 20px;
   transform: translateX(-100%);
}

.options p {
   position: inherit;


}
</style>