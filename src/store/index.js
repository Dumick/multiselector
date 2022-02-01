import { createStore } from "vuex";
import axios from "axios";

export default createStore({
    actions: {
        async getData(ctx,) {
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
                'string': 'Строка',
                'number': 'Число',
                'object': 'Объект',
                'boolean': 'Булевое',
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

        },
        toggleShowSelect(state) {
            state.isShowOptions = !state.isShowOptions;
        },
        toggleOption(state, title) {
            if (!state.activeOptions.includes(title))
                state.activeOptions.push(title)
            else {
                let index = state.activeOptions.indexOf(title);
                state.activeOptions.splice(index, 1)
            }
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