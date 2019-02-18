import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

export default new Vuex.Store({
   state: {
      jumpArr: [],
       payWay:[],
       detailData:[],
       activeId:'',
   },
   mutations: {
      addjumpArr: (state, n) => {
         state.jumpArr = n;
      },
      payWayFun:(state, n) => {
          state.payWay = n;
      },
      recordDetailFun:(state, n) => {
         state.detailData = n;
      },
       activeFun:(state, n) => {
           state.activeId = n;
       },
   },
   actions: {

   }
})

