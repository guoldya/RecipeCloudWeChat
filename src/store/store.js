import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

export default new Vuex.Store({
   state: {
      jumpArr: [],
   },
   mutations: {
      addjumpArr: (state, n) => {
         state.jumpArr = n;
      },

   },
   actions: {

   }
})

