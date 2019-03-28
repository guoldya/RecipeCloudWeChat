import Vue from 'vue'
import Vuex  from 'vuex'
import VuexPersistence from 'vuex-persist'

import actions from './actions.js'
import state from './state.js'
import mutations from './mutations.js'
import chat from './modules/chat'
Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  modules:{
    chat
  },
  plugins: [vuexLocal.plugin]
})

export default store