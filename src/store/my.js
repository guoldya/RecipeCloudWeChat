import { loadAccount } from '../service/accountinfo'


const state = {
   accountinfo: [],

}

const getters = {}

const mutations = {
   ['SET_ACCOUT'](state, { list }) {
      state.accountinfo = list || []
   },

}

const actions = {

   // 获取个人信息
   async getAccount({ commit, state }, { update = false } = {}) {
      if (state.accountinfo.account && !update) return
      const res = await loadAccount()
      if (res.code != 200) return console.error('获取个人信息失败: ', res)

      commit('SET_ACCOUT', { list: res.data, })
   },

}

export default {
   state,
   getters,
   mutations,
   actions,
}