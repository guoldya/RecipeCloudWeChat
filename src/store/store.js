import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

export default new Vuex.Store({
   // 在state中去声明全局变量，可以通过 this.$store.state 访问
   state: {
      usertype: '',
      count: 0,
      HistoryList: '',
      illegalTime: '',
      crLevel: '',
      account: '',
      auditdate: '',
      changeName: '',
      changeId: '',
      selectedIndex: '',
      defaultText: '',
   },
   // 只能执行同步方法，不要去执行异步方法 通过 this.$store.commit 方法去调用
   mutations: {
      // mutations的第一个参数即为 state对象，并且可以向mutation传入额外的参数
      addroleType: (state, n) => {
         state.roleType = n;
      },
      addchangeName: (state, n) => {
         state.changeName = n;
      },
      addchangeId: (state, n) => {
         state.changeId = n;
      },
      addaccount: (state, n) => {
         state.account = n;
      },
      addHistoryList: (state, n) => {
         state.HistoryList = n;
      },
      addillegalTime: (state, n) => {
         state.illegalTime = n;
      },

      addcrLevel: (state, n) => {
         state.crLevel = n;
      },
      addauditdate: (state, n) => {
         state.auditdate = n;
      },
      addselectedIndex: (state, n) => {
         state.selectedIndex = n;
      },
      adddefaultText: (state, n) => {
         state.defaultText = n;
      },
   },
   // 借助actions的手去 执行 mutations ， 通过  this.$store.dispatch 的方式调用
   // 可以用来执行异步操作，可以跟踪异步数据状态变化
   actions: {
      addCount: context => {
         // 调用 mutation
         context.commit('addCount');
      },
      addNumCount: (context, n) => {
         context.commit('addNumCount', n);
      }
   }
})

