<template>
   <div class="ui-select">
      <div @click="showOptions" class="select" ref='select'>
         <div class="select-spans"></div>
         <div v-if="isViewOptions" class="select-options">
            <options-item
               v-for="options in optionsTitle"
               :key="options.id"
               :title="options.title"
               :id="options.id"
               @addSelected="mutationSelectedItems"
            />
         </div>
      </div>

      <div class="btn-group">
         <button class="apply" @click="this.$emit('postSelected', this.selected); drawOptions()">Применить</button>
         <button class="clear" @click="this.$emit('clearSelected'); this.selected = []">Очистить</button>
      </div>
   </div>
</template>

<script>
import optionsItem from "./optionsItem";

export default {
   name: "ui-select",
   components: {
      optionsItem
   },
   data() {
      return {
         isViewOptions: false,
         selected: []
      }
   },
   props: {
      arr: Array,
      optionsTitle: Array,
   },
   methods: {
      mutationSelectedItems(title) {
         if (this.selected.length) {
            const newSelected = [];
            let isFunded = false;

            for (const item of this.selected) {
               if (item === title) {
                  isFunded = true;
                  break;
               }
            }

            if (isFunded) {
               for (const item of this.selected) {
                  if (item !== title) newSelected.push(item)
               }
            } else {
               for (const item of this.selected) newSelected.push(item)
               newSelected.push(title)
            }
            this.selected = newSelected;
         } else {
            this.selected.push(title)
         }

      },
      showOptions(event) {
         if (event.path[0].classList.contains('select')) this.isViewOptions = !this.isViewOptions;
      },
      drawOptions() {
         let spans = document.querySelectorAll('.span-selected');

         for (const elem of spans) {
            elem.parentNode.removeChild(elem);
         }

         const select = document.querySelector('.select-spans');

         for (const item of this.selected) {
            let span = document.createElement('span');
            span.classList.add('span-selected')
            span.style.display = 'block';
            span.style.background = '#B3E5FC'
            span.style.padding = '5px'
            span.style.border = '2px solid #fff'
            span.style.marginTop = '10px'
            span.innerText = this.dictionary(item);

            select.prepend(span);
         }
      },
      dictionary(str) {
         switch (str) {
            case 'number':
               return 'числ.';

            case 'string':
               return 'стр.';

            case 'object':
               return 'объе.';

            case 'boolean':
               return 'бул.';
         }
      },
   }
}
</script>

<style lang="scss" scoped>
.ui-select {
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;

   .select {
      cursor: pointer;
      background: white;
      border-radius: 6px;
      height: 50px;
      width: 100%;
      margin-bottom: 20px;
      position: relative;
      transition: .3s;

      .select-spans {
         display: flex;
         justify-content: center;
         align-items: center;
         width: 100%;
      }

      .select-options {
         position: absolute;
         z-index: 10;
         width: 100%;
         top: 110%;

         background: white;
         font-size: 14px;
         font-weight: bold;
      }
   }

   .select:hover {
      background-color: #e5e5e5;
   }

   .btn-group {
      display: flex;
      justify-content: space-between;
      align-items: center;

      button {
         cursor: pointer;
         padding: 8px 15px;
         font-size: 14px;
         font-weight: bold;
         border-radius: 4px;
         border: 2px solid #000;
         transition: .3s;
      }

      button + button {
         margin-left: 20px;
      }

      .apply {
         background-color: #87CEFA;

      }

      .apply:hover {
         background-color: #49c0fc;
      }

      .clear {
         background-color: #FFC0CB;

      }

      .clear:hover {
         background-color: #fc92a2;
      }
   }


}
</style>
