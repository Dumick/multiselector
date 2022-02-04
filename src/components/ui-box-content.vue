<template>
   <div>
<!--      <p class="plug-p" v-if="texts[0] !== ''" ></p>-->

      <div  class="result" v-for="(chunk, key) in text" :id="key">
         <h3>{{ dictionary(key) }} </h3>
         <p> {{ chunk }} </p>
      </div>
   </div>
</template>

<script>


export default {
   name: "ui-box-content",
   props: {
      text: Object,
      selected: Array,
   },
   methods: {
      dictionary(str) {
         switch (str) {
            case 'number':
               return 'Числовой';

            case 'string':
               return 'Строковый';

            case 'object':
               return 'Объекты';

            case 'boolean':
               return 'Булевый';
         }
      },
   }
}
</script>

<style lang="scss" scoped>
p {
   text-align: left;
   background: white;
   font-family: 'Consolas', sans-serif;
   align-self: flex-start;
   padding: 10px;
   border-radius: 6px;
   font-size: 20px;
   border: unset;
   width: 600px;
}

.plug-p {
   height: 180px;
}

.result h3 {
   text-align: left;
   margin-bottom: 10px;
}

.result + .result {
   margin-top: 20px;
}

</style>
