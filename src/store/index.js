import { createStore } from "vuex";
import axios from "axios";

export default createStore({
    actions: {
        async getData(ctx, ) {
            let res = await axios('https://raw.githubusercontent.com/WilliamRu/TestAPI/master/db.json')

            ctx.commit('showData', res.data.testArr)
        }
    },
    mutations: {
        showData(state, data) {
            function flatDeep(arr, d = 1) {
                return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), []) :
                    arr.slice();
            }
            data = flatDeep(data, Infinity);

            let arrayOptions = [];
            data.forEach(item => {
                if (!arrayOptions.includes(typeof item)) {
                    arrayOptions.push(typeof item);
                }
            })

            const dictionary = {
                'string': 'Строки',
                'number': 'Числа',
                'object': 'Объекты',
                'boolean': 'Булевые',
            }

            arrayOptions.forEach((option, index) => {
                state.options.push({});
                state.options[index].title = option;
                state.options[index].value = dictionary[option];

                state.options[index].body = [];
            })

            data.forEach(item => {
                let type = typeof item;

                state.options.forEach((option) => {
                    if (option.title === type) {
                        option.body.push(item);
                    }
                })
            })

            state.options.map(option => {
                if (typeof option.body[0] !== 'object')
                    option.body = option.body.join(', ');
                else {
                    option.body.map(option => {
                        let newOption = '';
                        for (const key in option)
                            newOption += `${key} => ${option[key]}`

                        option = newOption;
                    })

                }

            })

        },
        toggleShowSelect(state) {
            state.isShowOptions = !state.isShowOptions;
        },
        toggleOption(state, option) {
            if (!state.activeOptions.includes(option)) {
                state.activeOptions.push(option)
            } else {
                let index = state.activeOptions.indexOf(option);
                state.activeOptions.splice(index, 1);
            }

            // console.log(state.activeOptions);
        }
    },
    state: {
        data: [],
        hash: '',
        options: [],
        fullText: '',
        activeOptions: [],
        isShowOptions: false,
    },
    getters: {
        getOptions(state) {
            return state.options;
        },
        getIsShowSelect(state) {
            return state.isShowOptions;
        },
        getActiveOptions(state) {
            return state.activeOptions;
        }
    }
})