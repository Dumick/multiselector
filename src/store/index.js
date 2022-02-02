import { createStore } from "vuex";
import sha256 from "sha256";
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
                    let textBody = '';

                    option.body.forEach(item => {
                        if (item !== null)
                            for (const key in item)
                                textBody += `${key} => ${item[key]}, `
                        else
                            textBody += 'null '
                    })

                    option.body = textBody;
                    textBody = '';
                }

            })

        },
        toggleShowSelect(state) {
            state.isShowOptions = !state.isShowOptions;
        },
        toggleOption(state, option) {
            function calcHash() {
                state.hash = '0';
                state.fullText = '';

                state.activeOptions.forEach(active => {
                    state.options.forEach(option => {
                        if (active.title === option.title)
                            state.fullText += option.body
                    })
                })
                state.hash = sha256(state.fullText);
            }

            if (!state.activeOptions.includes(option)) {
                state.activeOptions.push(option);
                calcHash();
            } else {
                let index = state.activeOptions.indexOf(option);
                state.activeOptions.splice(index, 1);
                
                if (state.activeOptions.length === 0)
                    state.hash = '0'
                else
                    calcHash();
            }
        }
    },
    state: {
        data: [],
        hash: '0',
        options: [],
        fullText: '',
        activeOptions: [],
        isShowOptions: true,
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
        },
        getHash(state) {
            return state.hash;
        }
    }
})