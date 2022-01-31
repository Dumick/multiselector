import { createStore } from "vuex";
import axios from "axios";

export default createStore({
    actions: {
        async getData(ctx) {
            let responseURL = 'https://raw.githubusercontent.com/WilliamRu/TestAPI/master/db.json'

            let res = await axios.get(responseURL);
            ctx.commit('showData', res.data)
        }
    },
    mutations: {
        showData(data) {
            console.log(data);
        }
    },
    state: {
        data: [],
        options: []
    },
    getters: {}
})