import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        jumpArr: [],
        payWay: [],
        detailData: [],
        posUrl: '',
        othUrl: '',
    },
    mutations: {
        addjumpArr: (state, n) => {
            state.jumpArr = n;
        },
        payWayFun: (state, n) => {
            state.payWay = n;
        },
        recordDetailFun: (state, n) => {
            state.detailData = n;
        },
        posUrlFun: (state, n) => {
            state.posUrl = n;
        },
        othUrlFun: (state, n) => {
            state.othUrl = n;
        },
    },
    actions: {

    }
})

