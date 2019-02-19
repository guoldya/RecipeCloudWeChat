import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

export default new Vuex.Store({
   state: {
      jumpArr: [],
       payWay:[],
       detailData:[],
       activeId:'',
       feeActiveId:'',
   },
   mutations: {
      addjumpArr: (state, n) => {
         state.jumpArr = n;
      },
      payWayFun:(state, n) => {
          state.payWay = n;
      },
       activeFun:(state, n) => {
           state.activeId = n;
       },
       feeActiveFun:(state, n) => {
           state.feeActiveId = n;
       },

   },
   actions: {

   }
})

