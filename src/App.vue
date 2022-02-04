<template>
   <div class="container">

      <ui-msg
         :msg="msg"
      />

      <h1>Выберите тип данных, который хотите увидеть</h1>

      <div class="wrap">
         <input
            type="submit"
            id="back"
            value="&#60; Вернуться"
            :disabled="stack.length < 1"
            @click="goBack()"
         >

         <input
            type="submit"
            id="next"
            value="Дальше &#62;"
            :disabled="!isBack"
            @click="goNext()"
         >
      </div>

      <div class="wrap">
         <ui-select
            :arr="arr"
            :options-title="optionsTitle"
            @postSelected="getSelect"
            @clearSelected="clearBox"
         />

         <ui-box-content
            :text="text"
            :selected="selected"
            @clearBoxInChild="clearBox"
         />

      </div>
      <div class="wrap">
         <h3 class="hash-title">Хеш</h3>
         <input class="hash-text" :value="hash" disabled>
      </div>
   </div>
</template>

<script>
import uiMsg from './components/ui-msg.vue'
import uiSelect from './components/ui-select.vue'
import uiBoxContent from './components/ui-box-content'
import sha256 from 'js-sha256';

export default {
   components: {
      uiMsg,
      uiSelect,
      uiBoxContent
   },
   data() {
      return {
         msg: '',
         hash: 0,
         arr: [],
         stack: [],
         selected: [],
         optionsTitle: [],
         isBack: false,
         text: {},
      }
   },
   methods: {
      getData() {
         const responseUrl = 'https://raw.githubusercontent.com/WilliamRu/TestAPI/master/db.json';
         const method = 'GET';

         let xhr = new XMLHttpRequest();
         xhr.open(method, responseUrl);

         xhr.onreadystatechange = async () => {
            if (xhr.readyState === 4)
               if (xhr.status === 200) {

                  this.msg = 'Данные успешно получены :)';
                  let res = await xhr.response;
                  res = JSON.parse(res);
                  res = res['testArr'];
                  this.oldArr = res;

                  this.customFlat(res, this.arr);
                  this.customSplit();
                  this.findOptionsTitle();

               } else {

                  this.msg = 'Произошла ошибка';
                  console.log(
                     'Метод отправки данных: ' + method + '.' +
                     '\nАдрес отправки: ' + responseUrl + '.' +
                     '\nТекст ответа сервера: ' + xhr.responseText + '.'
                  )

               }
         }
         xhr.send()
      },
      findOptionsTitle() {
         for (const item of this.arr) {
            let option = {};
            option.title = this.dictionary(typeof item[0]);
            option.id = typeof item[0];

            this.optionsTitle.push(option);
         }
      },
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
      customFlat(arr, newArr) {

         newArr = newArr === null ? [] : newArr;

         for (const i in arr) {
            if (Array.isArray(arr[i]))
               this.customFlat(arr[i], newArr);
            else
               newArr.push(arr[i]);
         }
      },
      customConcat() {

         for (const select of this.selected)
            if (select !== 'object') {
               for (const item of this.arr)
                  if (typeof item[0] === select) {
                     this.text[select] = String();
                     for (const chunk of item) {
                        if (chunk !== item[item.length - 1])
                           this.text[select] += `${chunk}, `
                        else
                           this.text[select] += `${chunk}.`
                     }
                  }
            } else {
               let str = '';
               for (const item of this.arr) {
                  this.text[select] = String();
                  if (typeof item[0] === select)
                     for (const chunk of item) {
                        if (chunk !== null && chunk.key !== undefined) {
                           str += `${chunk.key} => ${chunk.value}, `;
                        } else
                           str += `Пустой объект, `;
                     }
                  this.text[select] = str;
               }
            }
      },
      customSplit() {
         let newArr = [[], [], [], []];

         for (const item of this.arr) {
            switch (typeof item) {
               case "number":
                  newArr[0].push(item);
                  break;
               case "string":
                  newArr[1].push(item);
                  break;
               case "object":
                  newArr[2].push(item);
                  break;
               case "boolean":
                  newArr[3].push(item);
                  break;
            }
         }

         this.arr = newArr;
      },
      getSelect(arr) {
         this.selected = arr;

         this.calculateHash();

         if (this.stack.length < 1)
            this.stack.push(arr);
         else {
            this.stack.shift();
            this.stack.push(arr);
         }

      },
      calculateHash() {
         let fullText = '';
         this.customConcat();

         for (const item in this.text) {
            fullText += this.text[item];
         }

         this.hash = sha256(fullText)
      },
      clearBox() {
         let spans = document.querySelectorAll('.span-selected');

         for (const elem of spans) {
            elem.parentNode.removeChild(elem);
         }

         this.hash = 0;
         this.text = {};
         this.selected = [];
         this.stack = [];
      },
      goBack() {
         this.isBack = true;

         if (this.stack.length > 1)
            this.selected = this.stack[this.stack.length - 1];
         else
            this.selected = []


      },
      goNext() {
      }
   },
   mounted() {
      this.getData();
   }
}
</script>

<style lang="scss">
* {
   padding: 0;
   margin: 0;
   box-sizing: border-box;
}

body {
   background-color: #B3E5FC;
}

#app {
   font-family: Avenir, Helvetica, Arial, sans-serif;
   padding: 20px 0;
   display: flex;
   justify-content: center;
   align-items: center;

   .container {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      text-align: center;
      width: 1140px;

      h1 {
         background-color: #E1F5FE;
         padding: 10px;
         border-radius: 6px;
         margin-bottom: 40px;
         width: 100%;
      }

      .wrap {
         position: relative;
         background-color: #E1F5FE;
         padding: 20px 0;
         border-radius: 6px;
         width: 80%;

         display: flex;
         justify-content: space-around;
         align-items: center;

         #back, #next {
            cursor: pointer;
            font-size: 20px;
            padding: 8px 12px;
            border: 1px solid #000;
            border-radius: 4px;
            background: white;
            transition: .2s;
         }

         #back:hover, #next:hover {
            background: #ccc;
         }

         #back:disabled, #next:disabled {
            border: unset;
            background: #ccc;
            color: white;
         }

         .hash-text {
            width: 700px;
            background: white;
            padding: 4px 10px;
            border-radius: 6px;
            font-size: 18px;
            text-align: center;
            border: unset;
         }
      }

      .wrap + .wrap {
         margin-top: 20px;
      }
   }

}
</style>
