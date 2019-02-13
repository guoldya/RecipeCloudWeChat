import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

export default new Vuex.Store({
   state: {
      jumpArr: [],
       payWay:[],
   },
   mutations: {
      addjumpArr: (state, n) => {
         state.jumpArr = n;
      },
      payWayFun:(state, n) => {
          state.payWay = n;
      },

   },
   actions: {

   }
})

