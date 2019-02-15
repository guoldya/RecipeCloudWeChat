import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

export default new Vuex.Store({
   state: {
      jumpArr: [],
       payWay:[],
       detailData:[],
       checkReportId:[],
       collectReportData:[],
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
      checkReportDetail:(state, n) => {
         state.checkReportId = n;
      },
       collectReportDetail:(state, n) => {
           state.collectReportData = n;
       },
   },
   actions: {

   }
})

